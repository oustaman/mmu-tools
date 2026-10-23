/* Eleven weeks. Two sheets each, and everybody sees both.
 *
 *   SHOWN     what goes on the screen in the lecture hour, with links.
 *   WORKSHOP  what happens in the two hours, written for the room — tutor and
 *             student read the same sheet.
 *
 *  There is no staff-only version. A student who wants to know what the tutor
 *  was told can read it, which removes a whole category of question.
 *
 *  Links verified 27 Aug 2026. If one fails live, say what it held and move on.
 */
/* Keyed by the university's own outcome references, matching rubric-data.js.
   See the note there: LO1-3 numbering was ambiguous across the two files. */
const LOS = {
 "A1": "Describe and explain key principles of visual design and their application in screen-based media.",
 "B1": "Apply fundamental design principles to produce visually engaging layouts.",
 "B2": "Create user-centered design solutions, incorporating effective typography and colour theory."
};

const RULES = [
 {k:"Where your work lives", v:"Your <b>university OneDrive</b>, in one folder called <code>Screen Design</code>. Everything you make goes in there, every week: the deck, photos of paper work, anything you want a tutor to see. Not your desktop, not a USB stick, not the studio machine — those get wiped. You set this up in week 1."},
 {k:"Share the folder", v:"Share <code>Screen Design</code> with your tutors and the teaching staff in week 1, and leave it shared. <b>Nobody looks in it unless you ask.</b> When you want feedback or help, tell us and we open your folder — so keep your latest work in there."},
 {k:"Your name goes on nothing", v:"The deck is marked without your name on it. Call it <code>screen-design-portfolio</code> — no name in the filename, no name on the cover, no name in a header or footer. Your student ID only, if you want anything at all. <b>The OneDrive folder identifies you; the document does not.</b>"},
 {k:"One deck, all term", v:"You hand nothing in weekly. There is <b>one slide deck</b> — PowerPoint or Google Slides, whichever you already have — and you fill in a section of it each week. By week 10 it is finished, and in January you export it as a PDF."},
 {k:"One screen per slide", v:"When you build your screens — from week 8 — <b>put each one on its own slide.</b> In week 10 you link them together and that is your prototype \u2014 the assessment asks for a clickable multi-screen prototype, and if your screens are slides you get one by linking them. If they are pasted four to a page, you do not."},
 {k:"Bring every week", v:"Laptop or tablet, your OneDrive folder open, and your spec sheet. The spec sheet is the one thing you use in every single workshop."},
 {k:"Photograph paper work", v:"Weeks 2, 7 and 8 are on paper. Photograph everything before you leave the room and paste it straight into the deck that day. Paper gets lost; it always has."},
 {k:"Referencing", v:"<b>Cite Them Right Harvard.</b> If you quote or borrow anything — a principle, a statistic, an image — cite it in the text and list it at the end. <b>The reference list does not count toward your 500–700 words. In-text citations do.</b> <a href=\"https://libguides.mmu.ac.uk/refguide\" target=\"_blank\">libguides.mmu.ac.uk/refguide</a>"},
 {k:"How you submit", v:"In January, export your deck as a PDF and upload <b>that one file</b> to Moodle. Your slide links carry over into the PDF \u2014 but check that they did: open the PDF and click every one, because that file is what gets marked. Not a link, not a folder, not a zip. Sharing the OneDrive folder is not submitting."},
 {k:"Back up before you export", v:"Before you touch the final PDF in week 11, duplicate the folder. Exports go wrong and you do not want to rebuild."},
 {k:"AI is allowed", v:"Any tool. Treat it like any other source: note it in Part A §7 as you go (tool, what it made, what you changed, why). One line is enough."},
 {k:"If you miss a week", v:"Read that week's two sheets — they are the same ones the tutor used. Then bring the gap to the support hours."}
];

