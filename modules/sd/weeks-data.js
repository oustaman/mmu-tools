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
 {k:"Where your work lives", v:"Your <b>university OneDrive</b>, in one folder called <code>ScreenDesign</code>. Not your desktop, not a USB stick, not the studio machine — those get wiped. You set this up in week 1."},
 {k:"Share the folder", v:"Share <code>ScreenDesign</code> with your tutors in week 1 and leave it shared. That is how anyone helps you between classes, and how a tutor can look at your work before a check-in instead of during it."},
 {k:"Your name goes on nothing", v:"The deck is marked without your name on it. Call it <code>screen-design-portfolio</code> — no name in the filename, no name on the cover, no name in a header or footer. Your student ID only, if you want anything at all. <b>The OneDrive folder identifies you; the document does not.</b>"},
 {k:"One deck, all term", v:"You hand nothing in weekly. There is <b>one slide deck</b> — PowerPoint or Google Slides, whichever you already have — and you fill in a section of it each week. By week 10 it is finished, and in January you export it as a PDF."},
 {k:"One screen per slide", v:"When you build your screens in week 9, <b>put each one on its own slide.</b> In week 10 you link them together and that is your prototype \u2014 the assessment asks for a clickable multi-screen prototype, and if your screens are slides you get one by drawing six arrows. If they are pasted four to a page, you do not."},
 {k:"Bring every week", v:"Laptop or tablet, your OneDrive folder open, and your spec sheet. The spec sheet is the one thing you use in every single workshop."},
 {k:"Photograph paper work", v:"Weeks 2, 7 and 8 are on paper. Photograph everything before you leave the room and paste it straight into the deck that day. Paper gets lost; it always has."},
 {k:"Referencing", v:"<b>Cite Them Right Harvard.</b> If you quote or borrow anything — a principle, a statistic, an image — cite it in the text and list it at the end. <b>The reference list does not count toward your 500–700 words. In-text citations do.</b> <a href=\"http://libguides.mmu.ac.uk/refguide\" target=\"_blank\">libguides.mmu.ac.uk/refguide</a>"},
 {k:"How you submit", v:"In January, export your deck as a PDF and upload <b>that one file</b> to Moodle. Exporting from PowerPoint or Google Slides keeps your links working inside the PDF. Not a link, not a folder, not a zip. Sharing the OneDrive folder is not submitting."},
 {k:"Back up before you export", v:"Before you touch the final PDF in week 10, duplicate the folder. Exports go wrong and you do not want to rebuild."},
 {k:"AI is allowed", v:"Any tool. Log every use in Part A §7 the same day: tool, what it made, what you changed, why. One line. Not logging it is the only thing that is a problem."},
 {k:"If you miss a week", v:"Read that week's two sheets — they are the same ones the tutor used. Then bring the gap to the support hours."}
];

