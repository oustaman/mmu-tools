/* Dates and the hand-in list, in one place, used by all three pages.
 *
 *  ── CHANGE THESE TWO LINES AND EVERYTHING FOLLOWS ────────────────────────
 *  WEEK1_MONDAY  the Monday teaching week 1 begins
 *  DEADLINE      submission, local time
 *  ─────────────────────────────────────────────────────────────────────────
 *
 *  Everything else — which week it is, what is due, how far behind a student
 *  is, the countdown — is computed from those two. Nothing is typed twice.
 */
const TERM = {
  /* First class, and it is a Tuesday — the whole module runs on one day.
     Eleven consecutive Tuesdays, 6 Oct to 15 Dec 2026, no reading week. */
  WEEK1: '2026-10-06',
  DEADLINE: '2027-01-08T21:00',
  WEEKS: 11,
  DAY: 'Tuesday'
};

/* The day itself. One hour, two hours, a two-hour gap, then two hours. */
const SESSIONS = [
  { k:'lecture',  n:'Lecture',  from:'09:00', to:'10:00', hrs:1,
    who:'Everyone · 100+', where:'GM LT7', building:'Geoffrey Manton',
    led:'Module leader', you:'Watch one thing get built' },
  { k:'workshop', n:'Workshop', from:'10:00', to:'12:00', hrs:2,
    who:'3 groups · 30–35 each', where:'Breakout rooms', building:'Room allocation TBC',
    led:'Your group tutor', you:'Make one piece of your hand-in' },
  { k:'support',  n:'Support',  from:'14:00', to:'16:00', hrs:2,
    who:'Drop in, any group', where:'Same rooms', building:'After the lunch break',
    led:'Staff present, nothing taught', you:'Work here · get stuck · ask' }
];

/* The hand-in, with the week each item is produced in.
 *
 *  `dw` is the due week and it is what makes the progress bar move on its own:
 *  by the end of week N a student should have every item whose dw is N or less.
 *  It is the same number as the workshop that produces the item, because every
 *  workshop ends with something going into the folder — that is the whole
 *  design of the module and this field is where it is written down.
 */
/* The hand-in — one slide deck, filled in across the term.
 *
 *  Nothing is submitted weekly. A student copies the skeleton in week 1, pastes
 *  it into one deck — a section per slide — shares it, and fills a section at a time. `dw` is the
 *  week the section gets filled, which is the workshop that produces it.
 *
 *  This array generates three things and is the only place any of them is
 *  written: the copyable skeleton, the tick-list, and each week's "fill in this
 *  section". An earlier version had a filename per week and a separate outline,
 *  and the two disagreed within a day.
 *
 *  `f` is the fill-in lines for the skeleton. An empty string is a blank line.
 */