const WEEKS = [
{
 n:1, title:"Why screens look the way they do",
 makes:["3 teardowns","3 theme ideas"],
 idea:"Every layout decision you will make was made before, for reasons, and the reasons still hold.",
 hand:{keep:["Your whole assessment is one deck, a slide per section \u2014 filled in all term.", "Marks follow evidence: every claim needs something a marker can see.", "Present is not the same as evidenced. Thin work looks finished."], next:"Choose three possible themes."},
 shown:[
  {core:true, s:"The assessment brief", d:"Walk the eleven slides end to end. This is the first thing they see, and the only deck we give them — everything after this is workshops.", u:"brief.html", take:"The whole assessment is one document, and every section of it is listed on the hand-in page. Everything you are told this term is already in that brief."},
  {s:"The hand-in, in one page", d:"Every section of the hand-in, each with its own copy button, used to build the deck in the workshop today.", u:"assessment.html", take:"You copy this structure in the workshop today. From then on you are filling it in, not starting it."},
  {s:"A manuscript page", d:"Margins and columns, centuries before screens. The margin is where the hand goes.", u:"https://written.institute/atlas/", take:"Margins and columns are not decoration. Every layout choice you make in week 3 was made before, for a reason."},
  {s:"Sixty-seven published grids", d:"Twenty of them are pre-screen. Filter to historical and put two plates side by side.", u:"https://interfaces.institute/collections/grids/", take:"A grid is something a publisher writes down. Yours goes in A3 in week 3 — seven numbers, no blanks."},
  {core:true, slides:"Teardowns", s:"Three live teardowns", u:"teardowns.html", d:"A news front page, a checkout, and one that is genuinely unclear. What do you read first, and which of five devices did it. <b>The deck is built</b> \u2014 every screen is a real capture, dated, walked step by step.", take:"Learn to say what you read first and which of five devices did it: scale, weight, colour, space, position. That vocabulary is what C2 is written in."},
  {s:"Six documented failures", d:"The Basement. Screens that went wrong in public, with the reasoning kept.", u:"https://interfaces.institute/basement/", take:"A screen fails when nobody can tell what to do next. Yours is marked on whether someone can."}
 ],
 three:[
  {t:"Your shared folder and deck", d:"On OneDrive, shared with us, a slide for every section."},
  {t:"A mark you had to defend", d:"You marked the fake submission, and heard how we mark it."},
  {t:"Three possible themes", d:"Bring them to week 2 \u2014 one gets locked for good.", open:true},
 ],
 workshop:{
  aim:"Set up your deck, then mark somebody else's.",
  goals:["Make your shared Screen Design folder, and the one deck inside it you will fill in for eleven weeks.",
         "Read the brief closely enough to argue about it.",
         "Judge a finished portfolio against the four marking criteria, and defend the number you give it."],
  los: ["A1","B1"],
  out:{"sec": ["\u2014"], "what": "Set the deck up. Nothing is filled in yet."},
  bring:"Laptop \u00b7 the brief open \u00b7 nothing else",
  run:[
   {s:"Make your Screen Design folder and share it \u2014 everybody, before anything else", d:"Open your university OneDrive. New folder, called exactly <code>Screen Design</code>. Share it with your tutors and the teaching staff, and leave it shared. This is where your work lives all term: each week, whatever you make goes in here as your assessment fills out \u2014 the deck, photos of paper work, anything you want a tutor to see. <b>Staff do not look in it unless you ask.</b> When you want feedback or help, say so, and that folder is where we look. Check as you circulate: the folder exists, it is named right, and it is shared."},
   {s:"Set up the one deck", d:"Inside <code>Screen Design</code>, a new <b>PowerPoint</b> called <code>screen-design-portfolio</code> \u2014 or a Google Slides deck, if that is what you use. Then open the hand-in page and give each section its own slide \u2014 every section has its own <b>Copy</b> button, so it is one click and one paste per slide. That is your whole assessment, empty. <b>Put your name nowhere in it.</b> Nobody leaves without a shared folder and a deck with a slide for every section \u2014 check as you circulate."},
   {s:"Read the brief \u2014 in fours", d:"Groups of four, counted off round the room so nobody sits with their friends. Each group opens <a href=\"rubric.html\">the blank marking rubric</a> and writes, in their own words, one sentence per criterion: what would a marker have to SEE to give this a good mark? Do not help \u2014 they will get it roughly right, and that is the point."},
   {s:"Mark the example portfolio", d:"Open <a href=\"example.html\">the example portfolio</a> \u2014 a complete, finished-looking submission we wrote. Same groups. On <a href=\"rubric.html\">the blank rubric</a>: a band and a mark out of 100 for each of the four criteria, and <b>one sentence of evidence for every number</b>. No mark without a reason. Circulate and ask one question only: where in the document is that?"},
   {s:"Collect the marks on the board", d:"Every group calls out four numbers. Write them all up. The spread is the lesson \u2014 groups usually land between the high thirties and the high fifties, and the argument about why is worth more than the average. Then reveal the marks and read two of the margin comments aloud. Not all of them."},
   {s:"The one thing to take away", d:"Ask the room what separates that portfolio from a good one. Steer to the answer: <b>everything the brief asked for is present, and almost none of it is evidenced.</b> That is the whole module in one sentence."}
  ],
  leave:"A shared Screen Design folder with your deck in it, a slide for every section, and a mark you had to defend.",
  done:"Your Screen Design folder is shared with the teaching staff, and the deck inside it has a slide for every section.",
  between:"Choose three possible themes. Nothing else \u2014 week 2 settles on one of them, and the later you change it after that, the more you redo.",
  mistake:"Marking on how it looks. Two groups in three give the visual criterion the highest number and cannot say why.",
  stuck:[["I can't find OneDrive","office.com, sign in with your uni account, OneDrive in the launcher. Do not use a personal Microsoft account."],
         ["Will you check my folder every week?","No. We look when you ask \u2014 for feedback or for help. Keep your latest work in there so it is ready when you do."],
         ["Why no name on the deck?","It is marked without your name on it. The folder says whose work it is."],
         ["Is this a real student?","No. We wrote it. Nothing in it comes from anybody's submission."],
         ["What mark would you give it?","Tell them after their groups have committed to a number, not before."]]
 }},
{
 n:2, title:"Composition and visual hierarchy",
 makes:["Example 2 marked","Theme locked","8 thumbnails"],
 idea:"You get one focal point. Everything else is arranged around what you chose.",
 hand:{keep:["A complete portfolio shows its evidence; a thin one only asserts it.", "Settle your theme by week 3 if you can. You can still change it later, but every week after that is more work to redo.", "Rough is fine. A first sketch on the right slide beats a perfect one nowhere."], next:"Lock your theme if you have not, and pick the thumbnail you would build."},
 shown:[
  {core:true, s:"Scale, weight, space — live", u:"https://interfaces.institute/stairwell/hierarchy/", d:"Resize one element on a real page and watch the reading order change. Then add space only, change nothing else. <b>Five switches on one screen</b> — turn each device off in turn and the primary action stops being primary without moving, changing its words, or leaving the page.", take:"Changing one thing — size, weight, spacing — changes what gets read first. That is the whole of hierarchy."},
  {s:"Two focal points", d:"A real screen with two. Everyone takes a moment to find the first thing, and that moment is the cost.", u:"https://interfaces.institute/collections/bank-interfaces/", take:"You get one focal point per screen. Two costs the reader a moment, and that moment is what you write about in C2."},
  {core:true, s:"One app, four layouts", u:"https://interfaces.institute/patterns/four-layouts/", d:"One travel-insurance app laid out four ways. Pick a goal — call the emergency line, then buy cover for a ski trip — and do it in all four with the clock running. Tap one app and the other three frost over. Read the taps out loud.", take:"A layout decides whose job comes first, and every other job waits. The app that reaches the emergency line in one tap is the slowest to sell you anything. Say which job your screen puts first, and what it makes wait."},
  {s:"Recognition over recall", d:"Run both panes. Same task, two builds — one asks you to remember a command, one shows you a button.", u:"https://interfaces.institute/stairwell/recognition/", take:"Recognising beats remembering. Show the option rather than expecting someone to recall it."},
  {s:"Affordance", d:"Six pieces of text, two of them are buttons and nothing says which. Run the bad pane and count the wrong clicks.", u:"https://interfaces.institute/stairwell/affordance/", take:"If nothing says which parts are clickable, people click the wrong things. Criterion 2 is where that is marked."}
 ],
 three:[
  {t:"Example 2, marked", d:"A band, a mark and a line of evidence for each criterion \u2014 sent through the form."},
  {t:"Your theme, locked", d:"Part A \u00a71 filled in: theme, audience and your goal. Need longer? Week 3 \u2014 the later you change it, the more you redo."},
  {t:"A first piece of work in your deck", d:"Eight rough thumbnails of one screen, photographed onto B1\u2019s slide. Pick the one you would build before week 3.", open:true},
 ],
 workshop:{
  aim:"Mark the complete example, lock your theme, and put a first piece of work in your deck.",
  goals:["Judge a complete portfolio against the four criteria, and say what stops it being a First.", "Commit to one theme, one audience and one goal.", "Start the work: rough layouts of one screen, on the right slide."],
  los: ["A1","B1"],
  out:{"sec": ["A1", "B1", "C1"], "what": "Theme, audience and goal locked, eight thumbnails in B1 \u2014 and C1 drafted, once the theme is"},
  maybe:["D1"],   /* worth starting now if the goal is clear; no week owns the appendices */
  bring:"Laptop \u00b7 A4 paper and a thick marker \u00b7 your three possible themes",
  run:[
   {s:"Mark example 2 \u2014 alone first", d:"Open <a href=\"example-council.html\">the complete example</a> and <a href=\"rubric.html\">the blank rubric</a>. Read it the way a marker would: a band and a mark for each criterion, one sentence of evidence for each, then one overall mark. Marks come in steps \u2014 a 65 or a 68, never a 66. Alone and in silence: this is your judgement, not your table\u2019s."},
   {s:"Send your marks", d:"Through the form on <a href=\"assessment-materials.html\">Marking and examples</a>. The class average goes up beside our marks after the workshop, and nobody sees whose mark is whose."},
   {s:"Compare in fours", d:"Groups of four, counted off round the room. Read your four marks aloud. Wherever you are more than a band apart, find the slide that settles it. The only question a tutor asks: where in the deck is that?"},
   {s:"What makes it complete \u2014 and what stops it being a First", d:"Whole room. First: what does this have that the week 1 portfolio did not? Then: why is it not a First? Let the room find it before anyone says it."},
   {s:"Lock your theme", d:"Fill in <code>A1</code>: your theme and your audience, and your goal \u2014 the one thing a person is trying to get done. <b>Need longer?</b> You have until week 3, and not a day after: everything from week 3 is built on it. If it is locked, write <code>C1</code> now, seventy words, while the decision is fresh. <b>If you can, start <code>D1</code> too:</b> how people reach your goal today \u2014 screenshots, a photo of the form, the group chat. The appendices fit any week, and the before is easiest to capture while it is fresh."},
   {s:"Start your deck \u2014 eight thumbnails", d:"Pick the one screen your goal needs most and draw it eight ways, quickly, markers only. Photograph all eight and put them on <code>B1</code>\u2019s slide today, as they are \u2014 week 3 builds on them. Rough is the point: a first piece of work on the right slide beats a perfect one nowhere."}
  ],
  leave:"Example 2 marked and sent. Your theme locked (or by week 3), and eight thumbnails on B1\u2019s slide.",
  done:"Your marks are in, A1 is filled in, and B1\u2019s slide has eight photographed thumbnails.",
  between:"If your theme is not locked, lock it \u2014 week 3 is the last day. Then pick the thumbnail you would build.",
  mistake:"Marking on looks. This one is well designed: the marks turn on what it evidences, and on where it stops.",
  stuck:[["It looks finished \u2014 isn\u2019t it a First?","Look at C5 and C6. Strong design; its claims asserted, not measured; its hardest question answered in a sentence."],
         ["Can I have more time for my theme?","Yes, until week 3. Not after \u2014 everything from week 3 is built on it."],
         ["My mark is far from the others","Good \u2014 that is the exercise. Find the slide that would change your mind, or theirs."],
         ["Out of ideas at four thumbnails","Correct. Move one thing and redraw."],
         ["Can I use Figma?","No. The same time on paper gets four layouts; in Figma it gets one."]]
 }
},
{
 n:3, title:"The grid",
 makes:["Layout spec → Part A §3","C2 drafted"],
 idea:"A grid is a decision you make once so you do not remake it four hundred times.",
 hand:{keep:["A grid is seven numbers you decide once.", "If your sketch does not fit the grid, change the grid.", "Use a spacing scale, not eleven different gaps."], next:"Fill in every box of A3, using the grid deck\u2019s last slide."},
 shown:[
  {core:true, s:"One menu, four grids", u:"https://interfaces.institute/patterns/four-grids/", d:"One cha chaan teng menu on a laminated A4 sheet, set four ways: manuscript, column, modular and hierarchical. Do a goal on each sheet with the clock running, then read the counts — how many dishes fit on the front, which sheet needs its back, how much of the paper is type.", take:"A grid decides how much fits. The column grid that looks crowded holds the whole menu on one side; the modular grid that looks generous needs both. Choose the grid for your content, not for the look."},
  {core:true, s:"One website, every grid", u:"https://interfaces.institute/patterns/every-grid/", d:"One plain website laid out on twenty-seven grids that real organisations publish \u2014 Bootstrap, GOV.UK, Material, IBM\u2019s Carbon \u2014 at four screen widths. Pick a grid, switch the width, and read the table: most fill every row, and the ones that do not show you why.", take:"Twelve columns divide by two, three, four and six, so rows of cards, pictures and links fill exactly. Sixteen will not take a row of three. Choose a column count that divides the way your content does."},
  {s:"Published layout grids \u2014 one page, four stops", u:"https://interfaces.institute/collections/grids/", d:"One page, taken in this order. <b>1. Eleven different gaps</b> \u2014 count them out loud, every gap drawn with its measurement; then press <b>Snap to an 8px scale</b> and the eleven become five, with nothing else changing. <b>2. The published grids</b> \u2014 each plate drawn to its publisher\u2019s own numbers; filter by who published it, a CSS framework beside a government manual beside a 1962 standard. <b>3. How many name no breakpoint</b> \u2014 read the count off the page, live. <b>4. A spacing scale, built live</b> \u2014 4, 8, 12, 16, 24, 32, then a layout snapping to it; the filter shows which publishers have no scale at all.", take:"A grid is a handful of numbers you decide once \u2014 columns, gutter, margin, max width and a spacing scale \u2014 and every gap comes from that list. Plenty of publishers never wrote theirs down; yours goes in A3 today."}
 ],
 three:[
  {t:"Your theme, locked", d:"If it was not already: A1 filled in, and the goal at the top of A2."},
  {t:"Your seven numbers", d:"Part A §3 filled in from the grid deck’s last slide. Nothing says “about” or “roughly”."},
  {t:"C2 started", d:"Once your numbers are set: what you want read first, quoting three of them.", open:true},
 ],
 workshop:{
  aim:"Know what each layout number means. Then, if you have a theme, set your own; if you do not, find one.",
  goals:["Say what columns, gutter, margin, max width, breakpoints and a spacing scale are, and see each one change a real screen.", "Set your own seven numbers for A3 \u2014 or, without a theme yet, choose one.", "Leave with A3 filled in, or A1 locked and A3 started from a published grid."],
  los: ["B1"],
  out:{"sec": ["A1", "A3", "C2"], "what": "Your layout numbers \u2014 and your theme, if it was not locked"},
  bring:"Laptop \u00b7 your theme, if you have one",
  run:[
   {s:"Load the grid deck and play with it", d:"Everyone opens <a href=\"grid-numbers.html\">A grid in seven numbers</a> on their own laptop. Your tutor walks through it on the screen; you follow along and <b>try every live screen</b>: push each slider to the extremes and read what changes. One slide per number, using Example 2\u2019s A3. It works on its own too, if you missed this or want it again."},
   {s:"Got a theme? Measure a real site\u2019s grid", d:"Pick one website from your theme \u2014 a competitor, or the before you will screenshot for D1 \u2014 and measure its grid with your browser. <b>Never opened the inspector?</b> <a href=\"toolkit.html#measure\">Toolkit \u203a Measure a website</a> shows how in Chrome, Edge, Safari and Firefox, on Windows and Mac.<br><br><b>1 \u00b7 Max width and margin.</b> Open the inspector and hover over the main content. The label shows its size in px, like <code>div.container 1140 \u00d7 820</code>: the first number is the max width. The gap from it to the edge of the window is the margin.<br><b>2 \u00b7 Breakpoints.</b> Turn on device mode and drag the width slowly. Wherever the layout jumps \u2014 the menu folds away, three cards become two \u2014 write down the width shown at the top. Those are its breakpoints.<br><b>3 \u00b7 Columns.</b> At each of those widths, count the cards, links or pictures in a row.<br><b>4 \u00b7 Write it up.</b> The site\u2019s numbers in the same rows as A3, a screenshot at each breakpoint in an appendix, and one line: what you kept for your own A3, what you changed, and why.<br><br>Compare what you found with a published grid: <a href=\"https://design-system.service.gov.uk/styles/layout/\">GOV.UK\u2019s layout</a> (behind most council and government services) or <a href=\"https://getbootstrap.com/docs/5.3/layout/grid/\">Bootstrap\u2019s grid</a> (behind a large share of commercial sites). Then set your own numbers on the <a href=\"grid-numbers.html#s9\">grid deck\u2019s last slide</a> and copy them into A3."},
   {s:"No theme yet? Explore an idea", d:"Open <a href=\"ideas.html\">Theme ideas</a> and press the button until one is something you would use yourself. Change one thing about it \u2014 the audience, the place \u2014 so it is yours, copy it into A1 and A2, and tell your tutor. Doing your own project, like a family business? Read <a href=\"ideas.html#own\">your own idea, or a real business</a>. Then start A3 from Example 2\u2019s numbers on the deck\u2019s last slide; you can change them later."},
   {s:"Write C2, if your numbers are set", d:"One slide: what you want read first on your main screen, and the grid that makes it happen. <b>Quote three numbers from <code>A3</code>.</b> A layout paragraph with no number in it is a description, and descriptions are the bottom band."}
  ],
  leave:"A3 filled in \u2014 and A1, if your theme was not locked.",
  done:"Every box in A3 has a number. Your theme is in A1.",
  between:"If you chose your theme today, set your seven numbers on the deck\u2019s last slide before week 4.",
  mistake:"Copying Example 2\u2019s numbers without asking whether they suit your screens. Start from them; then change them.",
  stuck:[["What are the seven numbers?","Columns, gutter, margin, max width, breakpoints, a spacing scale \u2014 and how many columns your main content spans. The deck has a slide for each."],
         ["How many columns?","Four on a phone is common. On a bigger screen, a number your content divides into: 8 or 12."],
         ["Do I need tablet and desktop?","Only if you design them. Breakpoints are only for the screen sizes you actually show."],
         ["Does it have to be 8px?","No. Consistent and written down."],
         ["I still don\u2019t have a theme","Open <a href=\"ideas.html\">Theme ideas</a> and press the button until one is something you would use yourself. Change one thing about it \u2014 the audience, the place \u2014 and it is yours. Today is the last day to lock it."]]
 }
},
{
 n:4, title:"Type, colour and the grid: one visual system",
 makes:["Layout, type and colour → Part A §3–5","A first style tile","C3 and C4 drafted"],
 idea:"Three decisions, made once and written down, so every screen — yours or anyone else’s — comes out matching.",
 hand:{keep:["A grid, a type scale and a palette are one set of decisions.", "Write them down as numbers, and every screen will match.", "Every number gets a reason that names your audience.", "Finished screens can be wireframes if the style tile shows type and colour."], next:"Check every colour pair in A5 passes 4.5:1."},
 shown:[
  {core:true, s:"Gallery: grids, type and colour", u:"gallery.html", d:"Grids, typefaces and palettes from published systems, each with its numbers and its source, ready to copy into A3, A4 and A5. Read out the box at the top: which ones they choose doesn’t change their mark, but text below 4.5:1 can.", take:"Choose one of each, write them down, use them everywhere, say why. Nobody gains or loses a mark for blue over orange."},
  {core:true, s:"One example: the bakery, for type, colour and grid", u:"case-bakery.html#s16", d:"Walk the bakery’s <i>now</i> quickly — splash page, sideways menu, a thread of messages — then stop on <b>The redesign’s A3, A4 and A5</b> (slide 16). Read three rows aloud, one from each, and the reason beside each number. Then ask the room the six questions on <a href=\"assessment-materials.html#questions\">Marking and examples</a>: they will use the same six on the other three cases in the workshop.", take:"Every number in a spec has a reason, and the reason names a person: who reads it, where, on what. That is what C3 and C4 are made of."},
  {s:"Style kit — what are we fixing?", u:"style-kit.html", d:"Press <b>Show all three wrong</b>: a page laid out by eye, five typefaces, and pale colours that fail. Then pick a published grid, type pairing and palette, and watch the same three screens come right. Press <b>Boxes and sketch</b>: the decisions survive without the polish.", take:"Grid, type and colour are one set of decisions. Made once and written down, they make every screen match — even when the screen is drawn in boxes."},
  {s:"Contrast, live", d:"Put a real pair up, get the ratio, darken it until it passes. Do the arithmetic in front of them.", u:"https://interfaces.institute/collections/design-tools/#pairs", take:"Anything under 4.5:1 gets changed. That is the one colour rule nobody can argue with."},
  {s:"What a published scale actually does", u:"https://interfaces.institute/collections/type-scales/", d:"Five design systems, their type scales read out of the files they ship, and the ratio between every pair of steps computed.", take:"<b>None of the five is geometric.</b> Across 62 steps the ratio wanders in every one \u2014 Tailwind 1.111 to 1.333, Material 1.0 to 1.375. Bootstrap\u2019s top four headings have no fixed size at all. \u201cI used a 1.25 scale\u201d is a claim the systems you copied from would not survive: name your sizes, name what each is for, name the measure."},
  {s:"Two paragraphs", u:"https://written.institute/laboratory/#measure", d:"Same font, same size. One at 45 characters, one poured into the full width. Leave both up for ten seconds and say nothing. The slider underneath sets any measure from 20 to 140, and both labels <b>count the characters live</b> rather than claiming a number.", take:"Line length is the problem more often than the font is. If your text is hard to read, the column is too wide."},
  {s:"Families have jobs", d:"Walk the hall of typologies.", u:"https://written.institute/typologies/", take:"Families have jobs. One for headings, one for reading — and say why in C3."},
  {s:"What four systems ship, measured", u:"https://interfaces.institute/collections/palettes/", d:"Every colour four design systems publish, measured against the background it ships on.", take:"All eleven colours these systems publish <i>as text</i> pass 4.5:1. <b>Six of the sixteen they publish as fills fail every threshold</b> \u2014 Bootstrap\u2019s warning at 1.63, Carbon\u2019s yellow at 1.68. A fill is not a text colour, and the one system publishing a separate darker foreground per role has no failing colour anywhere. Three of Bootstrap\u2019s land between 4.50 and 4.53: no margin at all."}
 ],
 three:[
  {t:"Part A §3–5 filled in", d:"Every row a number. A5 has a ratio for every text pair, none under 4.5:1."},
  {t:"A first style tile", d:"Your three screens from the style kit, in your own words, pasted into B3."},
  {t:"C3 and C4 drafted", d:"Why this type and why these colours, quoting the numbers.", open:true},
 ],
 workshop:{
  aim:"See how three redesigns decided their type, colour and grid — then decide yours, write them into Part A §3–5, and see them on your own screens.",
  goals:["Read a redesign’s type, colour and grid decisions, and the reason given for each.", "Choose all three for your audience, from published systems or your own, and write them down as numbers.", "Show that the same decisions make every screen match, at any fidelity."],
  los: ["B1","B2"],
  out:{"sec": ["A3", "A4", "A5", "B3", "C3", "C4"], "what": "Layout, type and colour as numbers, a first style tile, and the type and colour paragraphs"},
  bring:"Laptop · your theme · your deck · paper for the six questions",
  run:[
   {s:"Study one case, in pairs", d:"Your tutor gives each pair one of three: <a href=\"case-missed-bin.html#s16\">the missed bin</a>, <a href=\"case-railcard.html#s16\">the Railcard</a> or <a href=\"case-short-course.html#s16\">the Welsh course</a>. Walk it from the start, then answer <a href=\"assessment-materials.html#questions\">the six questions</a> on paper. Most answers are on slide 16, <b>The redesign’s A3, A4 and A5</b>. Write numbers, not adjectives: “18 px, because people read it outdoors”, not “clear”."},
   {s:"Check-in: your tutor comes round", d:"Expect one question: <b>show me one row in the redesign’s A4 or A5, and tell me why it is that number.</b> The answer is in the case, in the reason beside the number. If you cannot find it yet, that is what the check-in is for."},
   {s:"Swap: one pair from each case", d:"Join two pairs who read the other two cases. Each pair takes two minutes: who the service is for, and the one row they would take for their own project. Then, between you: <b>which change makes the biggest difference, and what number shows it?</b>"},
   {s:"Choose your three", d:"Now yours. Open the <a href=\"gallery.html\">Gallery</a>, choose a grid, a typeface and a palette for <i>your</i> audience, and <b>Copy all four</b> into A3, A4, A5 and C9. Change any number you like, as the cases did — and write down why. <b>Which ones you choose doesn\u2019t change your mark</b>: deciding, writing it down and using it everywhere does. The one exception is contrast — text below 4.5:1 can lose marks, so check A5 before you move on."},
   {s:"A first style tile", d:"Open the <a href=\"style-kit.html\">Style kit</a>: it already has what you chose. Type your own service name, question and button, screenshot the three screens and paste them into <code>B3</code>. Your finished screens can be wireframes later, as long as this tile shows your type and colour; <a href=\"style-kit.html#fidelity\">level 3, applied spec</a>, is recommended."},
   {s:"Check-in: before you leave", d:"Your tutor asks to see A3, A4 and A5: <b>is every row a number, is any text pair under 4.5:1, and what did you change from the option you chose — and why?</b> Fix anything under 4.5:1 there and then."},
   {s:"Write C3 and C4", d:"One slide each. Borrow the shape of the reasons you found in the cases: a number, and the person it is for. Say why this type and these colours suit your audience, and <b>quote numbers from A4 and A5</b>. If you changed something from the Gallery, say what and why — that is the strongest paragraph you can write."}
  ],
  leave:"A3, A4 and A5 filled in, a first style tile in B3, C3 and C4 drafted.",
  done:"Every row of A3–A5 is a number, every colour pair passes 4.5:1, and B3 shows your three screens.",
  between:"If anything in A5 failed, fix it and copy it again. Nothing else.",
  mistake:"Choosing by look alone. Choose for your audience, then check the numbers.",
  stuck:[["Which case should I study?","The one your tutor gives your pair. You hear about the other two in the swap, and all four stay open on Marking and examples."],
         ["I missed weeks 3 and 4","Start here. The Gallery gives you a complete A3, A4 and A5 in one sitting, with sources."],
         ["Do I have to use the Gallery?","No. Use your own choices, any tool. It just shows what a complete answer looks like."],
         ["My screens are only boxes","That can be fine — if your style tile shows your type and colour, and C3 and C4 say the screens are wireframes by choice."],
         ["My brand colour fails","Darken it until it passes, or keep it for large text and decoration. Both go in A5."],
         ["Where do I cite the fonts and grid?","C9. The Gallery and the Style kit write the references for you."]]
 }
},
{
 n:5, title:"The journey: what are we fixing?",
 makes:["The journey before → Part A §2","The journey, mapped → B4","The before, captured → D1","C7 drafted"],
 idea:"A better screen is not the point. A shorter, kinder journey is — and you can count it.",
 hand:{keep:["Write the goal, then every step people take now.", "Count the steps, the waits and the dead ends.", "Draw it: a map shows where people get stuck.", "Every problem gets a number, not an adjective."], next:"Screenshot every step of your before, numbered to match A2."},
 shown:[
  {core:true, s:"Before and after: the painful one", u:"case-bakery.html", d:"A made-up bakery that takes cake orders by message: a splash page with music, a sideways scanned menu, a full voicemail, 23 messages and a closure announced in a story. Walk the <i>now</i> slides first, then the improved ones.", take:"The before is evidence, even when it is a message thread. Count it — channels, messages, days — and every count becomes a line in C5 and D2."},
  {core:true, s:"Before and after: the okay one", u:"case-missed-bin.html", d:"Liverpool’s missed-bin report: good type and colour, a journey that hides its one rule. Thirteen problems, each measured; thirteen decisions, each explained.", take:"A service can look fine and still fail its users. The problems are in the order of things — which is what A2 and B4 are for."},
  {s:"Before and after: the Railcard", u:"case-railcard.html", d:"Questions in the wrong order, and the requirements announced after you have started.", take:"Ask what decides everything first."},
  {s:"Before and after: a Welsh course", u:"case-short-course.html", d:"Complete facts in the provider’s words. The cross-cultural case.", take:"Use your user’s words; explain the service’s where they appear."},
  {s:"The Flow maker", u:"flow.html", d:"Type a journey one step per line; the flow draws itself, numbered, with decisions, waits and dead ends marked, and counted. Show the example: the missed-bin report before, then after.", take:"A list hides where people get stuck. A map shows it: the loop back to step 3, the dead end at the phone line."},
  {s:"The same hue, different meanings", d:"Colour associations by place. Walk a few.", u:"https://symbolic.institute/collections/colour-associations/", take:"Same hue, different meaning depending on where you are. That is your cross-cultural consideration, and it is markable."},
  {s:"Traffic colour", d:"How the meaning got fixed, and by whom.", u:"https://symbolic.institute/visual-grammar/traffic-colour/", take:"Colour means different things in different places. Pick one such difference and write it into C7 today — the brief asks for it by name."}
 ],
 three:[
  {t:"Your journey before, counted and mapped", d:"Part A §2: the goal and every step people take now, with the count — and the same steps drawn as a flow in B4."},
  {t:"The before, captured", d:"D1: one screenshot or photo per step, numbered to match A2."},
  {t:"C7 drafted", d:"One cross-cultural consideration, specific to your service.", open:true},
 ],
 workshop:{
  aim:"Find out what your design has to fix: the goal, every step people take now, counted, mapped and captured.",
  goals:["Read a before-and-after case the way a marker would.", "Write your goal and every step people take now, count them, and draw them as a flow.", "Capture the before as evidence, and name one cross-cultural consideration."],
  los: ["A1","B2"],
  out:{"sec": ["A2", "B4", "D1", "C7"], "what": "The journey before, counted and mapped, the before captured, and the cross-cultural paragraph"},
  bring:"Laptop · your theme · access to the service you are improving (the website, the app, the chat) · or large paper and a marker for the flow",
  run:[
   {s:"Walk one case, in pairs", d:"You read the cases for type and colour in week 4; now read one for the journey. Open <a href=\"assessment-materials.html#before-after\">Before and after</a> and walk the bakery’s <i>now</i> slides. For each red number, say what it costs the customer. Then the improved slides: which green number fixes which red one?"},
   {s:"Write the goal, then the before", d:"Your goal: what the person is trying to get done. Then every step people take now — the website, the form, the phone call, the message thread. If nothing like your idea exists yet, the before is how people manage without it. Write it into <code>A2</code>."},
   {s:"Count it", d:"Steps, taps, fields, messages, days waiting, dead ends. Every problem gets a number, not an adjective: “199 words before you can start”, not “too much text”."},
   {s:"Map it — your flow diagram", d:"Turn the same steps into a flow for <code>B4</code>. Open the <a href=\"flow.html\">Flow maker</a>, write your goal, and add one row for each thing a person does or waits for. If a row is a yes/no question, say what happens when the answer is no. Press <b>✗ stuck</b> wherever people go wrong and say why, with a number if you have one. The slide draws itself, left to right. <b>Download the slide for B4</b> and paste it in. Paper and a marker, photographed, is just as good. Then in pairs: where does your partner’s map loop back, or stop?"},
   {s:"Capture it", d:"Screenshot or photograph every step into <code>D1</code>, numbered to match A2. Chats need the owner’s permission and every other person’s name and number blurred."},
   {s:"Write C7 — one cross-cultural consideration", d:"One slide. Pick ONE that is real for your service: colour meaning, reading direction, names and dates, language, icons. The Welsh course case shows several."}
  ],
  leave:"A2 with your before counted, the before mapped in B4, D1 captured, C7 drafted.",
  done:"Every step in A2 has a box in B4 and a picture in D1, and the before has a count.",
  between:"Finish capturing D1 while you still have access to the before.",
  mistake:"Describing the before instead of counting it.",
  stuck:[["There is no website for my idea","Then the before is how people manage now: the chat, the phone, the paper. The bakery case is exactly that."],
         ["Can I screenshot a real service?","Yes, for your appendix, credited. Blur anyone’s personal details."],
         ["What counts as a step?","Anything the person has to do or wait for: a page, a tap, a call, a reply."]]
 }
},
{
 n:6, title:"Contemporary tools, and working with AI",
 makes:["Style tile","Mood board","AI log → Part A §7"],
 idea:"A generator can make a competent screen in a minute. It cannot make your decisions, and the decisions are what is marked.",
 hand:{keep:["A generator makes a competent screen fast. The decisions are still yours.", "Log every AI use the same day: tool, output, what you changed.", "Check anything generated against your own numbers."], next:"Finish your style tile."},
 shown:[
  {core:true, s:"Generate one, live", u:"https://interfaces.institute/collections/generated/", d:"Prompt for a screen. Show the output and say honestly: that is competent. <b>Generate it in the room, on the day</b> \u2014 the linked page says why this one is not pre-baked, and holds the schema the samples get measured with.", take:"A generator makes something competent in a minute. It cannot decide anything, and the deciding is what is marked."},
  {core:true, s:"Now check it against a spec", u:"https://interfaces.institute/collections/design-tools/#pairs", d:"Take your own type scale and contrast table from weeks 4 and 5 and check the generated screen against them. It will not comply. That gap is the whole hour. <b>The pair table computes all six ratios</b> from your five hexes, and opens on the example portfolio's palette — where every pair fails.", take:"Generated work still has to obey the numbers you declared in A3–A5. Check it against them."},
  {s:"Three variants, one prompt", u:"https://interfaces.institute/collections/generated/", d:"Critique all three against the same declared numbers, out loud. Run the same prompt three times in front of them \u2014 what varies when nothing in the request did is the point.", take:"Three variants from one prompt is a useful exercise. Judging all three against your own spec is the assessable part."},
  {s:"What the log looks like", d:"Part A §7 with a real line in it: tool, what it made, what you changed, why.", u:"assessment.html", take:"A7 is the record of what you used. C8 is what you make of it — was it any good, whose work is it, what did you change."}
 ],
 three:[
  {t:"Mood board and style tile", d:"B2 and B3, built only from numbers you already declared."},
  {t:"Your AI log open", d:"A7 started and C8 drafted — one line per use, from today on."},
  {t:"The style tile finished", d:"Everything you build in week 8 comes out of it.", open:true},
 ],
 workshop:{
  aim:"A style tile that obeys your own numbers, and your AI log opened.",
  goals:["Tell a mood board and a style tile apart, and produce both.", "Assemble a style tile that obeys numbers you already declared.", "Log an AI use in a form somebody else could check."],
  los: ["B1","B2"],
  out:{"sec": ["A7", "B2", "B3", "C8"], "what": "Mood board, style tile, the AI log and what you make of it"},
  bring:"Laptop · spec sheet §3–5 · whatever AI tools you use",
  run:[
   {s:"Mood board, fast", d:"Fifteen images, one page, the feeling you are aiming at. Generated images are encouraged here — every one gets a line in the log."},
   {s:"Style tile", d:"Not a mood board. Start from week 4’s screens and finish the tile: your type scale, your palette with roles, your spacing, and three sample components — a button, a field, a card. Every value comes from your own §3–5."},
   {s:"Open the log", d:"Part A §7. Every AI use from today: tool, what it produced, what you changed, why. One line each. Do it now — you will not remember in January."},
   {s:"Optional: feedback on your deck", d:"If you have shared your deck and would like feedback, sign up for a short slot with your tutor during the workshop. It is optional and not marked; everyone else carries on with the steps here."},
   {s:"Write C8 — what you make of the AI", d:"Eighty words, required by the brief and not the same as the A7 log. A7 is the record; C8 asks whether the output was any good, whose work it is, and what you changed. If you used none, say why — that is a full answer."}
  ],
  leave:"Mood board and style tile in B2–B3, A7 started, C8 drafted.",
  done:"Every number on your tile appears in Part A §3–5. Every AI use has a line.",
  between:"Nothing new. If the style tile is unfinished, finish it \u2014 everything built in week 8 comes out of it.",
  mistake:"Leaving the log until January.",
  stuck:[["Can I use AI?","Yes. Treat it like any other source: use it openly, and say how in Part A §7. What\u2019s marked is your decisions."],
         ["What goes on a style tile?","Type scale, colours with roles, spacing, three components. One page."],
         ["The AI made something better than mine","Good. Log it, then make it obey your numbers."]]
 }
},
{
 n:7, title:"UX basics and screen states",
 makes:["Your screens → Part A §2","Your flow, after → B4","C6 drafted"],
 idea:"The screens you forget to design are the ones people meet on their worst day.",
 hand:{keep:["Every screen has an empty, a loading and an error state.", "Give each screen a job in under ten words.", "Two screens with the same job are one screen."], next:"Nothing — you are ready to wireframe."},
 shown:[
  {s:"Empty, and not an error", u:"https://interfaces.institute/patterns/empty-states/", d:"The pattern written up: what an empty state owes the person looking at it, and why it is not an apology.", take:"An empty state is a working system with nothing in it yet. It says what goes here and offers the action that puts something there. Some of your screens will have one."},
  {core:true, s:"The five states", d:"Run the bad pane: loading, empty, error and offline all look identical. Step through them on the projector.", u:"https://interfaces.institute/stairwell/state/", take:"Four of the five states look identical when nobody designs them. Empty, loading, error and offline are screens, and they belong in A2."},
  {s:"Now the good pane", d:"Same five, each saying what happened and what to do. The empty state is not an error and should not apologise.", u:"https://interfaces.institute/stairwell/state/", take:"An empty state is not an error and should not apologise. It should offer the action that fills it."},
  {core:true, slides:"PassReady", s:"PassReady: the worst-day screens", d:"Five slides and one live model, from an app built for a test people get one go at: not knowing, not being sure yet, and what to do next.", u:"passready.html", take:"Not knowing and not being sure are states too. Each needs its own words and a next step, or the screen pretends to a certainty it has not earned."},
  {s:"Feedback", d:"Two buttons, both take 2.5 seconds. One says nothing. Press it as often as you like and count the jugs you bought.", u:"https://interfaces.institute/stairwell/feedback/", take:"A button that says nothing while it works gets pressed twice. That is a real cost, not a style point."},
  {s:"A flow, drawn crudely", u:"https://interfaces.institute/collections/flow-census/", d:"Six boxes, arrows, one decision. Deliberately rough. Draw one on the board from the census \u2014 <b>four real services walked, 43 screenshots, 24 screens</b>, and 20 of the 24 with a door the walk did not take.", take:"Each of your screens gets a job in under ten words. If two share a job, they are one screen \u2014 merge them."},
  {slides:"Room finder", s:"A finder, taken apart", d:"The Castlegate Room Finder: a real prototype over a made-up university. Browse it (buildings, then floors, then rooms), then search it. Then open Alder Hall, which has nothing in it.", u:"room-finder/index.html", take:"Information architecture is the order people find things in: a hierarchy to browse and a search to jump. Both need an answer for \u201cnothing here\u201d."},
 ],
 three:[
  {t:"The journey, both ways", d:"Part A §2 \u2014 the goal, the steps people take now, and your screens, counted."},
  {t:"Your flow beside the before, and C6", d:"Your version drawn next to week 5’s map in B4, and the ethics paragraph drafted."},
  {t:"The two you build first", d:"Decide before week 8, when every screen gets wireframed.", open:true},
 ],
 workshop:{
  aim:"The screens of your version, the states you forgot, and a flow somebody else can follow.",
  goals:["Name the goal, list how people reach it now, and give each of your screens a job in under ten words.", "Find the screens you forgot — empty, loading, error.", "Draw a flow somebody else can follow."],
  los: ["A1","B2"],
  out:{"sec": ["A2", "B4", "C6"], "what": "The journey before and after, your flow beside the before in B4, and the ethics paragraph"},
  bring:"Your B4 from week 5 · large paper and markers, or a laptop · your theme",
  run:[
   {s:"Your journey, after", d:"Open <code>A2</code> from week 5: the goal and the before are there. Now the after."},
   {s:"List your screens", d:"Give each of yours a job in under ten words, starting with a verb. Cross out any two that share a job. Do not add features: your count should come in under the before, and the difference is a number you will quote in C5."},
   {s:"The states check", d:"For each screen ask: what does this look like empty? Loading? When it fails? This usually adds one or two screens, and that is the point."},
   {s:"Make your flow from the before", d:"In the <a href=\"flow.html\">Flow maker</a>, open <b>2 · Your version</b> and press <b>Start from my “now”</b>. With the problems from week 5 in front of you, remove the steps nobody needs, merge the ones that belong together, move what has to come first, rename each step to say what your screen does, and add the screens you found in the states check. Show <b>Both</b> and <b>Download the slide for B4</b>: every old step is labelled kept, merged, moved, changed or removed. Then open <b>3 · What happened</b>, write a why for each, and copy it into <code>D2</code>. In class we show it first with <b>Load the example</b>: the missed-bin report going from 10 steps and 3 places people get stuck to 8 steps and none."},
   {s:"Swap flows", d:"Can your partner get from entry to the main task without asking you? If not, an arrow is missing."},
   {s:"Write C6 — ethics or sustainability", d:"Ninety words, one dimension named, required by the brief. You have just worked through empty, loading and error states — the screens people meet on their worst day. <b>That is an ethics answer</b>, and it is the one in front of you. Sustainability is the other route if you prefer it."}
  ],
  leave:"Part A §2 with both lists counted. B4 shows the before and your version side by side. C6 drafted.",
  done:"Both lists are counted, and each of your screens has a job someone else can read.",
  between:"Nothing. Week 8 needs your inventory and your grid, and you have both.",
  mistake:"Forgetting empty and error screens. They are half of week 9.",
  stuck:[["I only have four screens","Add the states. Empty, error and success are screens."],
         ["I have fifteen","Which two share a job? Cross one out. Repeat."],
         ["What's a job?","What someone came to this screen to do. One verb."]]
 }
},
{
 n:8, title:"Wireframe to screen",
 makes:["A wireframe for every screen","First 2 screens finished"],
 idea:"A wireframe is an argument about priority, not a grey drawing of a finished thing.",
 hand:{keep:["A wireframe decides priority, not decoration.", "Wireframe with real words, never lorem ipsum.", "Finished screens use only your own A3–A5 numbers."], next:"Finish every screen of your journey. Due at the start of week 9."},
 shown:[
  {core:true, s:"One control, drawn eight times", d:"The button across three decades, each specimen drawn from the properties that define it. Nothing copied from a screenshot.", u:"https://interfaces.institute/components/button/", take:"A wireframe is an argument about priority. Boxes and labels only — if you are choosing a font, stop."},
  {s:"What sixty-three systems ship", d:"Measured primary buttons. Twenty have no corner radius at all. Read it off the page.", u:"https://interfaces.institute/components/button/", take:"Twenty of sixty-three measured design systems use no corner radius at all. Whatever you choose, choose it rather than default to it."},
  {s:"Nobody agrees what to call anything", d:"391 component names across eight systems; three appear in all eight.", u:"https://interfaces.institute/collections/component-census/", take:"Eight influential systems cannot agree what to call a component. Name yours consistently and say so in A2."},
  {core:true, s:"Lorem ipsum versus real content", u:"https://interfaces.institute/collections/flow-census/#placeholder", d:"Wireframe the same screen twice. Real content changes the layout, which is why it is a constraint and not a detail. <b>Do not say it is because Latin words are the wrong length</b> \u2014 the specimen measures that and it is false (5.31 characters against 5.38). The vice is one placeholder in every slot: nothing wraps, so the layout is never asked the question.", take:"Real content changes the layout. Wireframe with the words you will actually use."}
 ],
 three:[
  {t:"A wireframe for every screen", d:"B5 — drawn against your own grid, one per screen in Part A §2."},
  {t:"Two finished screens", d:"The first two of B6, built for real in the room."},
  {t:"The rest of your screens", d:"Every remaining screen of the journey, finished \u2014 the biggest piece of work in the module, due at the start of week 9.", open:true},
 ],
 workshop:{
  aim:"Every screen wireframed, and the first two built for real.",
  goals:["Wireframe against your own declared grid.", "Decide priority before appearance.", "Test whether a screen's job is legible without you explaining it."],
  los: ["B1"],
  out:{"sec": ["B5", "B6"], "what": "Wireframes for every screen in A2, and the first two turned into finished screens"},
  bring:"Paper printed with your grid · markers · your §2 inventory · <b>laptop for the last half hour</b>",
  run:[
   {s:"Frame it and demo one", d:"Boxes and labels. No colour, no fonts, no icons. One screen on the projector, drawn quickly, saying what is being decided while drawing: this before that, this bigger than that."},
   {s:"Wireframe the set", d:"Every screen of your journey, on your own grid, quick rather than polished. Start with the boring screen, not the pretty one."},
   {s:"The blind test", d:"Cover your labels. Hand the set to a partner. Can they name each screen's job? Every failure is a screen you redraw now."},
   {s:"Build the first two, for real", d:"Pick your two most important wireframes and make them finished screens — your grid from <code>A3</code>, your scale from <code>A4</code>, your palette from <code>A5</code>, your style tile from <code>B3</code>. <b>Applied spec is recommended</b> — your real type and colour on your grid, with labelled boxes for pictures (<a href=\"style-kit.html#fidelity\">level 3 of 4</a>). Wireframes are fine too, if your style tile shows your type and colour. No photos or decoration needed. <b>Nothing new is invented here.</b> Every decision was made in weeks 3 to 6; this is the first time they are all applied at once, and doing two in the room is what makes the other four possible on your own. These are the first two rows of <code>B6</code>."},
   {s:"Photograph the set", d:"<code>B5</code> complete, and the first two rows of <code>B6</code> in the deck."}
  ],
  leave:"One wireframe per screen, photographed — and two of them already finished screens in B6.",
  done:"A classmate who has not seen it can name each screen's job with the labels covered.",
  between:"<b>Finish B6.</b> Two screens were built in the workshop; build the rest of the journey. This is the largest single piece of independent work in the module, and it is due <b>at the start of week 9</b>, not at the deadline. Everything in week 9 operates on these screens: you cannot audit a screen that does not exist.",
  mistake:"Decorating. A wireframe that took an hour is a mockup and is worth less here.",
  stuck:[["How detailed?","Boxes and labels. If you are choosing a font, stop."],
         ["My grid doesn't fit","Then week 3 was wrong. Fix it and update Part A §3 — that is allowed and honest."],
         ["Can I do it in Figma?","Paper is faster and you need eight."]]
 }
},
{
 n:9, title:"Adaptation and access",
 makes:["Access audit → Part A §6","C5 drafted","Other sizes, if you need them"],
 idea:"The conditions you designed in are not the conditions it will be used in.",
 hand:{keep:["Responsive means deciding what to remove, not shrinking everything.", "Touch targets at least 44px. Focus always visible.", "Log every failure — a logged failure still scores."], next:"Fix what the audit found, and log each fix."},
 shown:[
  {core:true, s:"Every size a screen has been", u:"https://interfaces.institute/collections/screen-sizes/", d:"Run the instrument in front of them. Same page, same words, every screen from a 1981 CGA to a 4K panel.", take:"A phone gained <b>twenty times the pixels</b> between 2007 and 2023 and <b>1.23 times the room</b> \u2014 320 CSS pixels to 393. The commonest screen in the world is 360 wide, a third of a 1990 desktop. Device pixels are sharpness; CSS pixels are room, and only one of them is what you design in."},
  {s:"What a breakpoint is for", u:"https://interfaces.institute/collections/grids/#breakpoints", d:"Nine published grids, and what each one actually does when the screen changes.", take:"Of 67 grids in the register, only <b>nine</b> write down how they behave across sizes. Five change the column count \u2014 Material 4\u21928\u219212, Carbon 4\u21928\u219216. Four keep twelve columns and change only the container width. Both are decisions; only one is adaptation."},
  {s:"Target size, measured", d:"Sixty-three design system buttons; forty-two are shorter than 44px. Say what 2.5.5 actually is — AAA, whole target, exceptions.", u:"https://interfaces.institute/components/button/", take:"Forty-two of sixty-three shipped buttons are under 44px. Yours has a measured minimum and it goes in A6."},
  {s:"Fitts, both panes", d:"A 14px confirm in the far corner against a 44px one under your cursor. Let the wrong-click count do the arguing.", u:"https://interfaces.institute/stairwell/fitts/", take:"A target that is hard to hit is a design failure you can measure. That measurement belongs in C5."},
  {s:"Colour is not a cue on its own", d:"A status that differs only by hue, then the same with a shape or a word added.", u:"https://interfaces.institute/collections/wcag/", take:"Colour on its own is not a cue. Add a shape or a word, and say why in C5."},
  {core:true, s:"Tab through a real page", u:"https://interfaces.institute/collections/keyboard-grammar/#tabstops", d:"Then tab through one where the focus ring was removed. Say nothing during the second one. The specimen has a button that takes the ring away and puts it back \u2014 tab it blind, then restore it and it shows the path they took. <b>10 controls, 8 tab stops</b>, both counted live.", take:"Tab through your own screens. If you cannot see where you are, neither can anyone using a keyboard."}
 ],
 three:[
  {t:"Other sizes, only if you need them", d:"B7 is optional. A better flow is worth more than more screens."},
  {t:"An honest audit", d:"Part A §6 filled in, C5 drafted, every failure written down."},
  {t:"The fixes, and the log", d:"Fix what the audit found and log each fix. The log is what is marked.", open:true},
 ],
 workshop:{
  aim:"Six images and an honest audit — on screens that arrived finished.",
  goals:["Adapt a layout rather than shrink it.", "Run an accessibility check across a whole set.", "Log a failure you have not fixed."],
  los: ["B1","B2"],
  out:{"sec": ["A6", "B7", "C5"], "what": "Accessibility values and the accessibility paragraph \u2014 and other screen sizes, if your project needs them"},
  bring:"Laptop · spec sheet · your contrast table · <b>every finished screen of your journey</b>",
  run:[
   {s:"Screens on the table, first thing", d:"Before anything else: <b>every screen of your journey, finished, on the wall, now.</b> This is <code>B6</code>, and it was due today — two built in the week 8 workshop, the rest between then and now. Anyone short says so at the start rather than at the end. <b>Nothing in today’s session works without them:</b> you cannot audit a screen that does not exist."},
   {s:"Other sizes \u2014 only if your project needs them", d:"Optional. Some journeys live on one size of screen: a council service is almost never used on a phone app, and that is fine. If yours is used on more than one size, take your two most important screens to the breakpoints in your §3. At the small size, decide what to REMOVE — not what to shrink. If nothing can go, the big version has nothing on it."},
   {s:"Run the checklist over everything", d:"Contrast, target size, focus, non-colour cues. Over the whole set, not just the two. Write down every failure — a logged failure you did not fix still scores; an unlogged one does not."},
   {s:"Fill in §6", d:"Minimum touch target, focus state, non-colour cues. Three real values from your own work."}
  ],
  leave:"B7 filled, A6 filled, and C5 drafted. B6 was due at the door.",
  done:"Six images exist, every failure is written down, and B6 was on the wall at the start.",
  between:"Fix what the audit found, and log every fix. The log is what is marked, not the fixing.",
  mistake:"Fixing failures without logging them. The log is what is marked.",
  stuck:[["Everything fits, I just made it smaller","What would you remove? If nothing, the big one is empty."],
         ["I found ten failures","Good. Log ten, fix three. Better than finding none."],
         ["Do I need to fix everything?","No. You need to find it and say so."]]
 }
},
{
 n:10, title:"Justifying a decision",
 makes:["Click-through → Part B §8","Part C rewritten"],
 idea:"Describing a design and defending one are different activities, and only one of them is marked.",
 hand:{keep:["Describing is not defending. Say why, with a number.", "Every C section quotes a value from Part A.", "Name one thing you rejected and one thing still wrong."], next:"Read all eight sections aloud once more."},
 shown:[
  {core:true, s:"Two paragraphs, same design", u:"example-sheet.html#defended", d:"One described, one defended. Read both aloud. Do not explain the difference yet. Both are C4 of the example portfolio they already have, and <b>the design in them is identical</b> \u2014 same five colours, same faults. Staff sheet \u00a707.", take:"Describing a design and defending one are different activities. Only one of them is marked."},
  {s:"Name the difference", d:"The second cites a number the student produced. That is all of it.", u:"assessment.html", take:"The difference is a number you produced yourself. Every C section quotes one."},
  {core:true, s:"All nine sections", d:"The one-slide limit and the Part A field each one must cite. Eight are drafted; C9 closes in week 11.", u:"assessment.html", take:"Nothing is drafted today. All eight were written in the week that made the decision — the work is turning them from description into defence."},
  {s:"A building correcting itself", d:"A published claim that was wrong, the correction, and the reasoning kept. Section 6 asks you to do this about your own work.", u:"https://interfaces.institute/updates/", take:"Admitting a limit with evidence is the top band, not a weakness. That is what Criterion 4 rewards."}
 ],
 three:[
  {t:"A click-through that works", d:"B8 \u2014 the journey clicks through, start to finish, checked in the PDF."},
  {t:"Eight sections that defend", d:"Each one quotes a number from Part A and names something you rejected."},
  {t:"One read-aloud pass", d:"Before week 11: a sentence with no number in it is costing you marks.", open:true},
 ],
 workshop:{
  aim:"Eight drafted sections turned from description into defence, and a click-through that works.",
  goals:["Cite a value you declared, in every section you write.", "Distinguish describing a design from defending one.", "Assemble and export one file that opens."],
  los: ["A1"],
  out:{"sec": ["B8", "D2", "D3"], "what": "The click-through, the before and after in D2 and D3, and eight drafted sections turned from description into defence"},
  bring:"Laptop · complete spec sheet · everything from Part B",
  run:[
   {s:"Read two of your own, aloud, to one other person", d:"Not mine \u2014 <b>yours</b>. Pick any two of the eight sections you have already drafted and read them to a partner. Their only job is to say, for each one, whether it <i>describes</i> or <i>defends</i>. They will be right, and it takes a glance per paragraph."},
   {s:"Turn description into defence \u2014 all eight", d:"Work through <code>C1</code> to <code>C8</code> with the five moves on the board. <b>You are not writing more, you are writing different.</b> Most of these already fit their slide: the example portfolio spent most of its colour answer describing the colours, and scored 38 for Critical Reflection. Every section ends up quoting a number from Part A, naming what you rejected, and saying what is still wrong."},
   {s:"Link your screens \u2014 this is your prototype", d:"Link the journey: every step to the next, plus a way back and a way out. In PowerPoint: click the thing on the slide that should be pressable, <b>Insert \u203a Link \u203a Place in This Document</b>, pick the slide it goes to. In Google Slides: select it, <b>Insert \u203a Link</b>, then <b>Slides in this presentation</b>. Link the ones a reader would actually press. <b>If a screen is a pasted picture</b> (from Figma, Canva or a photo), draw a rectangle over the button, set it to no fill and no outline, and link the rectangle. Put a <b>Start the prototype \u2192</b> link on your B8 slide, so a marker knows where to begin. Then write the links into <b>B8</b> as a from\u2192to list.", sk:"They are checked for existence and destination, not elegance. Nobody is marking how the arrow looks."},
   {s:"Export a test PDF and click it", d:"Today, not in January. Export the deck as a PDF \u2014 PowerPoint on Windows: <b>File \u203a Save As \u203a PDF</b>; PowerPoint on a Mac: <b>File \u203a Save As \u203a PDF</b>, choosing <b>Best for electronic distribution and accessibility</b>; Google Slides: <b>File \u203a Download \u203a PDF document</b>; Keynote: <b>File \u203a Export To \u203a PDF</b>. Open the PDF in a browser and click every link on your B8 list. <b>A link that works in the editor can vanish in the export</b>, and the PDF is the only thing marked. Anything broken: fix it in the deck, export again, click again."},
   {s:"Before and after, in the appendices", d:"Fill <code>D2</code>: every step from your before, and what happened to it \u2014 kept, merged, moved or removed, with a reason. Then <code>D3</code>: the two screens where your change matters most, before beside after. This is the evidence <code>C5</code> points at when it says the journey got shorter."},
   {s:"The count that decides it", d:"Go through your eight and count: <b>how many contain a number?</b> Anything without one is the bottom band and is a quick fix. Do it now rather than in January."}
  ],
  leave:"Eight sections that defend rather than describe, and a journey that clicks through, start to finish.",
  done:"Every one of the eight sections quotes a number from Part A and names something you rejected.",
  between:"Read your eight sections aloud once more. A sentence with no number in it, naming nothing you rejected, is costing you marks in the criterion that scored lowest in the example.",
  mistake:"Writing about how it feels. Feelings have no number attached.",
  stuck:[["I don't know what to cite","Open your Part A and read your own numbers. It is always there."],
         ["My answer will not fit on one slide","Cut the description. Keep the number and the reason."],
         ["Section 6 feels negative","It is the most sophisticated section. Naming a limit with evidence is the highest thing here."]]
 }
},
{
 n:11, title:"Submission", dead:true,
 makes:["References → Part C §9","Submit"],
 idea:"Nothing is taught this week and nothing is missable.",
 hand:{keep:["Export to PDF, then click every link in the PDF itself.", "Every source you quote appears in C9.", "Do not leave the upload to the last hour."], next:"Submit."},
 shown:[],
 three:[
  {t:"C9, your references", d:"Everything you cited, listed — Cite Them Right Harvard."},
  {t:"The PDF uploaded", d:"Exported from your deck, with the confirmation saved."},
  {t:"Nothing carried forward", d:"The quiet week. Submit by Friday 8 January, 21:00, and you are done."},
 ],
 workshop:{
  aim:"References written, PDF assembled, everyone submits.",
  goals:["Submit."],
  los: [],
  out:{"sec": ["C9"], "what": "The reference list, and the PDF"},
  bring:"Laptop · everything cited since week 2 · your PDF",
  run:[
   {s:"C9 \u2014 the reference list", d:"Everything you cited, listed, in one place. You have been citing since week 2 \u2014 the grid register, the WCAG clause, the tool you measured with, the building's own pages. <b>This is the last section of Part C and the easiest marks in it</b>, and it is the one most often missing altogether."},
   {s:"Assemble the PDF", d:"Export the deck, open the PDF, and click every link in the export. <b>A link that works in the editor and not in the PDF is the commonest way to lose <code>B8</code></b>, and it stays invisible until somebody opens the file you actually submitted."},
   {s:"Drop in if you need to", d:"No teaching. Export problems, Moodle mechanics, last read-throughs. If your work is done, submit and go."}
  ],
  leave:"C9 written, a submitted PDF and a confirmation email.",
  done:"C9 lists everything cited. Uploaded, and the confirmation arrived.",
  between:"Submit, if you have not. The deadline is Friday 8 January, 21:00.",
  mistake:"Leaving the export to the last hour. It is always bigger than you think.",
  stuck:[["My PDF is 400MB","Export at 150dpi."],["Moodle rejected it","Size limit. Same fix."],
         ["Can I still change my theme?","No."]]
 }
}
];
