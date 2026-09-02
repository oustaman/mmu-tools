# themes.json — the portfolio theme bank

**80 records. One return. Cap is hard.**

## What this is for

A hundred students pick a portfolio subject in week 1. Without a bank they pick
what they use, which means forty music players, and a marker reads the same
redesign forty times. The bank exists so collisions are incidental rather than
systemic, and so a tutor can say *"not a music streaming service — one
playlist-sharing feature"* instead of just saying no.

## What makes this different from every other brief in the estate

There is no external truth to check here. A theme is not a fact about the world;
it is a teaching construct, and it is judged on whether it produces good student
work at Level 4. So the failure mode is not fabrication — it is **blandness**.
Eighty themes that are all "a booking app for X" is a return that passes every
validator and is worthless.

The test for each record: *could two students given this theme produce visibly
different portfolios, and would either be markable against the three learning
outcomes?* If the answer is no, cut it.

## Fields

```
id                    theme-slug, stable
theme                 the brief as a student would read it, one sentence
domain                one of: civic · health · money · learning · work ·
                      culture · transport · food · home · community
why_it_works_at_L4    what a beginner can actually get their hands on here,
                      in one sentence. Not marketing.
screen_count_estimate integer, 4–9. The number of distinct screens a competent
                      portfolio would need. Above 9 the theme is too big.
pitfalls[]            2–4 specific ways this theme goes wrong in student hands.
                      Concrete. "Becomes a dashboard" not "can be difficult".
too_big_variant       the version of this theme that is too large for an
                      eleven-week module, named plainly so the tool can point
                      at it. Null only where no such version exists.
example_screen_ids[]  MUST BE NULL. screens.json does not exist yet, and a
                      fabricated id here would break the join silently.
```

## Rules

1. **Eighty, not more.** The previous over-target return in this estate ran 5×
   its cap and was rejected whole. A short bank of good themes is usable; a long
   bank of weak ones sends students to the weak ones.
2. **Spread across all ten domains, minimum five each.** A bank that is 40%
   "app for a thing" has not done the job.
3. **`example_screen_ids` is null on every record.** No exceptions. It is filled
   by a join, later, from real ids.
4. **At least fifteen must be things that are not apps** — a form, a printed
   notice, a kiosk, a letter, a receipt, a sign. This module is called Screen
   Design and half the interesting screens in a person's week are not a product.
5. **No brand names.** Not as themes, not in pitfalls. A theme naming a company
   is a redesign brief, and a redesign of a mature product is the single most
   common way a Level 4 portfolio fails: the student critiques rather than
   designs, and there is nothing of theirs to mark.
6. **Nulls are expected.** `too_big_variant` will legitimately be null on some
   records. A return with no nulls anywhere has been filled in rather than
   thought about, and is rejected whole rather than patched.

## Declare, at the end of the return

```
notes.known_gaps[]        domains you could not fill to five, and why
notes.collected_on        ISO date
notes.method              how the eighty were arrived at
counts.by_domain{}        recomputed, never carried
counts.non_app            how many satisfy rule 4
```