const WEEKS = [
{
 n:1, title:"Why screens look the way they do",
 makes:["3 teardowns","3 theme ideas"],
 idea:"Every layout decision you will make was made before, for reasons, and the reasons still hold.",
 shown:[
  {s:"The assessment brief", d:"Walk the eleven slides end to end. This is the first thing they see, and the only deck we give them — everything after this is workshops.", u:"brief.html", take:"The whole assessment is one document with 23 sections. Everything you are told this term is already in that brief."},
  {s:"The hand-in, in one page", d:"Every section of the hand-in, and the structure they copy in the workshop today.", u:"assessment.html", take:"You copy this structure in the workshop today. From then on you are filling it in, not starting it."},
  {s:"A manuscript page", d:"Margins and columns, centuries before screens. The margin is where the hand goes.", u:"https://written.institute/atlas/", take:"Margins and columns are not decoration. Every layout choice you make in week 3 was made before, for a reason."},
  {s:"Sixty-seven published grids", d:"Twenty of them are pre-screen. Filter to historical and put two plates side by side.", u:"https://interfaces.institute/collections/grids/", take:"A grid is something a publisher writes down. Yours goes in A3 in week 3 — seven numbers, no blanks."},
  {s:"Three live teardowns", u:"teardowns.html", d:"A news front page, a checkout, and one that is genuinely unclear. What do you read first, and which of five devices did it. <b>The deck is built</b> \u2014 every screen is a real capture, dated, walked step by step.", take:"Learn to say what you read first and which of five devices did it: scale, weight, colour, space, position. That vocabulary is what C2 is written in."},
  {s:"Six documented failures", d:"The Basement. Screens that went wrong in public, with the reasoning kept.", u:"https://interfaces.institute/basement/", take:"A screen fails when nobody can tell what to do next. Yours is marked on whether someone can."}
 ],
 workshop:{
  aim:"Set up your deck, then mark somebody else's.",
  goals:["Set up the one deck you will fill in for eleven weeks, and share it.",
         "Read the brief closely enough to argue about it.",
         "Judge a finished portfolio against the four marking criteria, and defend the number you give it."],
  los: ["A1","B1"],
  out:{"sec": ["\u2014"], "what": "Set the deck up. Nothing is filled in yet."},
  bring:"Laptop \u00b7 the brief open \u00b7 nothing else",
  run:[
   {t:"0:00", w:"25m", s:"Set up the one deck \u2014 everybody, before anything else", d:"Open OneDrive. New folder, called exactly <code>ScreenDesign</code>, shared with your tutors. Inside it, a new <b>PowerPoint</b> called <code>screen-design-portfolio</code> \u2014 or a Google Slides deck, if that is what you use. Then open the hand-in page, press <b>Copy the structure</b>, and paste it in \u2014 one section per slide. That is your whole assessment, empty. <b>Put your name nowhere in it.</b> Nobody leaves without a shared deck containing the structure \u2014 check as you circulate."},
   {t:"0:25", w:"20m", s:"Read the brief \u2014 in fours", d:"Groups of four, counted off round the room so nobody sits with their friends. Each group opens <a href=\"assessment.html#rubric\">the marking rubric</a> and writes, in their own words, one sentence per criterion: what would a marker have to SEE to give this a good mark? Twenty minutes, and do not help \u2014 they will get it roughly right, and that is the point."},
   {t:"0:45", w:"45m", s:"Mark the example portfolio", d:"Open <a href=\"example.html\">the example portfolio</a> \u2014 a complete, finished-looking submission we wrote. Same groups. A mark out of 100 against each of the four criteria, and <b>one sentence of evidence for every number</b>. No mark without a reason. Circulate and ask one question only: where in the document is that? <a href=\"example-sheet.html\">The staff sheet</a> carries the marks, every margin comment and the answers to what they will ask."},
   {t:"1:30", w:"25m", s:"Collect the marks on the board", d:"Every group calls out four numbers. Write them all up. The spread is the lesson \u2014 groups usually land between the high thirties and the high fifties, and the argument about why is worth more than the average. Then reveal the marks and read two of the margin comments aloud. Not all of them."},
   {t:"1:55", w:"5m", s:"The one thing to take away", d:"Ask the room what separates that portfolio from a good one. Steer to the answer: <b>everything the brief asked for is present, and almost none of it is evidenced.</b> That is the whole module in one sentence."}
  ],
  leave:"A shared deck with every section in it, and a mark you had to defend.",
  done:"Your tutor can open your deck and see the empty structure in it.",
  between:"Choose three possible themes. Nothing else \u2014 week 2 locks one of them, and it cannot change after that.",
  mistake:"Marking on how it looks. Two groups in three give the visual criterion the highest number and cannot say why.",
  stuck:[["I can't find OneDrive","office.com, sign in with your uni account, OneDrive in the launcher. Do not use a personal Microsoft account."],
         ["Why no name on the deck?","It is marked without your name on it. The folder says whose work it is."],
         ["Is this a real student?","No. We wrote it. Nothing in it comes from anybody's submission."],
         ["What mark would you give it?","Tell them after their groups have committed to a number, not before."]]
 }},
{
 n:2, title:"Composition and visual hierarchy",
 makes:["8 thumbnails","Theme locked","C1 drafted"],
 idea:"You get one focal point. Everything else is arranged around what you chose.",
 shown:[
  {s:"Scale, weight, space — live", u:"https://interfaces.institute/stairwell/hierarchy/", d:"Resize one element on a real page and watch the reading order change. Then add space only, change nothing else. <b>Five switches on one screen</b> — turn each device off in turn and the primary action stops being primary without moving, changing its words, or leaving the page.", take:"Changing one thing — size, weight, spacing — changes what gets read first. That is the whole of hierarchy."},
  {s:"Two focal points", d:"A real screen with two. Everyone takes a moment to find the first thing, and that moment is the cost.", u:"https://interfaces.institute/collections/bank-interfaces/", take:"You get one focal point per screen. Two costs the reader a moment, and that moment is what you write about in C2."},
  {s:"Recognition over recall", d:"Run both panes. Same task, two builds — one asks you to remember a command, one shows you a button.", u:"https://interfaces.institute/stairwell/recognition/", take:"Recognising beats remembering. Show the option rather than expecting someone to recall it."},
  {s:"Affordance", d:"Six pieces of text, two of them are buttons and nothing says which. Run the bad pane and count the wrong clicks.", u:"https://interfaces.institute/stairwell/affordance/", take:"If nothing says which parts are clickable, people click the wrong things. Criterion 2 is where that is marked."}
 ],
 workshop:{
  aim:"Eight rough layouts for one screen. Theme locked.",
  goals:["Generate eight alternatives for one screen under time pressure.", "Judge a layout on clarity rather than finish.", "Commit to one theme."],
  los: ["A1","B1"],
  out:{"sec": ["A1", "C1"], "what": "Theme & audience locked, and the paragraph that defends it"},
  bring:"A4 paper ×8 · thick markers · your three themes",
  run:[
   {t:"0:00", w:"15m", s:"Lock the theme, then frame it", d:"Pick one of your three and write it at the top of eight sheets. No changing after today. Markers only — if you can write body text you are too detailed."},
   {t:"0:15", w:"80m", s:"Eight rounds against a timer", d:"Pick your most important screen. Draw it eight different ways. Eight minutes each, two-minute break, timer on the projector. Rounds five to eight are the point — when you run out of ideas, move one thing and redraw."},
   {t:"1:35", w:"12m", s:"Lay them all out", d:"Groups of four, all 32 sheets on a table. Put a dot on the three clearest — not the prettiest. Then talk about where the dots landed."},
   {t:"1:47", w:"3m", s:"Photograph everything", d:"All eight sheets, exactly as they are. Keep them — they go into <code>B1</code> next week, once your theme has survived seven days. Fill in <code>A1</code> before you leave."},
   {t:"1:50", w:"10m", s:"Write C1 — who it is for", d:"Seventy words, in the deck, before you leave. Quote the two lines you just wrote into <code>A1</code>. You have just spent eighty minutes drawing for one audience deciding this; writing it down while it is fresh takes ten minutes. Writing it in week 10 takes an hour and comes out worse."}
  ],
  leave:"8 thumbnails, photographed. Theme locked into A1, and C1 drafted.",
  done:"Eight sheets exist and your theme is on all of them.",
  between:"Nothing. Week 2 is the heaviest drawing session of the term and your deck is set up. Rest.",
  mistake:"Making them neat, or redrawing them later. A tidy thumbnail is worth less.",
  stuck:[["Out of ideas at four","Correct. Move one thing and redraw."],
         ["Mine look bad","They are supposed to."],
         ["Can I use Figma?","No. Ten minutes on paper gets four layouts; in Figma it gets one."]]
 }
},
{
 n:3, title:"The grid",
 makes:["Layout spec → Part A §3","C2 drafted"],
 idea:"A grid is a decision you make once so you do not remake it four hundred times.",
 shown:[
  {s:"A layout with eleven different gaps", u:"https://interfaces.institute/collections/grids/#eleven", d:"Count them out loud on the projector — every gap is drawn with its measurement beside it. Then press <b>Snap to an 8px scale</b> and the eleven become five, with nothing else on the card changing.", take:"Every gap should come from a list you decided once. Eleven different gaps is eleven decisions you did not make."},
  {s:"Sixty-seven published grids", d:"Each plate drawn to that publisher's own numbers. Filter by who published it — a CSS framework beside a government manual beside a 1962 standard.", u:"https://interfaces.institute/collections/grids/", take:"Forty-nine of the sixty-seven wrote their grid down. Eighteen did not, and that is a finding rather than a gap. Yours goes in A3 today."},
  {s:"How many name no breakpoint", d:"Read the count off the page live. Do not memorise it.", u:"https://interfaces.institute/collections/grids/", take:"Plenty of published grids name no breakpoint at all. Yours names three, because the brief requires responsive design."},
  {s:"A spacing scale, built live", u:"https://interfaces.institute/collections/grids/#spacing", d:"4, 8, 12, 16, 24, 32. Then a layout snapping to it. <b>Read the counts off the page live</b> \u2014 41 of 68 publish no spacing scale at all, and the filter will show you which.", take:"A spacing scale is six numbers you reuse everywhere. Pick them now and stop guessing."}
 ],
 workshop:{
  aim:"Seven numbers, written into Part A §3.",
  goals:["State seven layout numbers and write them down.", "Test a drawn layout against your own grid and revise whichever is wrong.", "Produce a grid another person can rebuild without asking you."],
  los: ["B1"],
  out:{"sec": ["A3", "B1", "C2"], "what": "Seven layout numbers, last week's sketches, and the layout paragraph"},
  bring:"Laptop · your week 2 thumbnails · spec sheet",
  run:[
   {t:"0:00", w:"15m", s:"Name the seven numbers", d:"Columns, gutter, margin, max width, three breakpoints. Plus a spacing scale. You leave with all of them."},
   {t:"0:15", w:"55m", s:"Build your grid", d:"Work against your best week 2 thumbnail. Any tool, or graph paper. Do not pick 12 columns because everyone does — pick the number you can actually fill."},
   {t:"1:10", w:"25m", s:"Test it", d:"Redraw that thumbnail ON your grid. If it does not fit, the grid is wrong, not the drawing. Fix the grid."},
   {t:"1:35", w:"15m", s:"Swap, then paste your sketches", d:"Can your partner rebuild your grid from your numbers alone, without asking you anything? If not, a number is missing. Then paste last week's eight thumbnails into <code>B1</code> — your theme has survived a week, so they are now the right sketches."},
   {t:"1:50", w:"10m", s:"Write C2 — what you wanted read first", d:"Ninety words. <b>Quote three of your seven numbers</b> from <code>A3</code> — columns, gutter, max width. A layout paragraph with no number in it is a description, and descriptions are the bottom band."}
  ],
  leave:"Part A §3 filled in, and C2 drafted.",
  done:"Every box in §3 has a number. None says \"about\" or \"roughly\".",
  between:"Redraw one more thumbnail on your grid if it did not fit in the room. Ten minutes, not an evening.",
  mistake:"Twelve columns by default.",
  stuck:[["How many columns?","4, 6 or 12. What goes in each? If you cannot say, it is too many."],
         ["What are my breakpoints?","Resize until your thumbnail stops working. That number."],
         ["Does it have to be 8px?","No. Consistent and written down."]]
 }
},
{
 n:4, title:"Typography",
 makes:["Type spec → Part A §4","1 specimen screen","C3 drafted"],
 idea:"Most bad screen type is a line-length problem wearing a font problem's clothes.",
 shown:[
  {s:"Two paragraphs", u:"https://written.institute/laboratory/#measure", d:"Same font, same size. One at 45 characters, one poured into the full width. Leave both up for ten seconds and say nothing. The slider underneath sets any measure from 20 to 140, and both labels <b>count the characters live</b> rather than claiming a number.", take:"Line length is the problem more often than the font is. If your text is hard to read, the column is too wide."},
  {s:"The type laboratory", d:"Anatomy, fast. Enough to describe a difference, not a taxonomy test. Five guide lines — baseline, x-height, cap height, ascender, descender — laid over Latin, Arabic, Devanagari and Han at the same size on the same baseline. <b>Toggle them off one at a time</b> and watch how many have nothing to measure.", u:"https://written.institute/laboratory/#anatomy", take:"Two families at most, four or five sizes. More is a portfolio that could not decide."},
  {s:"Families have jobs", d:"Walk the hall of typologies.", u:"https://written.institute/typologies/", take:"Families have jobs. One for headings, one for reading — and say why in C3."},
  {s:"What systems actually ship", d:"Measured body face and size across 122 design systems. Read the common values live.", u:"https://interfaces.institute/collections/design-systems/", take:"Design systems publish their real type sizes. Yours goes in A4 with a role for every size."},
  {s:"Where text breaks", d:"Forty-nine line-breaking classes, each with a specimen. One of them is the one every design assumes.", u:"https://interfaces.institute/collections/line-breaking/", take:"Not every language breaks lines the way English does. If your topic touches another language, this is material for C7."}
 ],
 workshop:{
  aim:"A type scale, one screen set in it, and the paragraph that defends both.",
  goals:["Build a type scale with a role for every size.", "Set a real screen using only sizes from that scale.", "Recognise a line-length problem when you see one."],
  los: ["B2"],
  out:{"sec": ["A4", "C3"], "what": "Type scale with a role for every size, and the typography paragraph"},
  bring:"Laptop · your grid · spec sheet",
  run:[
   {t:"0:00", w:"15m", s:"Two families maximum", d:"One for headings, one for body — or one doing both. Three families is a portfolio that looks unsure. Pick a base size and a ratio; 16 and 1.25 work."},
   {t:"0:15", w:"45m", s:"Build the scale", d:"Generate your sizes and give each one a job: page title, section, body, caption. Four or five sizes. If you have eight, delete three."},
   {t:"1:00", w:"40m", s:"Set one screen in it", d:"Your most text-heavy screen, using only sizes from your scale. This is where the scale gets tested and usually revised."},
   {t:"1:40", w:"10m", s:"Swap", d:"Find one thing on your partner's screen that is not on their scale. There is always one."},
   {t:"1:50", w:"10m", s:"Write C3 — the type decisions", d:"Ninety words, quoting sizes from <code>A4</code>. Name the two families and say what each is for. If you used three, defend the third here or drop it — that is the choice, and both answers are markable."}
  ],
  leave:"Part A §4 filled, C3 drafted, and one specimen screen — the first thing that becomes B6.",
  done:"Nothing on your screen is at a size that is not on your scale.",
  between:"Set a second screen in your scale. It takes half as long as the first, and it is the test of whether the scale works or whether you fitted it to one screen.",
  mistake:"Eight sizes. You need four.",
  stuck:[["Which fonts?","Anything on Google Fonts. The pairing matters less than the scale holding."],
         ["What ratio?","1.25. Look at your headings and decide if you want more or less contrast."],
         ["My measure is too long","The column is too wide. Go back to your grid — that is what it is for."]]
 }
},
{
 n:5, title:"Colour",
 makes:["Colour spec → Part A §5","Contrast table","C4 drafted"],
 idea:"Contrast is the one part of colour that is measurable, and therefore the one part nobody can argue with you about.",
 shown:[
  {s:"Traffic colour", d:"How the meaning got fixed, and by whom.", u:"https://symbolic.institute/visual-grammar/traffic-colour/", take:"Colour means different things in different places. Pick one such difference and write it into C7 today — the brief asks for it by name."},
  {s:"The same hue, different meanings", d:"Colour associations by place. Walk a few.", u:"https://symbolic.institute/collections/colour-associations/", take:"Same hue, different meaning depending on where you are. That is your cross-cultural consideration, and it is markable."},
  {s:"A law that names colour and no values", d:"GHS: black symbol, white ground, red frame \"sufficiently wide to be clearly visible\". No hex anywhere in a binding text.", u:"https://symbolic.institute/collections/symbol-standards/", take:"A law can name a colour without naming a value. Your A5 names values, because a marker has to be able to check them."},
  {s:"What fifty banks actually use", d:"Measured off their live pages. Sort by hue and watch the blues stack up.", u:"https://interfaces.institute/collections/bank-interfaces/", take:"Measure your colours, do not describe them. Every text pair gets a contrast figure in A5."},
  {s:"Contrast, live", d:"Put a real pair up, get the ratio, darken it until it passes. Do the arithmetic in front of them.", u:"https://webaim.org/resources/contrastchecker/", take:"Anything under 4.5:1 gets changed in the room. That number is the one thing nobody can argue with you about."}
 ],
 workshop:{
  aim:"Five colours with roles, and a ratio for every text pair.",
  goals:["Assign colour roles before choosing any colour.", "Measure the contrast of every text pair and record the number.", "Change a failing pair rather than argue with it."],
  los: ["B2"],
  out:{"sec": ["A5", "C4", "C7"], "what": "Colours with contrast figures, the colour paragraph and the cross-cultural one"},
  bring:"Laptop · spec sheet · your week 4 screen",
  run:[
   {t:"0:00", w:"15m", s:"Roles first, colours second", d:"Write the five roles before you pick anything: background, surface, body text, quiet text, accent. Five is plenty."},
   {t:"0:15", w:"40m", s:"Assign a hex to each", d:"Then check the first pair immediately and watch it fail. That failure is the lesson — do not skip it."},
   {t:"0:55", w:"40m", s:"The contrast table", d:"Every text-on-background pair, measured, written into §5. Anything under 4.5:1 gets changed now, in this room. Use any contrast checker."},
   {t:"1:35", w:"10m", s:"Write C4 — the colour decisions", d:"Ninety words, quoting two ratios from <code>A5</code>. Say which pair failed first and what you changed. <b>The failure is the paragraph.</b> A colour section with no number in it reads as decoration."},
   {t:"1:45", w:"7m", s:"Recolour", d:"Apply it to your week 4 screen."},
   {t:"1:52", w:"8m", s:"Write C7 — the cross-cultural paragraph", d:"Eighty words, and the brief asks for it by name. Pick ONE: colour symbolism, reading direction, icon universality, or how culturally specific your imagery is. If you used red for a warning, <a href=\"https://symbolic.institute/collections/colour-associations/\" target=\"_blank\">colour associations</a> will tell you where that reads differently."}
  ],
  leave:"A5 filled, C4 and C7 drafted.",
  done:"Every pair has a number and none is below 4.5:1.",
  between:"Recolour that second screen. You now have two screens carrying your grid, your scale and your palette.",
  mistake:"Listing colours without pairs. The pair is what has a ratio.",
  stuck:[["My brand colour fails","Keep it for large text and non-text. Darken a variant for body. Both go in the table."],
         ["How many colours?","Five roles."],
         ["Is 4.4:1 fine?","No. It is a number, and the number is the point."]]
 }
},
{
 n:6, title:"Contemporary tools, and working with AI",
 makes:["Style tile","Mood board","AI log → Part A §7"],
 idea:"A generator can make a competent screen in a minute. It cannot make your decisions, and the decisions are what is marked.",
 shown:[
  {s:"Generate one, live", u:"https://interfaces.institute/collections/generated/", d:"Prompt for a screen. Show the output and say honestly: that is competent. <b>Generate it in the room, on the day</b> \u2014 the linked page says why this one is not pre-baked, and holds the schema the samples get measured with.", take:"A generator makes something competent in a minute. It cannot decide anything, and the deciding is what is marked."},
  {s:"Now check it against a spec", u:"https://interfaces.institute/collections/design-tools/#pairs", d:"Take your own type scale and contrast table from weeks 4 and 5 and check the generated screen against them. It will not comply. That gap is the whole hour. <b>The pair table computes all six ratios</b> from your five hexes, and opens on the example portfolio's palette — where every pair fails.", take:"Generated work still has to obey the numbers you declared in A3–A5. Check it against them."},
  {s:"Three variants, one prompt", u:"https://interfaces.institute/collections/generated/", d:"Critique all three against the same declared numbers, out loud. Run the same prompt three times in front of them \u2014 what varies when nothing in the request did is the point.", take:"Three variants from one prompt is a useful exercise. Judging all three against your own spec is the assessable part."},
  {s:"What the log looks like", d:"Part A §7 with a real line in it: tool, what it made, what you changed, why.", u:"assessment.html", take:"A7 is the record of what you used. C8 is what you make of it — was it any good, whose work is it, what did you change."}
 ],
 workshop:{
  aim:"A style tile that obeys your own numbers, and your AI log opened.",
  goals:["Tell a mood board and a style tile apart, and produce both.", "Assemble a style tile that obeys numbers you already declared.", "Log an AI use in a form somebody else could check."],
  los: ["B1","B2"],
  out:{"sec": ["A7", "B2", "B3", "C8"], "what": "Mood board, style tile, the AI log and what you make of it"},
  bring:"Laptop · spec sheet §3–5 · whatever AI tools you use",
  run:[
   {t:"0:00", w:"25m", s:"Mood board, fast", d:"Fifteen images, one page, the feeling you are aiming at. Generated images are encouraged here — every one gets a line in the log."},
   {t:"0:25", w:"60m", s:"Style tile", d:"Not a mood board. Your type scale, your palette with roles, your spacing, and three sample components: a button, a field, a card. Every value comes from your own §3–5."},
   {t:"1:25", w:"23m", s:"Open the log", d:"Part A §7. Every AI use from today: tool, what it produced, what you changed, why. One line each. Do it now — you will not remember in January."},
   {t:"1:48", w:"12m", s:"Write C8 — what you make of the AI", d:"Eighty words, required by the brief and not the same as the A7 log. A7 is the record; C8 asks whether the output was any good, whose work it is, and what you changed. If you used none, say why — that is a full answer."}
  ],
  leave:"Mood board and style tile in B2–B3, A7 started, C8 drafted.",
  done:"Every number on your tile appears in Part A §3–5. Every AI use has a line.",
  between:"Nothing new. If the style tile is unfinished, finish it \u2014 everything built in week 8 comes out of it.",
  mistake:"Leaving the log until January.",
  stuck:[["Is using AI cheating?","No. Not logging it is."],
         ["What goes on a style tile?","Type scale, colours with roles, spacing, three components. One page."],
         ["The AI made something better than mine","Good. Log it, then make it obey your numbers."]]
 }
},
{
 n:7, title:"UX basics and screen states",
 makes:["Inventory 6–8 → Part A §2","Flow diagram","C6 drafted"],
 idea:"The screens you forget to design are the ones people meet on their worst day.",
 shown:[
  {s:"The five states", d:"Run the bad pane: loading, empty, error and offline all look identical. Step through them on the projector.", u:"https://interfaces.institute/stairwell/state/", take:"Four of the five states look identical when nobody designs them. Empty, loading, error and offline are screens, and they belong in A2."},
  {s:"Now the good pane", d:"Same five, each saying what happened and what to do. The empty state is not an error and should not apologise.", u:"https://interfaces.institute/stairwell/state/", take:"An empty state is not an error and should not apologise. It should offer the action that fills it."},
  {s:"Feedback", d:"Two buttons, both take 2.5 seconds. One says nothing. Press it as often as you like and count the jugs you bought.", u:"https://interfaces.institute/stairwell/feedback/", take:"A button that says nothing while it works gets pressed twice. That is a real cost, not a style point."},
  {s:"A flow, drawn crudely", u:"https://interfaces.institute/collections/flow-census/", d:"Six boxes, arrows, one decision. Deliberately rough. Draw one on the board from the census \u2014 <b>four real services walked, 43 screenshots, 24 screens</b>, and 20 of the 24 with a door the walk did not take.", take:"Six to eight screens, each with a job in under ten words. If two share a job, you have seven screens, not eight."}
 ],
 workshop:{
  aim:"Six to eight named screens, and the flow between them.",
  goals:["Name six to eight screens and give each a job in under ten words.", "Find the screens you forgot — empty, loading, error.", "Draw a flow somebody else can follow."],
  los: ["A1","B2"],
  out:{"sec": ["A2", "B4", "C6"], "what": "Screen inventory, flow diagram, and the ethics paragraph"},
  bring:"Large paper · markers · your theme",
  run:[
   {t:"0:00", w:"35m", s:"List every screen", d:"Give each a job in under ten words, starting with a verb. Then cross out any two that share a job. Most people start at eleven and land at seven."},
   {t:"0:35", w:"20m", s:"The states check", d:"For each screen ask: what does this look like empty? Loading? When it fails? This usually adds one or two screens, and that is the point."},
   {t:"0:55", w:"45m", s:"Draw the flow", d:"Boxes and arrows on big paper. Where does someone enter? Where can they get stuck?"},
   {t:"1:40", w:"10m", s:"Swap flows", d:"Can your partner get from entry to the main task without asking you? If not, an arrow is missing."},
   {t:"1:50", w:"10m", s:"Write C6 — ethics or sustainability", d:"Ninety words, one dimension named, required by the brief. You have just spent twenty minutes on empty, loading and error states — the screens people meet on their worst day. <b>That is an ethics answer</b>, and it is the one in front of you. Sustainability is the other route if you prefer it."}
  ],
  leave:"Part A §2 with 6–8 rows. Flow photographed, and C6 drafted.",
  done:"Six to eight screens, each with a job someone else can read.",
  between:"Nothing. Week 8 needs your inventory and your grid, and you have both.",
  mistake:"Forgetting empty and error screens. They are half of week 9.",
  stuck:[["I only have four screens","Add the states. Empty, error and success are screens."],
         ["I have fifteen","Which two share a job? Cross one out. Repeat."],
         ["What's a job?","What someone came to this screen to do. One verb."]]
 }
},
{
 n:8, title:"Wireframe to screen",
 makes:["Wireframe set 6–8","First 2 screens finished"],
 idea:"A wireframe is an argument about priority, not a grey drawing of a finished thing.",
 shown:[
  {s:"One control, drawn eight times", d:"The button across three decades, each specimen drawn from the properties that define it. Nothing copied from a screenshot.", u:"https://interfaces.institute/components/button/", take:"A wireframe is an argument about priority. Boxes and labels only — if you are choosing a font, stop."},
  {s:"What sixty-three systems ship", d:"Measured primary buttons. Twenty have no corner radius at all. Read it off the page.", u:"https://interfaces.institute/components/button/", take:"Twenty of sixty-three measured design systems use no corner radius at all. Whatever you choose, choose it rather than default to it."},
  {s:"Nobody agrees what to call anything", d:"391 component names across eight systems; three appear in all eight.", u:"https://interfaces.institute/collections/component-census/", take:"Eight influential systems cannot agree what to call a component. Name yours consistently and say so in A2."},
  {s:"Lorem ipsum versus real content", u:"https://interfaces.institute/collections/flow-census/#placeholder", d:"Wireframe the same screen twice. Real content changes the layout, which is why it is a constraint and not a detail. <b>Do not say it is because Latin words are the wrong length</b> \u2014 the specimen measures that and it is false (5.31 characters against 5.38). The vice is one placeholder in every slot: nothing wraps, so the layout is never asked the question.", take:"Real content changes the layout. Wireframe with the words you will actually use."}
 ],
 workshop:{
  aim:"Every screen wireframed, and the first two built for real.",
  goals:["Wireframe against your own declared grid.", "Decide priority before appearance.", "Test whether a screen's job is legible without you explaining it."],
  los: ["B1"],
  out:{"sec": ["B5", "B6"], "what": "Wireframes for every screen in A2, and the first two turned into finished screens"},
  bring:"Paper printed with your grid · markers · your §2 inventory · <b>laptop for the last half hour</b>",
  run:[
   {t:"0:00", w:"15m", s:"Frame it and demo one", d:"Boxes and labels. No colour, no fonts, no icons. One screen on the projector in eight minutes, saying what is being decided while drawing: this before that, this bigger than that."},
   {t:"0:15", w:"60m", s:"Wireframe the set", d:"All six to eight, on your own grid, ten minutes each maximum. Start with the boring screen, not the pretty one."},
   {t:"1:15", w:"15m", s:"The blind test", d:"Cover your labels. Hand the set to a partner. Can they name each screen's job? Every failure is a screen you redraw now."},
   {t:"1:30", w:"25m", s:"Build the first two, for real", d:"Pick your two most important wireframes and make them finished screens — your grid from <code>A3</code>, your scale from <code>A4</code>, your palette from <code>A5</code>, your style tile from <code>B3</code>. <b>Nothing new is invented here.</b> Every decision was made in weeks 3 to 6; this is the first time they are all applied at once, and doing two in the room is what makes the other four possible on your own. These are the first two rows of <code>B6</code>."},
   {t:"1:55", w:"5m", s:"Photograph the set", d:"<code>B5</code> complete, and the first two rows of <code>B6</code> in the deck."}
  ],
  leave:"One wireframe per screen, photographed — and two of them already finished screens in B6.",
  done:"A stranger can name each screen's job with the labels covered.",
  between:"<b>Finish B6.</b> Two screens were built in the workshop; build the remaining four to six. This is the largest single piece of independent work in the module \u2014 budget six to eight hours \u2014 and it is due <b>at the start of week 9</b>, not at the deadline. Everything in week 9 operates on these screens: you cannot show a screen at three sizes, or audit it, if it does not exist.",
  mistake:"Decorating. A wireframe that took an hour is a mockup and is worth less here.",
  stuck:[["How detailed?","Boxes and labels. If you are choosing a font, stop."],
         ["My grid doesn't fit","Then week 3 was wrong. Fix it and update Part A §3 — that is allowed and honest."],
         ["Can I do it in Figma?","Paper is faster and you need eight."]]
 }
},
{
 n:9, title:"Responsive is adaptation, not shrinking",
 makes:["2 screens × 3 sizes","Access audit → Part A §6","C5 drafted"],
 idea:"Accessibility is a design constraint that improves the work, not a checklist that follows it.",
 shown:[
  {s:"Target size, measured", d:"Sixty-three design system buttons; forty-two are shorter than 44px. Say what 2.5.5 actually is — AAA, whole target, exceptions.", u:"https://interfaces.institute/components/button/", take:"Forty-two of sixty-three shipped buttons are under 44px. Yours has a measured minimum and it goes in A6."},
  {s:"Fitts, both panes", d:"A 14px confirm in the far corner against a 44px one under your cursor. Let the wrong-click count do the arguing.", u:"https://interfaces.institute/stairwell/fitts/", take:"A target that is hard to hit is a design failure you can measure. That measurement belongs in C5."},
  {s:"Colour is not a cue on its own", d:"A status that differs only by hue, then the same with a shape or a word added.", u:"https://interfaces.institute/collections/wcag/", take:"Colour on its own is not a cue. Add a shape or a word, and say why in C5."},
  {s:"Tab through a real page", u:"https://interfaces.institute/collections/keyboard-grammar/#tabstops", d:"Then tab through one where the focus ring was removed. Say nothing during the second one. The specimen has a button that takes the ring away and puts it back \u2014 tab it blind, then restore it and it shows the path they took. <b>10 controls, 8 tab stops</b>, both counted live.", take:"Tab through your own screens. If you cannot see where you are, neither can anyone using a keyboard."}
 ],
 workshop:{
  aim:"Six images and an honest audit — on screens that arrived finished.",
  goals:["Adapt a layout rather than shrink it.", "Run an accessibility check across a whole set.", "Log a failure you have not fixed."],
  los: ["B1","B2"],
  out:{"sec": ["A6", "B7", "C5"], "what": "Three sizes of two screens, accessibility values and the accessibility paragraph"},
  bring:"Laptop · spec sheet · your contrast table · <b>your 6–8 finished screens</b>",
  run:[
   {t:"0:00", w:"15m", s:"Screens on the table, first thing", d:"Before anything else: <b>six to eight finished screens, on the wall, now.</b> This is <code>B6</code>, and it was due today — two built in the week 8 workshop, the rest between then and now. Anyone short says so in the first five minutes rather than the last five. <b>Nothing in today’s session works without them:</b> you cannot show a screen at three sizes that does not exist, and you cannot audit it either."},
   {t:"0:15", w:"50m", s:"Two screens at three sizes", d:"Your two most important screens, at the three breakpoints in your §3. At the small size, decide what to REMOVE — not what to shrink. If nothing can go, the big version has nothing on it."},
   {t:"1:05", w:"35m", s:"Run the checklist over everything", d:"Contrast, target size, focus, non-colour cues. Over the whole set, not just the two. Write down every failure — a logged failure you did not fix still scores; an unlogged one does not."},
   {t:"1:40", w:"20m", s:"Fill in §6", d:"Minimum touch target, focus state, non-colour cues. Three real values from your own work."}
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
 shown:[
  {s:"Two paragraphs, same design", u:"example-sheet.html#defended", d:"One described, one defended. Read both aloud. Do not explain the difference yet. Both are C4 of the example portfolio they already have, and <b>the design in them is identical</b> \u2014 same five colours, same faults. Staff sheet \u00a707.", take:"Describing a design and defending one are different activities. Only one of them is marked."},
  {s:"Name the difference", d:"The second cites a number the student produced. That is all of it.", u:"assessment.html", take:"The difference is a number you produced yourself. Every C section quotes one."},
  {s:"All six sections", d:"Word count and the Part A field each one must cite.", u:"assessment.html", take:"Nothing is drafted today. All eight were written in the week that made the decision — the work is turning them from description into defence."},
  {s:"A building correcting itself", d:"A published claim that was wrong, the correction, and the reasoning kept. Section 6 asks you to do this about your own work.", u:"https://interfaces.institute/updates/", take:"Admitting a limit with evidence is the top band, not a weakness. That is what Criterion 4 rewards."}
 ],
 workshop:{
  aim:"Eight drafted sections turned from description into defence, and a click-through that works.",
  goals:["Cite a value you declared, in every section you write.", "Distinguish describing a design from defending one.", "Assemble and export one file that opens."],
  los: ["A1"],
  out:{"sec": ["B8"], "what": "The click-through, and eight drafted sections turned from description into defence"},
  bring:"Laptop · complete spec sheet · everything from Part B",
  run:[
   {t:"0:00", w:"20m", s:"Read two of your own, aloud, to one other person", d:"Not mine \u2014 <b>yours</b>. Pick any two of the eight sections you have already drafted and read them to a partner. Their only job is to say, for each one, whether it <i>describes</i> or <i>defends</i>. They will be right, and it takes about four seconds a paragraph."},
   {t:"0:20", w:"55m", s:"Turn description into defence \u2014 all eight", d:"Work through <code>C1</code> to <code>C8</code> with the five moves on the board. <b>You are not writing more, you are writing different.</b> Most of these are under their word limit: the example portfolio spent 40 of its 90 words on colour and scored 38 for Critical Reflection. Every section ends up quoting a number from Part A, naming what you rejected, and saying what is still wrong."},
   {t:"1:15", w:"30m", s:"Link your screens \u2014 this is your prototype", d:"Six links, twenty seconds each. In PowerPoint: click the thing on the slide that should be pressable, <b>Insert \u203a Link \u203a Place in This Document</b>, pick the slide it goes to. In Google Slides: select it, <b>Insert \u203a Link</b>, then <b>Slides in this presentation</b>. Do six \u2014 the ones a reader would actually press. Then write them into <b>B8</b> as a from\u2192to list. <b>Check every one before you leave the room.</b> A link that lands on the wrong slide is fixed here in ten seconds; it cannot be fixed in January.", sk:"They are checked for existence and destination, not elegance. Nobody is marking how the arrow looks."},
   {t:"1:45", w:"15m", s:"The count that decides it", d:"Go through your eight and count: <b>how many contain a number?</b> Anything without one is the bottom band and takes five minutes to fix. Do that now rather than in January."}
  ],
  leave:"Eight sections that defend rather than describe, and six links that land.",
  done:"Every one of the eight sections quotes a number from Part A and names something you rejected.",
  between:"Read your eight sections aloud once more. A sentence with no number in it, naming nothing you rejected, is costing you marks in the criterion that scored lowest in the example.",
  mistake:"Writing about how it feels. Feelings have no number attached.",
  stuck:[["I don't know what to cite","Open your Part A and read your own numbers. It is always there."],
         ["I'm over the word count","Cut the description. Keep the number and the reason."],
         ["Section 6 feels negative","It is the most sophisticated section. Naming a limit with evidence is the highest thing here."]]
 }
},
{
 n:11, title:"Submission", dead:true,
 makes:["References → Part C §9","Submit"],
 idea:"Nothing is taught this week and nothing is missable.",
 shown:[],
 workshop:{
  aim:"References written, PDF assembled, everyone submits.",
  goals:["Submit."],
  los: [],
  out:{"sec": ["C9"], "what": "The reference list, and the PDF"},
  bring:"Laptop · everything cited since week 2 · your PDF",
  run:[
   {t:"0:00", w:"25m", s:"C9 \u2014 the reference list", d:"Everything you cited, listed, in one place. You have been citing since week 2 \u2014 the grid register, the WCAG clause, the tool you measured with, the building's own pages. <b>This is the last section of Part C and the easiest marks in it</b>, and it is the one most often missing altogether."},
   {t:"0:25", w:"25m", s:"Assemble the PDF", d:"Export the deck, open the PDF, and click all six links in the export. <b>A link that works in the editor and not in the PDF is the commonest way to lose <code>B8</code></b>, and it stays invisible until somebody opens the file you actually submitted."},
   {t:"0:50", w:"70m", s:"Drop in if you need to", d:"No teaching. Export problems, Moodle mechanics, last read-throughs. If your work is done, submit and go."}
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
