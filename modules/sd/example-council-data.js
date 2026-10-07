/* The second example portfolio: a solid 2:1, written to sit in the upper 60s.
 *
 *  NOT REAL STUDENT WORK. Invented for teaching, by the module team. No real
 *  submission has been reproduced, adapted or paraphrased here. Castlegate is a
 *  made-up city (the same one as the Room Finder); its council, its website and
 *  every screen of the "before" are drawn by us, not captured from anyone.
 *
 *  Students asked for it in week 1: the 42 shows what thin looks like, and they
 *  wanted to see complete. This is complete. It follows the brief as the module
 *  now teaches it: one goal, the journey people take to it now, and a shorter,
 *  clearer version, with the appendices that prove it.
 *
 *    goal     a student household gets its council tax exemption
 *    before   7 steps on the council's site (D1)
 *    after    4 screens, desktop first, reflowed for tablet and mobile
 *
 *  It is strong, and it is not a First. What holds it at 65, so a tutor can
 *  steer to it and a student can see the distance:
 *    · the improvement is asserted, not measured: seven steps to four is
 *      counted, but fields, clicks and words to read are not (holds
 *      Criterion 2). The fix is measuring both versions, which needs nobody
 *      but the student — testing with other people would need the
 *      university's ethics approval, so the module never asks for it.
 *    · D2 removes the check-your-answers step "because it felt like
 *      repetition" — a reason about the designer, not the user (Criterion 3)
 *    · "Save and come back later" is drawn on every screen and links nowhere
 *      in the click-through (Criterion 3)
 *    · C6 names the consent question the university check raises, then settles
 *      it in one sentence (Criterion 4)
 *    · C7 is generic: "simple English for international students" (Criterion 4)
 *    · the mobile summary on screen 4 keeps two columns it no longer has room
 *      for (Criterion 1, the one visible flaw in otherwise First-level work)
 *
 *  Marks are on the university's stepped scale (72, 65, 65, 62). Their average
 *  is 66, which is not a mark that can be given; the overall is 65.
 *
 *  Shape as EXAMPLE in example-data.js, so the same page renders it:
 *  {n, kind, sec, blocks}; kind is title | divider | section; a block's note is
 *  a margin comment, shown only in the marked copy.
 */
