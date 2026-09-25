# Portfolio decks

Two short web decks. Each is one self-contained HTML file, so it works from GitHub Pages or from a download.

| Deck | For | Link |
|---|---|---|
| `ai-lead/` | Faculty Lead for AI in Education, expression of interest. Five narrated slides and two appendices (A: statement on AI use; B: my practice), in English, Spanish and Mandarin. | https://oustaman.github.io/mmu-tools/portfolio/ai-lead/ |
| `room-finder/` | The MMU Room Finder prototype, seven slides: the data we hold, the question it answers, what it does, what it found, how impact would be measured, where it could go, what it needs next. | https://oustaman.github.io/mmu-tools/portfolio/room-finder/ |

The Room Finder itself is not published here. It stays internal; these decks show a few screenshots of one building (Geoffrey Manton) and nothing else.

## How the narrated deck is made

```
ai-lead/content.json        every word on the slides and in the narration, per language
  → ai-lead/tools/narrate.py   speaks each sentence: Supertonic 3, voice F5 (en, es);
                               CosyVoice 2 cloned from that voice (zh). Writes audio/ and content.js
  → ai-lead/tools/verify.py    Whisper transcribes the audio back; scores it against the script
  → ai-lead/index.html         reads content.js
```

Edit the words in `content.json`, then:

```
python3 ai-lead/tools/narrate.py            # only changed sentences are spoken again
python3 ai-lead/tools/verify.py             # writes ai-lead/verify-report.json
python3 ai-lead/tools/narrate.py --js-only  # slide text changes only, no new audio
```

Sentence audio is cached in `~/.cache/ai-lead-tts`, outside the repository. CosyVoice needs the `cosyvoice` conda environment and `OMP_NUM_THREADS=1`; `narrate.py` sets that itself.

Screenshots in `assets/` are WebP, captured from the prototype at 1440×900.
