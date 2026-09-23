#!/usr/bin/env python3
"""
Check what the narration actually says. Whisper transcribes every sentence's
audio back to text, and each transcript is compared with its line in
content.json. A synthetic voice can skip, slur or invent words; this is how
we'd know.

Sentence by sentence, not slide by slide: over a whole slide Whisper sometimes
drops a stretch of perfectly good audio, which reads as a failure that isn't.

  python3 tools/verify.py            all languages
  python3 tools/verify.py zh         one

Writes verify-report.json and prints a similarity score per slide (the mean of
its sentences; 1.00 = the recognised text matches the script exactly, ignoring
punctuation and case). Sentences below 0.75 are listed for a human to listen
to. Numbers the script spells out ("forty-two") come back as digits, which
costs a little on every slide that has them.
"""
import difflib, hashlib, json, os, re, sys, unicodedata

try:
    import whisper
except ImportError:                       # Whisper lives in Homebrew's Python 3.10 on this machine
    py = '/opt/homebrew/opt/python@3.10/bin/python3.10'
    if os.path.exists(py) and sys.executable != py:
        os.execv(py, [py, *sys.argv])
    raise

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.expanduser('~/.cache/ai-lead-tts')
SPEED = 1.05                              # must match narrate.py, which keys its cache on it
content = json.load(open(os.path.join(HERE, 'content.json')))
langs = sys.argv[1:] or list(content['langs'])


def key(lang, text):
    return os.path.join(CACHE, lang, hashlib.sha1(f"{content['voice']}|{SPEED}|{text}".encode()).hexdigest()[:12] + '.wav')


def norm(s, lang):
    s = unicodedata.normalize('NFKC', s).lower()
    s = re.sub(r'[^\w\s]', '', s)
    if lang == 'zh':                                   # compare characters, not words
        return list(re.sub(r'\s+', '', s))
    return s.split()


model = whisper.load_model('base')
RP = os.path.join(HERE, 'verify-report.json')
report = json.load(open(RP)) if os.path.exists(RP) else {}
listen = []
for lang in langs:
    report[lang] = []
    # Whisper writes Chinese in Traditional characters unless prompted; the script is Simplified.
    prompt = '以下是普通话的句子，使用简体中文。' if lang == 'zh' else None
    for n, sentences in enumerate(content['langs'][lang]['slides'], 1):
        rows = []
        for text in sentences:
            wav = key(lang, text)
            if not os.path.exists(wav):
                rows.append({'said': text, 'missing': True}); continue
            heard = model.transcribe(wav, language=lang, fp16=False, initial_prompt=prompt)['text'].strip()
            score = difflib.SequenceMatcher(None, norm(text, lang), norm(heard, lang)).ratio()
            rows.append({'said': text, 'heard': heard, 'score': round(score, 3)})
            if score < 0.75:
                listen.append(f'{lang} slide {n}: "{text}"  heard: "{heard}"')
        scored = [r['score'] for r in rows if 'score' in r]
        mean = sum(scored) / len(scored) if scored else 0
        report[lang].append({'slide': n, 'score': round(mean, 3), 'sentences': rows})
        low = f'  (lowest sentence {min(scored):.2f})' if scored else '  (no audio)'
        print(f'{lang} slide {n}: {mean:.2f}{low}', flush=True)

json.dump(report, open(RP, 'w'), ensure_ascii=False, indent=1)
print(f'\n{len(listen)} sentence(s) worth a listen:' if listen else '\nNo sentence below 0.75.')
for l in listen:
    print('  ', l)
print('Wrote verify-report.json')
