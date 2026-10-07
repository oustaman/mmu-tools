/* The marking rubric, transcribed verbatim from
 * Screen_Design_Assessment_Brief_CAF.docx (DRAFT · CAF Phase 2 · 2025–26), and
 * checked word for word against Screen_Design_Assessment_Brief_CAF_2026-27.docx
 * on 16 Sep 2026: every name, description and band cell matches.
 *
 * Nothing here is paraphrased. Where the wording is awkward it is the
 * document's wording. This file is the only place the rubric exists in these
 * materials — an earlier version of the deck carried an INVENTED rubric of
 * three criteria weighted equally, which does not appear in any brief and has
 * been removed.
 *
 * Note from the brief, reproduced because it changes how the table is read:
 * "Components within the portfolio are not individually weighted. One overall
 *  mark is awarded for the portfolio as a whole, as per CAF portfolio policy."
 */
const BANDS = [
  {k:"fail",  label:"Fail",  range:"0–39%"},
  {k:"third", label:"Third", range:"40–49%"},
  {k:"tt",    label:"2:2",   range:"50–59%"},
  {k:"ti",    label:"2:1",   range:"60–69%"},
  {k:"first", label:"First", range:"70%+"}
];

const RUBRIC = [
 {n:1, name:"Visual Design & Communication",
  what:"Applies design principles (layout, typography, colour, hierarchy) to create clear, purposeful screen-based communication.",
  b:["Design choices are absent or arbitrary. No evidence of intentional application of layout, typography, or colour.",
     "Some design principles applied inconsistently. Layout and typography functional but basic; limited visual coherence.",
     "Design principles applied with reasonable competence. Visual hierarchy is mostly clear; layouts functional and considered.",
     "Design principles applied confidently and purposefully. Strong visual coherence; typography and colour reinforce communication intent.",
     "Sophisticated, distinctive visual language. Design decisions are precisely motivated, creating an exceptional and coherent screen experience."]},
 {n:2, name:"User-Centred Thinking",
  what:"Demonstrates awareness of user needs, accessibility, and usability in design decisions.",
  b:["No evidence of user-centred consideration. Accessibility or usability not addressed.",
     "Basic acknowledgement of user needs. Some accessibility consideration but inconsistently applied.",
     "User needs are clearly considered. WCAG-informed decisions evident. Prototype is navigable and accessible.",
     "Strong user-centred rationale. Accessibility, inclusivity, and usability are well integrated throughout the prototype.",
     "Exceptional user-centred approach. Prototype demonstrates sophisticated awareness of diverse user needs, inclusive design, and cross-cultural considerations."]},
 {n:3, name:"Technical Craft & Process",
  what:"Demonstrates competence in screen design tools and shows a credible design process (sketches, wireframes, prototype).",
  b:["Process artefacts absent or inadequate. Prototype incomplete or non-functional.",
     "Process artefacts present but underdeveloped. Prototype demonstrates basic tool competence.",
     "Coherent design process evident. Prototype is well-constructed and shows appropriate tool proficiency.",
     "Well-developed, iterative process. Prototype is polished, responsive, and demonstrates confident tool use.",
     "Exemplary process and craft. Prototype is production-quality; process documentation shows critical, iterative thinking."]},
 {n:4, name:"Critical Reflection",
  what:"Reflective rationale evaluates design decisions with reference to design theory, user needs, and wider considerations (e.g. ethics, sustainability, AI use).",
  b:["Reflection absent or descriptive only. No reference to design principles or context.",
     "Basic reflection present. Some reference to design decisions but largely descriptive; limited critical distance.",
     "Clear, structured reflection. Design decisions justified with reference to principles and context; some critical engagement.",
     "Thoughtful, well-evidenced reflection. Evaluates design choices critically; engages with ethical, sustainable, or cultural dimensions.",
     "Sophisticated, theoretically grounded reflection. Demonstrates genuine critical autonomy; integrates design theory, ethics, and broader concerns with insight."]}
];

