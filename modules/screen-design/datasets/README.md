# The screen corpus — what is left to build

Re-scoped 27 August 2026 against the live institutes. The original plan named
nine datasets at 88 hours. Estate work has since covered three of them outright,
and one of the remaining six turns out not to be a research job at all.

Updated 28 August 2026: two of the six are returned, a third is a third measured,
and the last of the six now has a brief. What remains is annotation and the two
that were never a model's to write.

## Covered — do not rebuild

| planned | what covers it | where |
|---|---|---|
| `grids.json` | `grid-systems`, 68 rows, with a plate drawn to each publisher's own figures | interfaces.institute/collections/grids/ |
| `typefaces.json` | `screen-typefaces`, 90 records | datasets/shared/deepseek-research/screen-typefaces |
| `palettes.json` | measured off live pages: 50 banks, 122 design systems, 63 primary buttons | interfaces.institute/collections/bank-interfaces/ |

Ten of the thirty `principles.json` records are also covered, and covered better
than the plan asked for: the Stairwell ships each of its ten with a **working
bench** — two real interfaces for one task — where the plan only asked for an
`example_screen_id` and a `counter_example_screen_id`.

## Returned — 28 August 2026

| dataset | size | what came back |
|---|---|---|
| `themes.json` | 80 | Eight in each of the ten domains; 43 are not products against the fifteen rule 4 asks for; `example_screen_ids` null throughout. No theme is estimated above six screens, so the 7-9 band is unused — declared in `notes.known_gaps` rather than padded. |
| `principles.json` | 20 new | 9 `documented`, 10 `traditional`, 1 `folk`. Every source was opened and confirmed to state its own claim. Five candidates were dropped with reasons in `notes.dropped`, including Focus Visible, which is sourceable and lost only to room in week 9. |

`figure-ground` is the row to read first: a named, datable origin (Rubin, 1915)
and still marked `traditional`, because the thesis is in Danish and nothing
findable states the claim rather than summarising it. That is the confidence
marker doing its job rather than failing.

## Still needed

| dataset | size | state |
|---|---|---|
| `screens.json` | ~140 | **Measured 30, annotated 0.** `pipeline/capture_screens.mjs` writes the measured half; `screens/targets.json` holds the stable ids. Step 2 of `screens/CAPTURE.md` — annotating those thirty — is next, and it is what tells you whether four minutes a screen is real. |
| `y-cases.json` | ~25 | Brief and schema written. Blocked on the **annotated** half of `screens.json`, not merely ordered after it: a reading-order failure cannot be stated against a row where nobody has recorded the reading order. |
| `rationales.json` | 48 | **No, and it must not be.** See below. |
| `ai-samples.json` | ~20 | **No, and not yet.** See below. |

Two things the capture found that are worth knowing before the annotation pass.
`pre_2010` is 0 and cannot be anything else from live capture — the five old
screens need archived material and a different method entirely. And an early run
filed four error pages as successful captures, complete with palette and grid
measured off "Access Denied"; the status-and-content rule that now refuses them
is the reason `notes.known_gaps` carries a line about rows served non-2xx and
kept anyway.

## The two that must not be commissioned

**`rationales.json` — 48 banded exemplar paragraphs.** This is the calibration
anchor for the automated pre-check, the week 10 lecture material, and the
moderation evidence. A model writing the paragraphs that a model will later
grade against is a closed loop with no external reference in it, and the drift
is invisible from inside. It is also the artefact an external examiner will ask
to see. **Write these yourself.** Ten hours, and the highest-leverage ten hours
in the build.

**`ai-samples.json` — 20 generated screens with critique.** Not a research task
and deliberately not a summer task: it is the only dataset that gets worse with
age. Capture it in weeks 1–4 with whatever tools students are actually holding,
date-stamp every record, and plan to recapture annually.

## The failure this whole folder is designed against

`symbol-standards` returned 600 records that passed every structural check and
were substantially invented. Zero nulls across the set, twelve distinct source
URLs for 1,200 citations, one quote reused 228 times, and a comprehension study
block where every one of 162 records reported a sample size of exactly 120.

Every brief here carries the rules that came out of that: a hard cap on the
target, a refusal to offer a field for anything the collector cannot verify, and
an explicit statement that **a thin honest set beats a complete one**. Run
`datasets/shared/_common/validate.py` against any return before reading it.
