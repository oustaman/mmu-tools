# screens.json — a capture job, not a research brief

**~140 records. The join key. Everything else references it.**

## Why there is no prompt here

A model cannot look at a screen. Every field in this dataset that matters —
what the eye reaches first, what the design does well, what it does badly — is
a judgement about a rendered image, and a model asked for those will produce
fluent, plausible, unverifiable text at scale. That is precisely the failure that
put 600 records in this estate's rejected pile, and this dataset is more exposed
to it than any other because nothing downstream would catch it: a wrong
`reading_order` looks exactly like a right one.

So this splits in two, and the split is the whole method.

## Part 1 — measured, by a script

These come off the live page with a real browser and no opinion in them. The
interfaces.institute pipeline already does this against 122 design systems and
50 banks; `pipeline/measure_sites.mjs` is the working example and the fields
below are close to what it already returns.

```
id                  sd-scr-NNN, stable, assigned at capture
source              the organisation
platform            web · ios · android · kiosk · print
url_or_app
captured_date       ISO. Not optional — a screen is a photograph of a moment.
viewport{}          width, height, dpr — the conditions of the capture
grid{}              columns, gutter, margin, max_width, as measured
breakpoints_captured[]
palette[]           hex + share, measured
type{}              body face, size, line height, as computed
target_sizes[]      the interactive elements and their measured boxes
image_ref           the capture itself
licence_note        see the copyright position below
```

Write this as `pipeline/capture_screens.mjs`, modelled on `measure_sites.mjs`.
**Copy its resume behaviour exactly**: that script rebuilt its output from
scratch on each run until a shorter second pass silently replaced 90 measured
rows with 71. It merges by id now. This one must too, from the first commit.

## Part 2 — annotated, by a person

These cannot be measured and must not be generated. Roughly 4 minutes a screen
if the measured half is already in place — about nine hours for 140, which is a
third of the original 28-hour estimate because the script has taken the rest.

```
category
screen_type         onboarding · list · detail · form · empty · error ·
                    success · settings
reading_order[]     what the eye reaches, in order. The single most valuable
                    field in the corpus and the least automatable.
devices_used[]      scale · weight · colour · space · position
does_well[]         specific. "The error names the field" not "good UX".
does_badly[]
principle_ids[]     joins principles.json
a11y_failures[]     joins y-cases.json
```

**Leave the annotation fields null until a person fills them.** A null here is a
queue; an invented value is a lie the rest of the corpus inherits. Every
instrument that reads this dataset must render a null as "not yet annotated"
rather than skipping the record — otherwise the gap becomes invisible and the
corpus looks finished when it is a third done.

## Coverage, not brands

Six checkout flows teach less than one each of onboarding, empty, error, form,
list and detail. Target **at least twelve records in every `screen_type`**, and
count that before adding a thirteenth of anything. The temptation is to capture
what is easy to reach, which is consumer apps in English on a phone; that
produces a corpus in which every week 9 accessibility case is a colour contrast
failure because nothing else got captured.

Deliberately include, and record why:
- at least fifteen **not** in English
- at least ten that are **not a product** — a form, a notice, a kiosk, a receipt
- at least ten **government** screens, which are public, stable and free of the
  copyright question below
- at least five that are **old** — a screenshot of software from before 2010,
  which is what makes the button's biography teachable rather than asserted

## The copyright position, stated once

`licence_note` is not bureaucracy. This corpus reproduces other people's
interfaces for teaching, inside a closed module, and the honest position is:
capture the smallest thing that carries the point, record where and when it came
from, and never republish the corpus itself outside the module. The estate made
the neighbouring decision already and it should hold here — interfaces.institute
declined to host screenshots at all and built a register of the libraries that
do, because re-hosting other people's work was not a position it wanted.

If any of this corpus is to appear on a public page, the answer is the same one
the button room reached: **draw the specimen rather than reproduce it.**

## Ordering

1. `capture_screens.mjs` against 30 government screens — public, stable, and the
   copyright question does not arise. Proves the pipeline.
2. Annotate those 30. This calibrates how long annotation actually takes, before
   110 more are captured on the strength of an estimate.
3. Capture the remaining ~110 against the coverage table above.
4. Annotate on a schedule, in `screen_type` order, so week 1 has its exhibits
   before week 9 has its edge cases.