const PARTS = [
 {id:"A", name:"Design spec sheet", tag:"≈400 words equivalent",
  desc:"Fill-in fields, not writing. Every one comes out of a workshop.",
  items:[
   {sec:"A1", t:"Theme & audience", dw:2, d:"Two lines written",
    h:"One sentence each. Who is it for, what do they need.",
    f:["Theme:","Audience:"]},
   {sec:"A2", t:"Screen inventory", dw:7, d:"6–8 rows, each with a job",
    h:"Your 6–8 screens. Each gets a job in under ten words.",
    f:["1.  screen  —  job","2.","3.","4.","5.","6.","7.  (optional)","8.  (optional)"]},
   {sec:"A3", t:"Layout", dw:3, d:"Every field has a number",
    h:"Columns, gutter, margin, max width, 3 breakpoints, spacing scale.",
    f:["Columns:","Gutter:","Margin:","Max width:","Breakpoint 1:","Breakpoint 2:","Breakpoint 3:","Spacing scale:"]},
   {sec:"A4", t:"Typography", dw:4, d:"Every field has a number",
    h:"Families and roles, sizes, line heights, scale ratio, measure.",
    f:["Heading family:","Body family:","Base size:","Scale ratio:","Sizes and their roles:","Line height:","Measure (characters per line):"]},
   {sec:"A5", t:"Colour + contrast table", dw:5, d:"No pair below 4.5:1 unlisted",
    h:"Hex with roles, and a contrast ratio for every text/background pair.",
    f:["Background:  #","Surface:     #","Body text:   #","Quiet text:  #","Accent:      #","",
       "CONTRAST — every text on every background it sits on","  body on background   =      :1","  quiet on background  =      :1","  body on surface      =      :1","  accent on background =      :1"]},
   {sec:"A6", t:"Accessibility", dw:9, d:"Three fields filled",
    h:"Minimum touch target, focus state, non-colour cues.",
    f:["Minimum touch target:","Focus state:","Non-colour cues:"]},
   {sec:"A7", t:"AI use log", dw:6, d:"Every AI use has a line",
    h:"The running record — tool, output, what you changed. You evaluate it later, in C8.",
    f:["Tool  |  What it made  |  What I changed  |  Why","1.","2.","3."]}
  ]},
 {id:"B", name:"The work", tag:"images, with a caption each",
  desc:"Everything visual. Paste images straight into the deck as you make them. Screens get one slide each.",
  items:[
   {sec:"B1", t:"Concept sketches", dw:3, d:"Photo in the deck",
    h:"Your week 2 thumbnails, photographed. Pasted in week 3, once your theme has survived a week.",
    f:["[ paste photo of 8 thumbnails ]","Caption (~100 words):"]},
   {sec:"B2", t:"Mood board", dw:6, d:"One page",
    h:"The look you were aiming at.", f:["[ paste mood board ]","Caption (~100 words):"]},
   {sec:"B3", t:"Style tile", dw:6, d:"One page",
    h:"Type, colour and spacing with sample components.", f:["[ paste style tile ]","Caption (~100 words):"]},
   {sec:"B4", t:"Flow diagram", dw:7, d:"Photo in the deck",
    h:"Your screens and the arrows between them.", f:["[ paste flow diagram ]","Caption (~100 words):"]},
   {sec:"B5", t:"Wireframe set", dw:8, d:"One per screen in A2",
    h:"All 6–8 screens wireframed. Paper is fine.", f:["[ paste wireframes ]","Caption (~100 words):"]},
   {sec:"B6", t:"6–8 finished screens", dw:9, d:"6 minimum, 8 maximum",
    h:"Your prototype screens.", f:["[ paste screens ]","Caption (~100 words):"]},
   {sec:"B7", t:"2 screens × 3 sizes", dw:9, d:"6 images total",
    h:"Two key screens at all three breakpoints from A3.", f:["[ paste 6 images ]","Caption (~100 words):"]},
   {sec:"B8", t:"Click-through", dw:10, d:"6 links, each one lands",
    h:"Your screens are already slides. Link them so a marker can walk the flow — that is your prototype. Built in the week 10 workshop.",
    f:["From slide  →  to slide  —  what the reader clicked",
       "1.","2.","3.","4.","5.","6.","",
       "Links are checked for existence and destination, not elegance."]}
  ]},
 {id:"C", name:"Rationale", tag:"500–700 words total",
  desc:"The written part. Nine short answers, each drafted in the week that made the decision it defends — C1 in week 2, C2 in week 3, C3 in week 4, C4 and C7 in week 5, C8 in week 6, C6 in week 7, C5 in week 9, C9 in week 11. None of it is written at the end. Every one quotes a number from Part A.",
  items:[
   {sec:"C1", t:"Theme & audience", dw:10, d:"~70 words, quoting A1", wd:"70 w",
    h:"Who it is for, what they need, why this topic.",
    f:["(~70 words — quote something from A1)"]},
   {sec:"C2", t:"Layout & hierarchy", dw:10, d:"~90 words, quoting A3", wd:"90 w",
    h:"What you wanted read first, and the grid that made it happen.",
    f:["(~90 words — quote a number from A3)"]},
   {sec:"C3", t:"Typography", dw:10, d:"~90 words, quoting A4", wd:"90 w",
    h:"Why this pairing, this scale, this measure.",
    f:["(~90 words — quote the ratio from A4)"]},
   {sec:"C4", t:"Colour", dw:10, d:"~90 words, quoting A5", wd:"90 w",
    h:"Why these colours, and what the contrast figures changed.",
    f:["(~90 words — quote a ratio from A5)"]},
   {sec:"C5", t:"User needs & accessibility", dw:9, d:"~100 words, quoting A6", wd:"100 w",
    h:"How your choices serve user needs and promote accessibility. REQUIRED BY THE BRIEF.",
    f:["(~100 words — quote a value from A6)","","The brief asks for this one by name."]},
   {sec:"C6", t:"Ethics or sustainability", dw:10, d:"~90 words, one dimension named", wd:"90 w",
    h:"One environmental, ethical or social dimension of your design. REQUIRED BY THE BRIEF.",
    f:["(~90 words)","","Pick ONE and be concrete. Data you chose not to collect. A dark pattern you",
       "refused. Image weight and what it costs to load. Something you made work",
       "without an account."]},
   {sec:"C7", t:"A cross-cultural consideration", dw:5, d:"~80 words, one consideration named", wd:"80 w",
    h:"One cross-cultural communication point relevant to your design. REQUIRED BY THE BRIEF.",
    f:["(~80 words)","","Pick ONE: colour symbolism · reading direction · icon universality ·",
       "cultural specificity of the imagery you used."]},
   {sec:"C8", t:"Your AI use", dw:6, d:"~80 words, or a reason for not using it", wd:"80 w",
    h:"Which tools, for what, and how you evaluated or changed the output. Or why you did not use any. REQUIRED BY THE BRIEF.",
    f:["(~80 words)","","Not the same as the A7 log. A7 is the record; this is what you make of it —",
       "was the output any good, whose work is it, what did you change and why."]},
   {sec:"C9", t:"References", dw:10, d:"Everything you cited, listed",
    h:"Cite Them Right Harvard. The list does not count toward your 500–700 words — in-text citations do.",
    f:["Cite Them Right Harvard · libguides.mmu.ac.uk/refguide","",
       "Author, A. (Year) Title. Place: Publisher.","",
       "1.","2.","3."]}
  ]}
];

