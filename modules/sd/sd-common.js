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

/* The official assessment brief. It is the university's document and is linked
   exactly as issued — never edited here, even where the site words things
   differently. One constant so the deck and the handout cannot disagree about
   which file it is. */
const OFFICIAL_BRIEF = { file: 'Screen_Design_Assessment_Brief_CAF_2026-27.docx',
                         label: 'Official assessment brief', kind: 'Word', size: '20 KB' };

/* The Google Form students use to send their marks for an example. Empty until
   the form exists; the materials page says "posted in class" until then. Paste
   the form's share link here and nothing else needs to change. */
const MARKING_FORM = { council: '' };


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
 {id:"A", name:"Design spec sheet", tag:"fill-in fields",
  desc:"Fill-in fields, not writing. Every one comes out of a workshop.",
  items:[
   {sec:"A1", t:"Theme & audience", dw:2, d:"Both fields filled",
    h:"Who is it for, and what do they need.",
    f:["Theme:","Audience:"]},
   {sec:"A2", t:"The journey, before and after", dw:7, d:"A goal, and both lists counted",
    h:"One goal a person has. How people reach it now — even if that is a WhatsApp group — and the screens of your version. Count both.",
    f:["Goal:","","BEFORE — how people do it now","1.  step  —  tool or screen","2.","3.","4.","5.","6.","Steps before:","","AFTER — your screens","1.  screen  —  job","2.","3.","4.","Screens after:"]},
   {sec:"A3", t:"Layout", dw:3, d:"Every field has a number",
    h:"Columns, gutter, margin, max width and a spacing scale \u2014 plus a breakpoint for each other screen size you design, if you design any. Ready-made ones are in the <a href=\"gallery.html#grids\">Gallery</a>.",
    f:["Columns:","Gutter:","Margin:","Max width:","Spacing scale:","Breakpoints (only for the other sizes you design):"]},
   {sec:"A4", t:"Typography", dw:4, d:"Every field has a number",
    h:"Families and roles, sizes, line heights, scale ratio, measure. Ready-made ones are in the <a href=\"gallery.html#type\">Gallery</a>.",
    f:["Heading family:","Body family:","Base size:","Scale ratio:","Sizes and their roles:","Line height:","Measure (characters per line):"]},
   {sec:"A5", t:"Colour + contrast table", dw:4, d:"No pair below 4.5:1 unlisted",
    h:"Hex codes with roles, and a contrast ratio for every text/background pair: at least 4.5:1 for ordinary text, 3:1 for large text and icons. <a href=\"gallery.html#contrast\">What a ratio means</a>.",
    f:["Background:  #","Surface:     #","Body text:   #","Quiet text:  #","Accent:      #","",
       "CONTRAST — every text on every background it sits on","  body on background   =      :1","  quiet on background  =      :1","  body on surface      =      :1","  accent on background =      :1"]},
   {sec:"A6", t:"Accessibility", dw:9, d:"Three fields filled",
    h:"Minimum touch target, focus state, non-colour cues.",
    f:["Minimum touch target:","Focus state:","Non-colour cues:"]},
   {sec:"A7", t:"AI use log", dw:6, d:"Every AI use has a line",
    h:"Log every AI use as you go, one line each: the tool, what it made, what you changed, and why. You judge it later, in C8. <a href=\"toolkit.html#ai\">Using AI in this module</a>.",
    f:["Tool  |  What it made  |  What I changed  |  Why","1.","2.","3."]}
  ]},
 {id:"B", name:"The work", tag:"images, with a caption each",
  desc:"Everything visual. Paste images straight into the deck as you make them. Screens get one slide each.",
  items:[
   {sec:"B1", t:"Concept sketches", dw:3, d:"Photo in the deck",
    h:"Rough sketches of your main screen, photographed — quick, on paper, several versions. Your week 2 thumbnails, if you made them.",
    f:["[ paste photos of your layouts ]","Caption (it must fit on the slide):"]},
   {sec:"B2", t:"Mood board", dw:6, d:"One page",
    h:"The look you were aiming at.", f:["[ paste mood board ]","Caption (it must fit on the slide):"]},
   {sec:"B3", t:"Style tile", dw:6, d:"One page",
    h:"Type, colour and spacing with sample components.", f:["[ paste style tile ]","Caption (it must fit on the slide):"]},
   {sec:"B4", t:"Flow diagram", dw:7, d:"Before and after, mapped",
    h:"The journey as boxes and arrows: how people do it now (week 5), and your screens beside it (week 7). The Flow maker draws both and counts them; a photo of paper is just as good.", f:["[ paste flow diagram ]","Caption (it must fit on the slide):"]},
   {sec:"B5", t:"Wireframe set", dw:8, d:"One per screen in A2",
    h:"Every screen of your journey wireframed: boxes and labels on your grid. Paper is fine.", f:["[ paste wireframes ]","Caption (it must fit on the slide):"]},
   {sec:"B6", t:"The finished screens", dw:9, d:"Every screen of the journey",
    h:"Your journey, one screen per slide, built from A3\u2013A5. Which <a href=\"style-kit.html#fidelity\">level of finish</a> they need.", f:["[ paste screens ]","Caption (it must fit on the slide):"]},
   {sec:"B7", t:"Other screen sizes (optional)", dw:9, d:"Only if your project needs them", opt:true,
    h:"Optional. If your journey is used on more than one size of screen, show your key screens at those sizes \u2014 adapted, not shrunk. Improving the flow matters more than making more screens.", f:["[ paste screens at other sizes, if you made any ]","Caption (it must fit on the slide):"]},
   {sec:"B8", t:"Click-through", dw:10, d:"The journey, start to finish",
    h:"Your screens linked so a marker can walk the journey from start to finish, with a way back and a way out: that is your prototype. Put a \u201cStart the prototype \u2192\u201d link on this slide. How to link them: <a href=\"weeks.html?w=10\">week 10</a>. Built in Figma instead? Link to it from this slide, shared so anyone with the link can view it, and still include the screens as slides.",
    f:["From slide  →  to slide  —  what the reader clicked",
       "1.","2.","3.","4.","5.","6.","",
       "Every step links to the next, with a way back and a way out. Links are checked for existence and destination, not elegance."]}
  ]},
 {id:"C", name:"Rationale", tag:"short written answers",
  desc:"The written part, drafted in the week that made each decision (the week is on each section). Every one quotes a number from Part A.",
  items:[
   {sec:"C1", t:"Theme & audience", dw:10, d:"Quoting A1",
    h:"Who it is for, what they need, why this topic.",
    f:["(One slide at most — quote something from A1)"]},
   {sec:"C2", t:"Layout & hierarchy", dw:10, d:"Quoting A3",
    h:"What you wanted read first, and the grid that made it happen.",
    f:["(One slide at most — quote a number from A3)"]},
   {sec:"C3", t:"Typography", dw:10, d:"Quoting A4",
    h:"Why this pairing, this scale, this measure.",
    f:["(One slide at most — quote the ratio from A4)"]},
   {sec:"C4", t:"Colour", dw:10, d:"Quoting A5",
    h:"Why these colours, and what the contrast figures changed.",
    f:["(One slide at most — quote a ratio from A5)"]},
   {sec:"C5", t:"User needs & accessibility", dw:9, d:"Quoting A6",
    h:"How your choices serve user needs and accessibility, quoting A6 and your before-and-after counts. Required by the brief. Get the evidence by measuring it yourself: never test your design with other people, because that needs ethics approval this assessment does not have.",
    f:["(One slide at most — quote a value from A6)","","The brief asks for this one by name."]},
   {sec:"C6", t:"Ethics or sustainability", dw:10, d:"One dimension named",
    h:"One environmental, ethical or social dimension of your design. Required by the brief.",
    f:["(One slide at most)","","Pick ONE and be concrete. Data you chose not to collect. A dark pattern you",
       "refused. Image weight and what it costs to load. Something you made work",
       "without an account."]},
   {sec:"C7", t:"A cross-cultural consideration", dw:5, d:"One consideration named",
    h:"One cross-cultural communication point relevant to your design. Required by the brief.",
    f:["(One slide at most)","","Pick ONE: colour symbolism · reading direction · icon universality ·",
       "cultural specificity of the imagery you used."]},
   {sec:"C8", t:"Your AI use", dw:6, d:"Your use judged, or a reason for not using any",
    h:"Which tools, for what, and how you evaluated or changed the output. Or why you did not use any. Required by the brief.",
    f:["(One slide at most)","","Not the same as the A7 log. A7 is the record; this is what you make of it —",
       "was the output any good, whose work is it, what did you change and why."]},
   {sec:"C9", t:"References", dw:11, d:"Everything you cited, listed",
    h:"<a href=\"http://libguides.mmu.ac.uk/refguide\">Cite Them Right Harvard</a>: cite in the text, and list everything here. The list does not count toward the 500\u2013700 words; in-text citations do.",
    f:["Cite Them Right Harvard · libguides.mmu.ac.uk/refguide","",
       "Author, A. (Year) Title. Place: Publisher.","",
       "1.","2.","3."]}
  ]},
 /* Appendices. Added in week 1 of the 2026-27 run (October 2026), after
    students asked how to show an improvement. The brief allows it: one PDF,
    assessed holistically, and only the rationale has a strict word limit. They
    go at the end of the deck so nothing students built in week 1 renumbers.
    They belong to no week (October 2026): a student can capture the before as
    soon as the goal is set, and finishes all three by the deadline, so dw is
    the last week and no workshop lists them in out.sec. Week 2 invites D1. */
 {id:"D", name:"Appendices", tag:"before and after \u2014 no word count",
  desc:"The evidence that your version is better: the process as it is now, what happened to each step, and two screens side by side. Then your AI statement. Anything else that helps your case is welcome here too \u2014 competitors, news stories, screenshots from review sites \u2014 if it has no better place in the deck.",
  items:[
   {sec:"D1", t:"The process before", dw:11, d:"Every step, captured and numbered",
    h:"How people reach the goal now \u2014 screenshots, a photo of the paper form, the WhatsApp chat. One image per step, numbered to match A2. It is evidence, not design: nobody marks how it looks.",
    f:["[ one image per step, numbered to match A2 ]","1.","2.","3.","4.","","Steps before (from A2):"]},
   {sec:"D2", t:"Before \u2192 after, mapped", dw:11, d:"What happened to every step",
    h:"Each step before, and what happened to it: kept, merged, moved or removed \u2014 with a reason. A step the law or a policy requires can move or merge, never disappear.",
    f:["BEFORE STEP  \u2192  AFTER  \u2014  what happened, and why","1.","2.","3.","4.","5.","6.","","Steps before:        Screens after:"]},
   {sec:"D3", t:"Side by side", dw:11, d:"Two key screens, before and after",
    h:"The two places your change matters most: before on the left, after on the right, and one line under each pair saying what changed.",
    f:["[ before ]   [ after ]","What changed:","","[ before ]   [ after ]","What changed:"]},
   {sec:"D4", t:"AI statement", dw:11, d:"Used or not, said plainly",
    h:"Whether you used AI. If you did: which tools, for what, where in the deck, and why. If you did not, one line: No AI was used. <a href=\"toolkit.html#ai\">Using AI in this module</a>.",
    f:["AI used:  yes / no","","If yes, for each use:","  Tool:","  What for:","  Where in the deck (section):","  Why:","","If no:  No AI was used in this portfolio."]}
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
  /* A teaching week runs Monday to Sunday. The term starts on session day (a
     Tuesday), and counting weeks from there left every Monday showing last
     week — the homepage said week 1 on the day before week 2's class. Weeks
     are counted from the Monday of the first week; session dates are still
     the Tuesday (dateOf). */
  const weekStart = new Date(start); weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  function week(now = new Date()){
    /* Rounded, not floored, for the same DST reason: a whole number of days
       apart can measure 23 or 25 hours across a clock change. */
    const days = Math.round((midnight(now) - midnight(weekStart)) / DAY);
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
  /** One slide's worth of text: the students build the deck a slide at a time,
   *  so each section is copied on its own. Same PARTS source as everything else. */
  function slideText(sec){
    if (sec === 'cover') return ['SCREEN DESIGN — PORTFOLIO', 'Student ID:',
      '(do not put your name anywhere in this deck)'].join('\n');
    const p = PARTS.find(g => g.items.some(i => i.sec === sec));
    const it = p.items.find(i => i.sec === sec);
    const L = [`${it.sec} · ${it.t}`, `Part ${p.id} — ${p.name}`];
    L.push('');
    it.f.forEach(line => L.push(line));
    return L.join('\n').replace(/\n+$/, '');
  }

  function skeleton(){
    const L = [];
    L.push('SCREEN DESIGN — PORTFOLIO');
    L.push('Student ID:');
    L.push('(do not put your name anywhere in this document)');
    L.push('');
    L.push('ONE RULE FOR ALL TEXT: no caption, answer or paragraph runs past one slide.');
    L.push('');
    PARTS.forEach(p => {
      L.push('='.repeat(58));
      L.push(`PART ${p.id} — ${p.name.toUpperCase()}`);
      if (p.id === 'C') L.push('500–700 words in all — the brief\'s one strict limit. Every section quotes a number from Part A.');
      if (p.id === 'D') L.push('Appendices do not count toward the word budget.');
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
           SESSIONS, DAY: TERM.DAY, PARTS, skeleton, slideText,
           expectedBy, dueIn, partDeadlines, read, write, doneCount, isDone, fmt, fmtFull, fmtShort, WEEKS: TERM.WEEKS };
})();
