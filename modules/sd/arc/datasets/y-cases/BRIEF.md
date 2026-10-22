# y-cases.json — the accessibility cases

**25 maximum. Blocked on `screens.json`. Written as a procedure, not a prompt.**

The name is `a11y` with the middle worn off, and it is kept short because it is
typed into `annotation.a11y_failures[]` by hand, once per case, on a lot of rows.

## Why there is no prompt here

The same reason as `screens/CAPTURE.md`, one step further on. A case in this file
is a claim that a specific screen fails a specific person in a specific way. A
model given those fields will produce twenty-five fluent, plausible, unverifiable
failures, and nothing downstream would catch it — a fabricated contrast ratio
looks exactly like a measured one, and it would be taught in week 9 as fact.

So this file is filled by a detection pass and an authored confirmation, and the
gap between those two is the whole point of the dataset.

## The distinction this dataset exists to teach

**A checker's output is not a finding.** Every criterion worth flagging carries
exceptions a bounding box cannot evaluate: SC 2.5.8 has five of them, SC 1.4.10
excepts content that genuinely needs two dimensions, SC 1.4.3 does not apply to
incidental text or logotypes. An automated pass produces *candidates*. A person
turns a candidate into a `confirmed` case or a `dismissed` one.

**Dismissed cases stay in the file.** This is not tidiness — a dismissal is the
most valuable record here. A student who has seen a real flag from a real tool,
dismissed for a stated reason on a named screen, has learned something no
lecture slide about "automated testing catches ~30% of issues" will teach. Delete
them and the file becomes a list of failures, which is the less useful artefact.

## What the detection pass can and cannot give you

`capture_screens.mjs` already measures two of these directly:

- **target size** — `measured.target_size_summary.under_24_naive` counts boxes
  under 24×24 CSS px, and the field is named `naive` because it evaluates none of
  SC 2.5.8's exceptions. Those counts are candidates and nothing more.
- **reflow** — `measured.breakpoints_captured[]` records `overflow_x` at 360 px,
  which is a reflow signal rather than a reflow failure.

It does **not** give you contrast. `measured.palette` is a share of bounding-box
colour across the page; it never pairs a text colour with the background actually
behind it, which is what SC 1.4.3 is about. Contrast candidates need a pass that
resolves the effective background per text node, and that pass does not exist
yet. Do not fill `contrast` cases from the palette — that is a fabricated number
with a real-looking source, which is the exact shape of the return this estate
archived.

For everything else — alt text, labels, heading structure, keyboard traps, motion
— use an established rule engine rather than writing one. Record which engine and
which version in `notes.detector`, because a case found by a tool is only
reproducible if the tool is named.

## Coverage, and the thing that will go wrong

`screens/CAPTURE.md` names it already: *every week 9 accessibility case is a
colour contrast failure because nothing else got captured*. Contrast is the
easiest to detect and the easiest to explain, and left alone it will eat the file.

- **No more than five cases of any one `failure_type`.** A ceiling, not a target.
- **No more than two cases from any one `screen_id`.** Six failures on one
  unlucky portal is a portrait of that portal, not a syllabus.
- **At least twelve distinct screens represented.**
- Prefer a case that cannot be automated at all — a reading order that is
  correct in the source and wrong on the page, an error message that identifies
  the field and does not say what is wrong with it. Those are the ones a student
  cannot find with a browser extension, and therefore the ones worth a case.

## This is not a league table

Most of the corpus is national government portals, and a file that counts
failures per `source` is a ranking of governments wearing a teaching dataset's
clothes. This estate already retired a metric for less.

- **No aggregate score, grade or rank per source, ever** — not in this file, not
  in an instrument that reads it, not in a lecture slide built from it.
- `counts` may report by failure type, status and evidence. It must not report
  by source or by country.
- A case names a screen because the join needs it, not because the organisation
  is the subject. The subject is the failure.

## Fields

```
id                  sd-y-NNN, stable
screen_id           joins screens.json. MUST be an id that already exists there.
                    This file is blocked on that one precisely so this field can
                    never be invented — a case with no screen is not a case.
failure_type        one of the enum in schema.json
wcag_ref            "SC 1.4.3 Contrast (Minimum)" or null. Null is common and
                    correct: plenty of real failures breach no criterion.
principle_ids[]     joins principles.json, or []
evidence            measured · observed · reported
measurement{}       the number and its units, where evidence is measured.
                    Null otherwise. Never a number nobody took.
detector            the tool and version that raised it, or null if a person did
status              candidate · confirmed · dismissed
confirmed_by/_on    a person and a date. Required to be confirmed.
dismissed_because   required to be dismissed. State which exception applies.
what_the_user_hits  the consequence for a person, in one sentence. Not the rule
                    restated — "the focus ring is invisible on the blue header"
                    rather than "fails SC 2.4.7".
exceptions_checked  which of the criterion's exceptions were considered and
                    ruled out. Null where the criterion has none.
teaching_note       what this case is for in week 9, or null
```

## Rules

1. **Twenty-five maximum, and no floor.** Fifteen confirmed cases with honest
   dismissals beside them beat twenty-five that were reached for.
2. **`screen_id` must resolve.** JSON Schema can check the shape and cannot check
   existence; until the validator covers this folder, check the join by hand
   before the file is read from. See the note at the end.
3. **A `candidate` is never taught as a failure.** Instruments must render status
   on the face of the case, the same way a null annotation renders as "not yet
   annotated" rather than being skipped.
4. **No invented measurements.** If the ratio was not computed, `evidence` is
   `observed` and `measurement` is null.
5. **`what_the_user_hits` names a person's experience.** A case that can only
   describe itself by citing the criterion has not been understood well enough
   to teach.
6. **Nulls are expected** on `wcag_ref`, `detector`, `exceptions_checked` and
   `teaching_note`.

## The join, and which side owns it

`screens.json` carries `annotation.a11y_failures[]`. **This file is authoritative
and that field is derived from it** — built by looking up the cases whose
`screen_id` matches, exactly as the Stairwell's ten principles are derived rather
than recopied. Maintaining the list on both sides produces two lists that agree
until the day they do not.

## Copyright

Unchanged from `screens/CAPTURE.md`: the case reproduces someone's interface to
make a teaching point inside a closed module. Capture the smallest thing that
carries the point, keep the corpus inside the module, and if any of it goes on a
public page, draw the specimen rather than reproduce it.

## Ordering

1. Annotate the thirty government screens first. A case needs the annotated half
   — a reading-order failure cannot be stated against a row where nobody has
   recorded the reading order.
2. Run the detection pass over those thirty. Record every candidate, including
   the ones you expect to dismiss.
3. Confirm or dismiss in one sitting, so the standard applied is one standard.
4. Only then judge whether twenty-five is reachable, and from which screen types.
   If it is not, return what is honest and say so in `notes.known_gaps`.

## Before this file is read from

`_common/validate.py` cannot see this folder — its dataset roots are
`shared/deepseek-research-todo/` and `shared/deepseek-research/`, and its
duplication rule compares `semantics.meaning_plain` against `meaning_official`,
not anything in here. So the schema is the only automatic gate, and the schema
cannot check that a `screen_id` resolves, that no `failure_type` exceeds five, or
that no screen carries more than two cases. Those three are hand checks until the
validator reaches this folder.
