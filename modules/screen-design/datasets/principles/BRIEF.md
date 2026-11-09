# principles.json — the Level 4 subset

**20 new records. Ten already exist and must not be re-collected.**

## Read this first

The Stairwell at interfaces.institute already holds ten principles — Fitts,
Hick–Hyman, Miller, Jakob, Tesler, feedback, state, constraint, recognition,
affordance — and holds them better than this dataset was specified to. Each
carries a claim, an origin, its evidence, its **limits and misuse**, a confidence
marker, and since August a **working bench**: two real interfaces for one task,
one breaking the principle and one keeping it, both instrumented.

The original spec asked for `example_screen_id` and `counter_example_screen_id`.
A bench is that, except you can use it.

**So this return collects the other twenty only.** The ten are derived from the
Stairwell at build time. Collecting them again would produce a second, worse
copy that drifts from the first.

## What the twenty are

Visual-design principles and the accessibility basics that the Stairwell does
not cover, pitched at students with no design vocabulary. Candidates, not a
list to fill: visual hierarchy, contrast, alignment, proximity, repetition,
white space, figure–ground, scale, the optical centre, typographic measure,
line height, colour contrast ratios, target size, focus order, error identific-
ation, consistency, mapping, progressive disclosure, chunking, redundancy of
coding.

Twenty is the cap. If only sixteen can be done honestly, return sixteen and say
which four were dropped and why.

## Fields

```
id                    principle-slug
family                visual · ucd · accessibility
name                  the principle as it is normally named
one_line              the claim, in one sentence
plain_gloss           the same claim for someone with no design vocabulary.
                      MUST differ substantially from one_line. A gloss that
                      restates the claim in the same register is the field
                      not being done — this is the single most common way a
                      return in this estate has been filled in rather than
                      written.
origin                who said it and when, or null
confidence            documented · traditional · folk        (see below)
confidence_note       why that marker, in one sentence
common_misuse         the misreading that is about to appear in thirty
                      portfolios. This is what a tutor circulating a workshop
                      actually needs.
limits                where the principle stops being true
weeks[]               which module weeks it is taught in, or null
source_url            the page that states this, or null if traditional/folk
```

## The confidence marker, and why it is not optional

Borrowed from the Stairwell, and it is the whole defence against the failure that
destroyed a 600-record return in this estate:

- **documented** — a named, findable source says this. `source_url` required, and
  it must point at a page that states *this* claim. Not a catalogue entry, not a
  summary, not a listicle that repeats it.
- **traditional** — long-standing practice with no single citable origin. This is
  an honest and common answer. `source_url` null.
- **folk** — widely repeated and the evidence does not support it as it is used.
  Miller's 7±2 is the canonical case and it is already on the Stairwell.

**A principle you cannot source is `traditional`, not `documented` with an
invented citation.** The estate has one dataset in the rejected pile precisely
because plausible-looking URLs were supplied for claims nobody had checked.

## Rules

1. **Twenty maximum.** A thin honest set beats a complete one.
2. **Do not collect the Stairwell's ten.** They are listed above. If one of them
   appears in this return, the return is wrong.
3. **`plain_gloss` must differ from `one_line`.** JSON Schema cannot compare two
   fields, so this is *not* enforced by `schema.json` — it is checked by
   `_common/validate.py`, which already carries the same rule for
   `meaning_plain` vs `meaning_official` after 570 of 600 records in one return
   were found to have copy-pasted one into the other. Run the validator; the
   schema alone will let this through.
4. **No invented studies.** If you cannot name the paper, the marker is
   `traditional`. A sample size, a percentage or a date you cannot source is the
   exact shape of the fabrication that got 600 records archived.
5. **`common_misuse` must be specific to the principle.** "Can be overused"
   applies to everything and therefore says nothing.
6. **Nulls are expected** on `origin`, `source_url` and `weeks`. A return with
   no nulls anywhere has been filled in rather than researched.
