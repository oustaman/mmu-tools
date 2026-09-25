#!/usr/bin/env python3
"""
Speak content.json and write content.js: the deck's words plus caption timings.

Every sentence is synthesised on its own, so each caption starts and ends where
its sentence does, measured rather than guessed. Sentences are cached by a hash
of their text: change one line and only that line is spoken again.

  English, Spanish   Supertonic 3, voice F5, on this machine
  Mandarin           CosyVoice 2, cloned across languages from the F5 English
                     narrator, so all three languages share one synthetic voice.
                     Supertonic 3 has no Chinese.

Run:
  python3 tools/narrate.py              all languages
  python3 tools/narrate.py en es        some of them
  python3 tools/narrate.py --js-only    rebuild content.js from the cache (text edits
                                        to ui.* keys need no new audio)

Then check what was said with tools/verify.py.
"""
import hashlib, json, os, subprocess, sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))    # portfolio/ai-lead
CACHE = os.path.expanduser('~/.cache/ai-lead-tts')
AUDIO = os.path.join(HERE, 'audio')
GAP = 0.28            # seconds of silence between sentences
SPEED = 1.05
COSY_PY = '/opt/homebrew/Caskroom/miniforge/base/envs/cosyvoice/bin/python'
SUPERTONIC_LANG = {'en': 'en', 'es': 'es'}

content = json.load(open(os.path.join(HERE, 'content.json')))
args = [a for a in sys.argv[1:] if not a.startswith('--')]
langs = args or list(content['langs'])
js_only = '--js-only' in sys.argv


def key(lang, text):
    return os.path.join(CACHE, lang, hashlib.sha1(f"{content['voice']}|{SPEED}|{text}".encode()).hexdigest()[:12] + '.wav')


def dur(path):
    # ffprobe, not the wave module: CosyVoice writes 32-bit float WAV, which wave can't open
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path],
                         check=True, capture_output=True, text=True).stdout
    return float(out.strip())


def speak_supertonic(lang, todo):
    from supertonic import TTS
    tts = TTS(model='supertonic-3', auto_download=False)
    style = tts.get_voice_style(content['voice'])
    for text, out in todo:
        res = tts.synthesize(text, voice_style=style, total_steps=12, speed=SPEED, lang=SUPERTONIC_LANG[lang])
        tts.save_audio(res[0] if isinstance(res, tuple) else res, out)
        print('  ', lang, os.path.basename(out), text[:60], flush=True)


def speak_cosyvoice(todo):
    # The reference clip is the English narrator saying the vision line, 16 kHz mono.
    ref_text = content['langs']['en']['slides'][0][6] + ' ' + content['langs']['en']['slides'][0][7]
    ref_src = key('en', 'REF|' + ref_text)
    if not os.path.exists(ref_src):
        speak_supertonic('en', [(ref_text, ref_src)])
    ref16 = ref_src[:-4] + '.16k.wav'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', ref_src, '-ac', '1', '-ar', '16000', ref16], check=True)
    jobs = os.path.join(CACHE, 'zh-jobs.json')
    json.dump(todo, open(jobs, 'w'), ensure_ascii=False)
    env = dict(os.environ, OMP_NUM_THREADS='1', KMP_DUPLICATE_LIB_OK='TRUE')   # without these it segfaults on load
    subprocess.run([COSY_PY, os.path.join(HERE, 'tools', 'cosyvoice_zh.py'), ref16, jobs], check=True, env=env)


def build_slide(lang, n, sentences):
    """Concatenate the sentence clips with gaps, encode one mp3, return caption cues."""
    parts, cues, t = [], [], 0.0
    for i, text in enumerate(sentences):
        p = key(lang, text)
        d = dur(p)
        cues.append({'t0': round(t, 2), 't1': round(t + d, 2), 'text': text})
        parts.append(p)
        t += d + (GAP if i < len(sentences) - 1 else 0)
    os.makedirs(os.path.join(AUDIO, lang), exist_ok=True)
    out = os.path.join(AUDIO, lang, f's{n}.mp3')
    # concat filter with generated silence between clips; resample all to 24 kHz mono
    inputs, chain = [], ''
    for i, p in enumerate(parts):
        inputs += ['-i', p]
    filt = ''
    for i in range(len(parts)):
        filt += f'[{i}:a]aresample=24000,aformat=channel_layouts=mono[a{i}];'
        if i < len(parts) - 1:
            filt += f'aevalsrc=0:d={GAP}:s=24000[g{i}];'
    seq = ''.join(f'[a{i}]' + (f'[g{i}]' if i < len(parts) - 1 else '') for i in range(len(parts)))
    n_in = len(parts) * 2 - 1
    filt += f'{seq}concat=n={n_in}:v=0:a=1,loudnorm=I=-16:TP=-1.5:LRA=11[out]'   # -16 LUFS, the usual level for web speech
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *inputs, '-filter_complex', filt, '-map', '[out]',
                    '-ac', '1', '-ar', '24000', '-b:a', '56k', out], check=True)
    return {'audio': f'audio/{lang}/s{n}.mp3', 'dur': round(t, 2), 'cues': cues}


if not js_only:
    for lang in langs:
        os.makedirs(os.path.join(CACHE, lang), exist_ok=True)
        todo = [(s, key(lang, s)) for slide in content['langs'][lang]['slides'] for s in slide
                if not os.path.exists(key(lang, s))]
        print(f'{lang}: {len(todo)} sentence(s) to speak', flush=True)
        if not todo:
            continue
        if lang == 'zh':
            speak_cosyvoice(todo)
        else:
            speak_supertonic(lang, todo)

deck = {'voice': content['voice'], 'pipeline': content.get('pipeline', ''), 'langs': {}}
for lang, L in content['langs'].items():
    slides = []
    for n, sentences in enumerate(L['slides'], 1):
        if all(os.path.exists(key(lang, s)) for s in sentences):
            slides.append(build_slide(lang, n, sentences))
        else:
            slides.append({'audio': None, 'dur': 0, 'cues': [{'t0': 0, 't1': 0, 'text': s} for s in sentences]})
    total = sum(s['dur'] for s in slides)
    print(f'{lang}: {total:.1f}s narrated across {len(slides)} slides', flush=True)
    deck['langs'][lang] = {'name': L['name'], 'ui': L['ui'], 'slides': slides}

with open(os.path.join(HERE, 'content.js'), 'w') as f:
    f.write('/* Generated by tools/narrate.py from content.json. Do not edit by hand. */\n')
    f.write('window.DECK = ' + json.dumps(deck, ensure_ascii=False, indent=1) + ';\n')
print('wrote content.js')