const EXAMPLE = {
 meta: { title: "screen-design-portfolio", student: "", words: 0, slides: 0 },
 mark: { overall: 65, band: "2:1 · 60–69%" },
 slides: [
  { kind: "title", blocks: [
    { t: "h1", x: "SCREEN DESIGN — PORTFOLIO" },
    { t: "meta", x: "Student ID: 23017745" } ] },

  { kind: "divider", blocks: [{ t: "h2", x: "PART A — DESIGN SPEC SHEET" }] },

  { kind: "section", sec: "A1", blocks: [
    { t: "h3", x: "A1.  THEME & AUDIENCE" },
    { t: "kv", x: [
      ["Theme", "Council tax for student households — getting the exemption you are already entitled to."],
      ["Audience", "Full-time students renting a shared house in Castlegate, most of them dealing with council tax for the first time, usually in their first month in the house."] ] } ] },

  { kind: "section", sec: "A2", blocks: [
    { t: "h3", x: "A2.  THE JOURNEY, BEFORE AND AFTER" },
    { t: "pre", x:
"Goal: a house where everyone studies full time stops being billed.\n\n" +
"BEFORE — the council's site today (D1)        AFTER — my screens\n" +
"1. Find the right page among 14 exemptions    1. Start — one question: is\n" +
"2. Create an account, verify the email           everyone a full-time student?\n" +
"3. Enter an account number from a bill        2. Your home and who lives there\n" +
"   you have not received yet                  3. Proof — the university confirms,\n" +
"4. Pick 'Class N' from a legal dropdown          or you upload a certificate\n" +
"5. Add residents one page at a time           4. Sent — your reference, and\n" +
"6. Upload a PDF per person, under 2 MB           what happens next\n" +
"7. Declaration, then a page with no reference\n\n" +
"Steps before: 7                               Screens after: 4" } ] },

  { kind: "section", sec: "A3", blocks: [
    { t: "h3", x: "A3.  LAYOUT" },
    { t: "kv", x: [
      ["Columns", "8 desktop · 6 tablet · 4 mobile"],
      ["Gutter", "24 px (16 px on mobile)"],
      ["Margin", "40 px desktop · 32 px tablet · 16 px mobile"],
      ["Max width", "960 px; the form column is 6 of the 8"],
      ["Breakpoint 1", "1024 px — desktop, 8 columns"],
      ["Breakpoint 2", "768 px — tablet, 6 columns"],
      ["Breakpoint 3", "375 px — mobile, 4 columns"],
      ["Spacing scale", "4 · 8 · 16 · 24 · 40 · 64"] ] } ] },

  { kind: "section", sec: "A4", blocks: [
    { t: "h3", x: "A4.  TYPOGRAPHY" },
    { t: "kv", x: [
      ["Heading family", "Lexend, 600"],
      ["Body family", "Atkinson Hyperlegible, 400 and 700"],
      ["Base size", "18 px desktop and tablet · 17 px mobile"],
      ["Scale ratio", "1.25 (major third)"],
      ["Sizes and their roles", "35 the question · 28 section heads · 22 field labels · 18 body · 15 hints only"],
      ["Line height", "1.5 body · 1.2 headings"],
      ["Measure", "60–66 characters; the form column stops at 66"] ] } ] },

  { kind: "section", sec: "A5", blocks: [
    { t: "h3", x: "A5.  COLOUR + CONTRAST TABLE" },
    { t: "kv", x: [
      ["Background", "#FFFFFF"], ["Surface", "#F2F4F6"], ["Body text", "#1F2933"],
      ["Quiet text", "#52606D"], ["Accent", "#0B5C8E"], ["Error", "#B42318"] ] },
    { t: "pre", x:
"CONTRAST — every text on every background it sits on\n" +
"  body on background    14.76:1      quiet on surface   5.86:1\n" +
"  quiet on background    6.46:1      accent on surface  6.49:1\n" +
"  body on surface       13.38:1      white on accent    7.15:1\n" +
"  accent on background   7.15:1      error on background 6.57:1\n" +
"First accent was #2B8FD0 — 3.62:1 on white. Darkened it; every pair now passes AA." } ] },

  { kind: "section", sec: "A6", blocks: [
    { t: "h3", x: "A6.  ACCESSIBILITY" },
    { t: "kv", x: [
      ["Minimum touch target", "44 × 44 px for every control, including the 'Change' links"],
      ["Focus state", "#FFB81C fill with a 4 px #1F2933 bar under it. The yellow alone is 1.73:1 on white, so the dark bar carries the contrast (14.76:1)"],
      ["Non-colour cues", "Errors: an icon, the word 'Error', and a message next to the field. Required: every field is required, optional ones say so. The step is named in words, not only shown in the progress bar"] ] } ] },

  { kind: "section", sec: "A7", blocks: [
    { t: "h3", x: "A7.  AI USE LOG" },
    { t: "pre", x:
"Tool | What it made | What I changed | Why\n\n" +
"1. ChatGPT | a plain-English version of the 'Class N' exemption\n" +
"   | cut 'you will be exempt' to 'your home may be exempt'\n" +
"   | the council decides, not the form; it was promising a result\n\n" +
"2. ChatGPT | six versions of the start question\n" +
"   | used none as written; combined two of them\n" +
"   | all six asked about the reader, not about everyone in the house\n\n" +
"3. Adobe Firefly | a terrace-house illustration for the mood board\n" +
"   | kept it on the board only, not on any screen\n" +
"   | the windows were wrong and nobody needs a picture to fill in a form" } ] },

  { kind: "divider", blocks: [{ t: "h2", x: "PART B — THE WORK" }] },

  { kind: "section", sec: "B1", blocks: [
    { t: "h3", x: "B1.  CONCEPT SKETCHES" },
    { t: "img", a: "sketches", x: "Eight thumbnails of the start screen" },
    { t: "cap", x: "Eight ways of opening the form, drawn in the week 2 workshop. Four started with a list of exemptions, because that is what the council's site does; I crossed all four out once I saw I was copying the problem. Number 6 asks one question about the whole house and puts everything else below it. That is the one I built. Number 3 had a progress bar with seven steps, which is the before, not the after. The thumbnails taught me the start screen has one job: tell someone in ten seconds whether this is for them." } ] },

  { kind: "section", sec: "B2", blocks: [
    { t: "h3", x: "B2.  MOOD BOARD" },
    { t: "img", a: "mood", x: "Mood board: calm, official, not cold" },
    { t: "cap", x: "Three words I kept coming back to: calm, official, human. Official because people need to trust it with their address and their university details; calm because council tax arrives as a threat; human because the current site reads like the regulation it is built on. The navy is from the council's own sign on the town hall. The yellow is borrowed from road signs: it means look here, not danger. The illustration is AI-generated and stays on this board — see A7." } ] },

  { kind: "section", sec: "B3", blocks: [
    { t: "h3", x: "B3.  STYLE TILE" },
    { t: "img", a: "tile", x: "Style tile" },
    { t: "cap", x: "Everything on the tile comes from A3 to A6. Lexend at 35 for the question, Atkinson Hyperlegible at 18 for everything you read, so the two jobs never look alike. The primary button is the only filled shape on any screen. The radio options are 44 px tall, the full row clickable, not just the circle. The focus state is the yellow fill with the dark bar under it, which is the part of the tile I changed most: my first version was a yellow outline and it failed on white." } ] },

  { kind: "section", sec: "B4", blocks: [
    { t: "h3", x: "B4.  FLOW DIAGRAM" },
    { t: "img", a: "flow", x: "Flow from start to sent" },
    { t: "cap", x: "Four screens and three decisions. Not everyone a student: the flow ends with the 25% single-person and other discounts, so nobody leaves with nothing. Not sure: a plain-English check, and a phone number. Proof splits two ways and joins again. Every screen has a way back. 'Save and come back later' sits on every screen and sends a link to your email — the only thing I ask for that the old site also asked for, but not as an account." } ] },

  { kind: "section", sec: "B5", blocks: [
    { t: "h3", x: "B5.  WIREFRAME SET" },
    { t: "img", a: "wires", x: "Four wireframes" },
    { t: "cap", x: "All four on the 8-column grid from A3, with the form held to 6 columns so no line runs past 66 characters. The notes are the decisions I would otherwise forget: the start question goes first, before the logo has done its job; the people list grows in place instead of reloading; the proof screen offers the faster route first. Wireframe 4 had a check-your-answers page before it. I took it out — see D2." } ] },

  { kind: "section", sec: "B6", blocks: [
    { t: "h3", x: "B6.  THE FINISHED SCREENS — 1 OF 4 · START" },
    { t: "img", a: "s1", x: "Screen 1: does everyone who lives with you study full time?" },
    { t: "cap", x: "One question, about the whole house. Under it, in plain words, what full time means and what you will not need: no account, no council tax number." } ] },

  { kind: "section", sec: "B6", blocks: [
    { t: "h3", x: "B6.  THE FINISHED SCREENS — 2 OF 4 · YOUR HOME" },
    { t: "img", a: "s2", x: "Screen 2: your home and who lives there" },
    { t: "cap", x: "The address from a postcode. Everyone in the house on one screen; adding a person grows the list, it does not reload the page." } ] },

  { kind: "section", sec: "B6", blocks: [
    { t: "h3", x: "B6.  THE FINISHED SCREENS — 3 OF 4 · PROOF" },
    { t: "img", a: "s3", x: "Screen 3: proof that you are students" },
    { t: "cap", x: "The proof the law requires, kept and moved. Castlegate University can confirm it directly; uploading a certificate is the other way." } ] },

  { kind: "section", sec: "B6", blocks: [
    { t: "h3", x: "B6.  THE FINISHED SCREENS — 4 OF 4 · SENT" },
    { t: "img", a: "s4", x: "Screen 4: sent, with a reference" },
    { t: "cap", x: "A reference on screen, the same one by email, and what happens next with dates. A person to talk to is on every screen, not hidden in the footer." } ] },

  { kind: "section", sec: "B7", blocks: [
    { t: "h3", x: "B7.  2 SCREENS × 3 SIZES" },
    { t: "img", a: "resp", x: "Screens 2 and 4 at desktop, tablet and mobile" },
    { t: "cap", x: "Screens 2 and 4 at the three breakpoints in A3. On mobile the people list stops being a table and becomes one card per person, with the university and course end under the name. The progress bar becomes 'Step 2 of 4' in words. Buttons go full width at 375. Screen 4 on mobile keeps the two-column summary, which I think still reads." } ] },

  { kind: "section", sec: "B8", blocks: [
    { t: "h3", x: "B8.  CLICK-THROUGH" },
    { t: "pre", x:
"From slide → to slide — what the reader clicked\n\n" +
"1. 16 → 17   'Yes, everyone' then Continue (screen 1 to 2)\n" +
"2. 17 → 18   Continue (screen 2 to 3)\n" +
"3. 18 → 19   Send application (screen 3 to 4)\n" +
"4. 17 → 16   Back (screen 2 to 1)\n" +
"5. 18 → 17   Back (screen 3 to 2)\n" +
"6. 19 → 17   'Change' next to Your home (screen 4 to 2)\n\n" +
"Way back: Back on every screen. Way out: 'Talk to a person' and\n" +
"'Save and come back later' on every screen." } ] },

  { kind: "divider", blocks: [{ t: "h2", x: "PART C — RATIONALE" }] },

  { kind: "section", sec: "C1", blocks: [
    { t: "h3", x: "C1.  THEME & AUDIENCE" },
    { t: "p", x: "Everyone in my house got a council tax bill in our first week, for a house that was exempt. My audience is students in exactly that position (A1): first time renting, first time billed, entitled to pay nothing and asked to prove it. I chose it because the goal is clear and small, and the current journey is seven steps long for something the law already says is yours." } ] },

  { kind: "section", sec: "C2", blocks: [
    { t: "h3", x: "C2.  LAYOUT & HIERARCHY" },
    { t: "p", x: "I wanted one thing read first on every screen: the question. So the question is the largest thing on the page and the logo is the smallest thing in the header; nothing competes with it (Krug, 2014). The grid has 8 columns (A3) instead of 12 because the form only ever needs two widths: the 6-column form, and the 2-column panel beside it for help. Twelve columns gave me choices I did not need. The 40 px margin and 64 px space above each question keep each screen to one idea." } ] },

  { kind: "section", sec: "C3", blocks: [
    { t: "h3", x: "C3.  TYPOGRAPHY" },
    { t: "p", x: "Atkinson Hyperlegible was designed by the Braille Institute so that easily confused letters stay distinct, which matters on a form where people type postcodes and student numbers (Braille Institute, no date). Lexend carries the questions so a heading never looks like an answer. The scale is 1.25 (A4): five sizes, each with one job. I dropped a 12 px size I had for legal text; at 12 px nobody reads the declaration, and it is the one thing the law says they must." } ] },

  { kind: "section", sec: "C4", blocks: [
    { t: "h3", x: "C4.  COLOUR" },
    { t: "p", x: "Navy for the council, because people have to trust this with their address. My first accent, #2B8FD0, measured 3.62:1 on white, which fails for text, so I darkened it to #0B5C8E: 7.15:1, and still the same blue to the eye (A5). The yellow is only ever focus. It fails on white on its own at 1.73:1, so it never stands alone — the dark bar under it does the work. Red is only for errors, and never without the word." } ] },

  { kind: "section", sec: "C5", blocks: [
    { t: "h3", x: "C5.  USER NEEDS & ACCESSIBILITY" },
    { t: "p", x: "The need is to stop being billed, quickly and without fear of getting it wrong. Seven steps became four (A2), and the two that were worst for students went: the account, and the council tax number you do not have until the bill arrives. Every control is 44 px (A6), the WCAG target size (W3C, 2023), because people do this on a phone on the bus as often as at a desk. Errors are said in words, not colour. The proof step stays, because the law requires it (Council Tax (Exempt Dwellings) Order 1992), but it is now the university's job by default, not yours." } ] },

  { kind: "section", sec: "C6", blocks: [
    { t: "h3", x: "C6.  ETHICS OR SUSTAINABILITY" },
    { t: "p", x: "The faster proof route means Castlegate University tells the council who is a student. That is a real question about consent, and I designed for it: the box is unticked, it says exactly what is shared (name, course, end date), and uploading a certificate is always there instead. I also collect less than the old site did — no account, no date of birth, no phone number. I think that makes it more ethical overall than the current version." } ] },

  { kind: "section", sec: "C7", blocks: [
    { t: "h3", x: "C7.  A CROSS-CULTURAL CONSIDERATION" },
    { t: "p", x: "Many students in Castlegate are international, and council tax may not exist where they come from. I wrote everything in simple English and avoided jargon like 'liable' and 'Class N', so the form makes sense to someone whose first language is not English. I also avoided icons that might mean different things in different cultures, and used words on every button instead." } ] },

  { kind: "section", sec: "C8", blocks: [
    { t: "h3", x: "C8.  YOUR AI USE" },
    { t: "p", x: "I used ChatGPT twice and Firefly once (A7). ChatGPT was useful as a translator from legal English, but it made a promise the form cannot keep, 'you will be exempt', and I only caught it because I read the regulation it was summarising. Its start questions were all about 'you', not the house, which is the whole point of the exemption. So the words on the screens are mine, checked against the source. Firefly's house stayed on the mood board." } ] },

  { kind: "section", sec: "C9", blocks: [
    { t: "h3", x: "C9.  REFERENCES" },
    { t: "pre", x:
"Braille Institute (no date) Atkinson Hyperlegible font. Available at:\n" +
"  https://www.brailleinstitute.org/freefont/ (Accessed: 20 November 2026).\n\n" +
"Council Tax (Exempt Dwellings) Order 1992, SI 1992/558. Available at:\n" +
"  https://www.legislation.gov.uk/uksi/1992/558 (Accessed: 3 November 2026).\n\n" +
"Krug, S. (2014) Don't make me think, revisited. 3rd edn. San Francisco:\n" +
"  New Riders.\n\n" +
"W3C (2023) Web Content Accessibility Guidelines (WCAG) 2.2. Available at:\n" +
"  https://www.w3.org/TR/WCAG22/ (Accessed: 3 November 2026)." } ] },

  { kind: "divider", blocks: [{ t: "h2", x: "PART D — APPENDICES" }] },

  { kind: "section", sec: "D1", blocks: [
    { t: "h3", x: "D1.  THE PROCESS BEFORE" },
    { t: "img", a: "before", x: "The council's current seven steps" },
    { t: "cap", x: "Steps before (from A2): 7. Walked on 3 November 2026, from a search for 'student council tax Castlegate' to the thank-you page." } ] },

  { kind: "section", sec: "D2", blocks: [
    { t: "h3", x: "D2.  BEFORE → AFTER, MAPPED" },
    { t: "pre", x:
"BEFORE STEP  →  AFTER  —  what happened, and why\n\n" +
"1. Find the page     → 1 Start     merged — one question replaces 14 exemptions\n" +
"2. Create account    → removed     a save link by email does the same job\n" +
"3. Account number    → removed     students have no bill yet; the address finds it\n" +
"4. 'Class N' list    → 1 Start     merged — the question IS Class N, in plain words\n" +
"5. Residents x N     → 2 Your home merged — one screen, the list grows in place\n" +
"6. Upload per person → 3 Proof     kept, moved — the law requires proof; the\n" +
"                                   university can now supply it\n" +
"7. Declaration       → 3 Proof     merged into the send step\n" +
"   (my wireframe 4: check your answers → removed, it felt like repetition)\n\n" +
"Steps before: 7        Screens after: 4\n" +
"Not everyone a student → other discounts, so nobody leaves with nothing." } ] },

  { kind: "section", sec: "D3", blocks: [
    { t: "h3", x: "D3.  SIDE BY SIDE" },
    { t: "img", a: "side", x: "Two steps before and after" },
    { t: "cap", x: "Top: 'Select exemption type' and its list of legal classes, against one question about the house. Bottom: a PDF per person under 2 MB, against the university confirming it." } ] }
 ],

 criteria: [
  { n: 1, name: "Visual Design & Communication", band: "First · 70%+", mark: 72,
    s: "The strongest part of the portfolio, and First-level on its own. One question per screen, held by a hierarchy that is obvious and argued for (C2): the question at 35, the logo the smallest thing in the header. Type, colour and spacing all come from declared values and every screen obeys them. The reflow in B7 is real — the people table becomes cards. The one flaw is the mobile summary on screen 4, which keeps two columns it has no room for." },
  { n: 2, name: "User-Centred Thinking", band: "2:1 · 60–69%", mark: 65,
    s: "Accessibility is designed in rather than asserted: every pair passes, the focus state is solved properly, errors are never colour alone. The journey is genuinely shorter, and the two steps students could not complete are gone. What holds it in the 2:1 is evidence: 'faster' and 'clearer' are asserted, not measured. Seven steps to four is counted; the fields to fill, the clicks and the words to read on each version are not, so the argument stops at the screen count." },
  { n: 3, name: "Technical Craft & Process", band: "2:1 · 60–69%", mark: 65,
    s: "A credible, iterative process from eight sketches to four finished screens, with the before captured and every step accounted for. Two things hold it back. D2 removes the check-your-answers step 'because it felt like repetition', a reason about the designer rather than the user, on the one form where a mistake costs money. And 'Save and come back later' is drawn on every screen but links nowhere in the click-through." },
  { n: 4, name: "Critical Reflection", band: "2:1 · 60–69%", mark: 62,
    s: "Every C section quotes the student's own numbers and most defend a decision rather than describe it — C4 and C8 are the best examples. The ethics paragraph finds the right question, consent to the university check, and then answers it in one sentence. C7 is generic: 'simple English for international students' could be written about any form, and names nothing specific to this one." }
 ],
 overall: "65 · 2:1. A complete, well-made portfolio that does what the brief asks and argues for most of it. It is not a First because its strongest claim is asserted rather than measured, and its hardest question is answered too quickly: a First would count what a person does on both versions — fields, clicks, words to read — and would weigh the consent question rather than settle it.",
 gaps: [
  ["Measure both versions", "Count what a person has to do on each: fields to fill, clicks, words to read, and every point where the old site asks for something a student does not have. A before-and-after table turns 'clearer' from a judgement into a finding, and it needs nobody but you."],
  ["Weigh the consent question", "C6 names it. A First would say who sees what, why unticked is the right default, and what happens to a student who says no."],
  ["Defend or restore 'check your answers'", "It was removed for the designer's comfort. Either a reason about the user, or put it back."],
  ["Link 'save and come back'", "It is on every screen and goes nowhere. One more slide and one more link."],
  ["Make C7 about this form", "Name order on the people screen, course dates that follow other academic calendars — something only this form has."]
 ]
};