/* The three approved module outcomes, verbatim from the Worktribe module record
   (Screen Design 2026-27 v1.0, Approved 29 July 2025, module code 1L4Z0045,
   record 4545378). Checked against the record itself on 5 October 2026.

   The references are the university's own — A for Knowledge and Critical
   Understanding, B for Skills and Attributes. Do not renumber them as LO1-3:
   this file and weeks-data.js previously used LO numbers that ran in opposite
   directions, so "LO1" meant one outcome on the hand-in page and a different
   one on the workshop sheet. The official reference is unambiguous, so it is
   the only label used anywhere in this module.

   There is no B3. The assessment brief carried a fourth outcome — "Reflect on
   and justify design decisions…" — and reworded two others. The university
   raised that on 5 October 2026 (Caroline via Evie: the brief did not match the
   approved outcomes on CAMS), and the brief was corrected to these three. This
   file was already right; it is the brief that moved.

   The four RUBRIC criteria below are marking criteria, not outcomes, and do not
   map one-to-one onto the three. */
/* `t` is the official wording and is never edited. The other three fields are
   ours, written because students could read the outcomes but not connect them
   to their own deck (first-week feedback, October 2026):
     plain — the outcome in everyday words
     secs  — the deck sections where it is most visibly shown
     ask   — one question a student can put to their own work
   `secs` is our reading, not the university's, and it is not a weighting: the
   portfolio gets one overall mark. Every code must exist in PARTS; the pages
   that render this warn if one does not. */
/* Sections no outcome owns. The brief asks for each by name, and the Critical
   Reflection criterion marks them, so they are stated rather than left to look
   optional. */
const OUTCOME_REST = { secs:["A7","C6","C7","C8","C9"],
  why:"Asked for by name in the brief, and marked under Critical Reflection. No single outcome owns them, and they still count." };

const OUTCOMES = [
 {id:"A1", group:"Knowledge and Critical Understanding",
  t:"Describe and explain key principles of visual design and their application in screen-based media.",
  plain:"Know the principles, and say how they work on a screen.",
  secs:["C2","C3","C4","C5"],
  ask:"Can you name the principle you used, and point to the place on your screen where it does its job?"},
 {id:"B1", group:"Skills and Attributes",
  t:"Apply fundamental design principles to produce visually engaging layouts.",
  plain:"Use those principles to make screens that hold together.",
  secs:["A3","B1","B2","B3","B5","B6","B7"],
  ask:"Does every screen visibly follow your own grid, and is it obvious what to look at first?"},
 {id:"B2", group:"Skills and Attributes",
  t:"Create user-centered design solutions, incorporating effective typography and colour theory.",
  plain:"Design for the people who will use it \u2014 type they can read, colour that works for everyone.",
  secs:["A1","A2","A4","A5","A6","B4","B8","C1","D1","D2","D3"],
  ask:"Could your user find their way, read every word, and tell your colours apart?"}
];

/* Requirements the brief states that are easy to miss, because they are not in
 * the task list — they are in the CAF alignment section and in the rationale
 * instructions. Every one of them is markable. */
const MUSTS = [
 {k:"ESD", t:"At least one paragraph on the environmental, ethical or social dimension of your design."},
 {k:"International", t:"At least one cross-cultural communication consideration — colour symbolism, reading direction, icon universality, or cultural specificity of imagery."},
 {k:"AI", t:"State which AI tools you used, for what, and how you evaluated or changed the output. Or say why you chose not to."},
 {k:"Accessibility", t:"How your design choices serve user needs and promote accessibility."},
 {k:"Clickable", t:"Your screens are slides, and in week 10 you link them \u2014 every step of the journey to the next, with a way back and a way out. Exported to PDF from PowerPoint or Google Slides, those links still work, and that is your multi-screen prototype. They are checked for existence and destination, not elegance."},
 {k:"Referencing", t:"Cite Them Right Harvard. Reference lists do not count toward the word budget; in-text citations do."}
];