/* ---- derived, never typed ---------------------------------------------- */
const SD = (() => {
  const start = new Date(TERM.WEEK1 + 'T00:00');
  const dead  = new Date(TERM.DEADLINE);
  const DAY   = 86400000;
  const midnight = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const all = PARTS.flatMap((p, pi) => p.items.map((it, i) => ({...it, key:`sd-${p.id}-${i}`, part:p.id})));

  /** Teaching week number, or 0 before term, or WEEKS+1 after it. */
  function week(now = new Date()){
    /* Rounded, not floored, for the same DST reason: a whole number of days
       apart can measure 23 or 25 hours across a clock change. */
    const days = Math.round((midnight(now) - midnight(start)) / DAY);
    if (days < 0) return 0;
    return Math.min(TERM.WEEKS + 1, Math.floor(days / 7) + 1);
  }
  /* setDate, not milliseconds. The clocks go back on 25 October 2026, so
     start + n×7×86400000 lands an hour early and every week after it printed a
     day out. Calendar arithmetic has no such hour. */
  function dateOf(w){ const d = new Date(start); d.setDate(d.getDate() + (w - 1) * 7); return d; }
  const mondayOf = dateOf;   /* old name, still used by a page or two */
  function daysToDeadline(now = new Date()){
    return Math.ceil((dead - now) / DAY);
  }
  /** Items a student should have finished by the END of week w. */
  function expectedBy(w){ return all.filter(i => i.dw <= w).length; }
  /** Items produced in week w — the "this week, do this" list. */
  function dueIn(w){ return all.filter(i => i.dw === w); }
  /** The last week a part is worked on — its soft deadline. Derived, so moving
   *  a section between weeks moves the target with it. */
  function partDeadlines(){
    return PARTS.map(p => {
      const w = Math.max(...p.items.map(i => i.dw));
      return { id:p.id, name:p.name, week:w, date:dateOf(w), n:p.items.length };
    });
  }

  function read(){ try { return JSON.parse(localStorage.getItem('sd-check') || '{}'); } catch(e){ return {}; } }
  function write(s){ try { localStorage.setItem('sd-check', JSON.stringify(s)); } catch(e){} }
  function doneCount(){ const s = read(); return all.filter(i => s[i.key]).length; }
  function isDone(k){ return !!read()[k]; }

  /** The document, as plain text, ready to paste into PowerPoint or Google Slides.
   *  Generated from PARTS so it can never drift from the tick-list. */
  function skeleton(){
    const L = [];
    L.push('SCREEN DESIGN — PORTFOLIO');
    L.push('Student ID:');
    L.push('(do not put your name anywhere in this document)');
    L.push('');
    PARTS.forEach(p => {
      L.push('='.repeat(58));
      L.push(`PART ${p.id} — ${p.name.toUpperCase()}`);
      if (p.id === 'C') L.push('500–700 words in total. Every section quotes a number from Part A.');
      L.push('='.repeat(58));
      L.push('');
      p.items.forEach(it => {
        L.push(`${it.sec}.  ${it.t.toUpperCase()}`);
        it.f.forEach(line => L.push(line ? '     ' + line : ''));
        L.push('');
      });
    });
    return L.join('\n');
  }

  const fmt = d => d.toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'});
  const fmtFull = d => d.toLocaleDateString('en-GB',
    {weekday:'long', day:'numeric', month:'long', year:'numeric'}) + ', ' +
    d.toLocaleTimeString('en-GB', {hour:'2-digit', minute:'2-digit'});
  const fmtShort = d => d.toLocaleDateString('en-GB', {day:'numeric', month:'short'});

  return { start, dead, all, total: all.length, week, dateOf, mondayOf, daysToDeadline,
           SESSIONS, DAY: TERM.DAY, PARTS, skeleton,
           expectedBy, dueIn, partDeadlines, read, write, doneCount, isDone, fmt, fmtFull, fmtShort, WEEKS: TERM.WEEKS };
})();