/* Margin comments, shown only in the marked copy. Attached by section, by
   which slide of that section (B6 has four), and by block, so the deck above
   reads as the student wrote it. Strengths as well as limits: a student learns
   as much from why a slide earns marks as from why another does not. */
const NOTES = [
 { sec:"A2", b:1, c:3, band:"First", s:"The slide the whole deck rests on: a goal in one sentence, both lists, both counted. Every C section can now quote 7 → 4, and most of them do." },
 { sec:"A3", b:1, c:1, band:"First", s:"Eight columns, argued for in C2 rather than defaulted to. Every number here is visible on the screens — check any of them." },
 { sec:"A5", b:2, c:2, band:"First", s:"Every pair measured, and the record shows a change: the first accent failed at 3.62:1 and was darkened. That one line is worth more than a table that was right first time." },
 { sec:"A6", b:1, c:2, band:"First", s:"The focus state is solved, not just stated. Yellow alone fails at 1.73:1, so a dark bar carries the contrast. Plenty of professional sites get this wrong." },
 { sec:"A7", b:1, c:4, band:"First", s:"An honest log: each use, what changed, and why. Compare the first example, where A7 says none and B4 says otherwise." },
 { sec:"B1", b:2, c:3, band:"2:1", s:"Eight real alternatives, and the caption says what they taught — four crossed out because they copied the before. That is process, not decoration." },
 { sec:"B5", b:2, c:3, band:"2:1", s:"'Wireframe 4 had a check-your-answers page before it. I took it out — see D2.' The decision is recorded, which is good. The reason, in D2, is the problem." },
 { sec:"B6", i:4, b:1, c:2, band:"First", s:"The reference is the largest thing after the heading, and what happens next has dates. The one screen a student would screenshot is designed to be screenshotted." },
 { sec:"B7", b:2, c:1, band:"2:1", s:"A real reflow at tablet, and on mobile the table becomes cards. Then screen 4 on mobile keeps its two columns, and the caption says 'I think it still reads.' At 375 the values wrap into a sliver. One sentence of doubt is not a check." },
 { sec:"B8", b:1, c:3, band:"2:1", s:"Every step links forward and back — that is the clickable prototype the brief asks for. But 'Save and come back later' is drawn on every screen and appears nowhere in this list: a way out the reader cannot take." },
 { sec:"C2", b:1, c:4, band:"First", s:"Defends rather than describes: why 8 columns, what 12 would have cost, and a number from A3 inside the argument." },
 { sec:"C5", b:1, c:2, band:"2:1", s:"'Seven steps became four' is the strongest sentence in the deck — and the only number behind it. Count fields, clicks and words to read on both versions, and 'clearer' becomes a finding instead of a judgement." },
 { sec:"C6", b:1, c:4, band:"2:1", s:"Finds exactly the right question — consent to the university sharing data — then answers it in one sentence. Who sees what? What happens to a student who says no? Why is unticked the right default? That paragraph is the First, and it is left unwritten." },
 { sec:"C7", b:1, c:4, band:"2:2", s:"Generic. 'Simple English' and 'no culture-specific icons' could be written about any form. This one has something specific to say: names in a different order on the people screen, course dates that follow other academic calendars." },
 { sec:"C8", b:1, c:4, band:"First", s:"The best paragraph in the deck. The AI made a promise the form cannot keep, and the student caught it by reading the source. That is evaluating the output, not just logging it." },
 { sec:"C9", b:1, c:4, band:"2:1", s:"Four sources, all real, all cited in the text, in Cite Them Right format. Enough for Level 4. A First would read one of them closely rather than cite it in passing." },
 { sec:"D2", b:1, c:3, band:"2:2", s:"Every step accounted for, with a reason — except one. 'It felt like repetition' is a reason about the designer. On a form where a mistake costs money, check-your-answers is the user's safety net. Defend it with something about the user, or put it back." },
 { sec:"D3", b:2, c:2, band:"First", s:"Before and after, side by side, make the argument without a word of rationale. This is what the appendices are for." }
];

/* words and slides are counted, not typed; notes are attached here */
(function () {
  EXAMPLE.slides.forEach((s, i) => { s.n = i + 1; });
  NOTES.forEach(nt => {
    const slides = EXAMPLE.slides.filter(s => s.sec === nt.sec);
    const sl = slides[(nt.i || 1) - 1], blk = sl && sl.blocks[nt.b];
    if (!blk) throw new Error(`council example: no block ${nt.b} on ${nt.sec}${nt.i ? ' #' + nt.i : ''}`);
    blk.note = { c: nt.c, band: nt.band, s: nt.s };
  });
  EXAMPLE.meta.slides = EXAMPLE.slides.length;
  const words = t => String(t).trim().split(/\s+/).filter(Boolean).length;
  EXAMPLE.meta.words = EXAMPLE.slides.reduce((a, s) => a + s.blocks.reduce((b, k) =>
    b + (Array.isArray(k.x) ? k.x.reduce((c, r) => c + words(r.join(' ')), 0) : (k.t === 'img' ? 0 : words(k.x))), 0), 0);
})();
