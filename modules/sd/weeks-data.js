/* Eleven weeks, as students read them.
 *
 *   SHOWN     what the lecture hour shows: a title, a link and one takeaway. How to run it in
 *             the room is not written here (deleted 23 Oct 2026, with the tutors' panel).
 *   WORKSHOP  what to make (out.sec, ticked against the Checklist), the steps in one or two
 *             sentences each, one line for before next week, and the questions people ask.
 *
 *  Each fact lives on one page of the site; a step links to its owner rather than restating it.
 *  Weeks 1 and 2 keep their number of steps: the staff marking sheets pair a note with each.
 *  Still here only for other pages, until they are reworked: makes, three, aim (the Overview)
 *  and mistake (the week 1 staff sheet). Nothing on the week page shows them.
 */
const WEEKS = [
{
 n:1, title:"Why screens look the way they do",
 makes:["3 teardowns","3 theme ideas"],
 shown:[
  {core:true, s:"The assessment brief", u:"index.html#brief", take:"The whole assessment is one document, and every section of it is listed on the hand-in page. Everything you are told this term is already in that brief."},
  {s:"The hand-in, in one page", u:"assessment.html", take:"You copy this structure in the workshop today. From then on you are filling it in, not starting it."},
  {s:"A manuscript page", u:"https://written.institute/atlas/", take:"Margins and columns are not decoration. Every layout choice you make in week 3 was made before, for a reason."},
  {s:"Sixty-seven published grids", u:"https://interfaces.institute/collections/grids/", take:"A grid is something a publisher writes down. Yours goes in A3 in week 3 — seven numbers, no blanks."},
  {core:true, slides:"Teardowns", s:"Three live teardowns", u:"teardowns.html", take:"Learn to say what you read first and which of five devices did it: scale, weight, colour, space, position. That vocabulary is what C2 is written in."},
  {s:"Six documented failures", u:"https://interfaces.institute/basement/", take:"A screen fails when nobody can tell what to do next. Yours is marked on whether someone can."},
 ],
 three:[
  {t:"Your shared folder and deck", d:"On OneDrive, shared with us, a slide for every section."},
  {t:"A mark you had to defend", d:"You marked the fake submission, and heard how we mark it."},
  {t:"Three possible themes", d:"Bring them to week 2 — one becomes your project.", open:true},
 ],
 workshop:{
  aim:"Set up your deck, then mark somebody else's.",
  out:{"sec": ["—"]},
  run:[
   {s:"Make your folder and share it", d:"Follow <a href=\"assessment.html#setup\">Set up your deck</a> on the Checklist: a OneDrive folder called <code>Screen Design</code>, shared with your tutors and the teaching staff."},
   {s:"Set up the one deck", d:"Then the deck inside it, with a slide for every section, as <a href=\"assessment.html#setup\">Set up your deck</a> shows. That is your whole assessment, empty."},
   {s:"Read the rubric, in fours", d:"In groups of four, open <a href=\"rubric.html\">the blank rubric</a> and write one sentence per criterion: what would a marker have to see to give a good mark?"},
   {s:"Mark the example portfolio", d:"Same groups. Mark <a href=\"example.html\">the example portfolio</a> on the rubric: a band and a mark for each criterion, and one sentence of evidence for every number."},
   {s:"Compare the marks", d:"Every group’s marks go up on the board, then ours. Where you disagree, find the page that settles it."},
   {s:"The one thing to take away", d:"Everything the brief asked for is there, and almost none of it is evidenced. That gap is what this module is about."},
  ],
  between:"Choose three possible themes. Week 2 settles on one.",
  mistake:"Marking on how it looks. Two groups in three give the visual criterion the highest number and cannot say why.",
  stuck:[
   ["I can’t find OneDrive", "office.com, sign in with your university account, then OneDrive in the launcher. Not a personal Microsoft account."],
   ["Is this a real student?", "No. We wrote it. Nothing in it comes from anybody’s submission."],
  ]
 }
},
{
 n:2, title:"Composition and visual hierarchy",
 makes:["Example 2 marked","Theme locked","8 thumbnails"],
 shown:[
  {core:true, s:"Scale, weight, space — live", u:"https://interfaces.institute/stairwell/hierarchy/", take:"Changing one thing — size, weight, spacing — changes what gets read first. That is the whole of hierarchy."},
  {s:"Two focal points", u:"https://interfaces.institute/collections/bank-interfaces/", take:"You get one focal point per screen. Two costs the reader a moment, and that moment is what you write about in C2."},
  {core:true, s:"One app, four layouts", u:"https://interfaces.institute/patterns/four-layouts/", take:"A layout decides whose job comes first, and every other job waits. Say which job your screen puts first, and what it makes wait."},
  {s:"Recognition over recall", u:"https://interfaces.institute/stairwell/recognition/", take:"Recognising beats remembering. Show the option rather than expecting someone to recall it."},
  {s:"Affordance", u:"https://interfaces.institute/stairwell/affordance/", take:"If nothing says which parts are clickable, people click the wrong things. Criterion 2 is where that is marked."},
 ],
 three:[
  {t:"Example 2, marked", d:"A band, a mark and a line of evidence for each criterion — sent through the form."},
  {t:"Your theme, locked", d:"Part A §1 filled in: theme, audience and your goal. Need longer? Week 3 — the later you change it, the more you redo."},
  {t:"A first piece of work in your deck", d:"Eight rough thumbnails of one screen, photographed onto B1’s slide. Pick the one you would build before week 3.", open:true},
 ],
 workshop:{
  aim:"Mark the complete example, lock your theme, and put a first piece of work in your deck.",
  out:{"sec": ["A1", "B1", "C1"]},
  maybe:["D1"],   /* worth starting now if the goal is clear; no week owns the appendices */
  bring:"A4 paper and a thick marker · your three possible themes",
  run:[
   {s:"Mark Example 2, alone first", d:"Open <a href=\"example-council.html\">the complete example</a> and <a href=\"rubric.html\">the blank rubric</a>. Alone: a band, a mark and one sentence of evidence for each criterion, then one overall mark."},
   {s:"Send your marks", d:"Through the form on <a href=\"examples.html#portfolios\">Examples</a>. The class average goes up beside our marks after the workshop; nobody sees whose is whose."},
   {s:"Compare in fours", d:"Read your marks aloud. Wherever you are more than a band apart, find the slide that settles it."},
   {s:"What makes it complete, and what stops it being a First", d:"As a room: what does it have that the week 1 portfolio did not? And why is it not a First?"},
   {s:"Choose your theme", d:"Fill in <code>A1</code>: your theme, your audience, and your goal, the one thing a person is trying to get done. Then <code>C1</code>, while the decision is fresh; and if you can, start <code>D1</code> with screenshots of how people do it today."},
   {s:"Eight thumbnails", d:"Draw the one screen your goal needs most, eight ways, markers only. Photograph all eight onto <code>B1</code>’s slide today."},
  ],
  between:"Pick the thumbnail you would build. Not sure of your theme yet? <a href=\"ideas.html\">Theme ideas</a>.",
  mistake:"Marking on looks. This one is well designed: the marks turn on what it evidences, and on where it stops.",
  stuck:[
   ["It looks finished. Isn’t it a First?", "Look at C5 and C6: strong design, its claims asserted rather than measured, and its hardest question answered in a sentence."],
   ["My mark is far from the others", "Good, that is the exercise. Find the slide that would change your mind, or theirs."],
   ["Out of ideas at four thumbnails", "Normal. Move one thing and redraw."],
   ["Can I use Figma?", "Not for the thumbnails: on paper you get eight in the time Figma gets you one."],
  ]
 }
},
{
 n:3, title:"The grid",
 makes:["Layout spec → Part A §3","C2 drafted"],
 shown:[
  {core:true, s:"One menu, four grids", u:"https://interfaces.institute/patterns/four-grids/", take:"A grid decides how much fits. Choose the grid for your content, not for the look."},
  {core:true, s:"One website, every grid", u:"https://interfaces.institute/patterns/every-grid/", take:"Twelve columns divide by two, three, four and six; sixteen will not take a row of three. Choose a count that divides the way your content does."},
  {s:"Published layout grids — one page, four stops", u:"https://interfaces.institute/collections/grids/", take:"A grid is a handful of numbers decided once: columns, gutter, margin, max width and a spacing scale. Yours go in A3 today."},
 ],
 three:[
  {t:"Your theme, locked", d:"If it was not already: A1 filled in, and the goal at the top of A2."},
  {t:"Your seven numbers", d:"Part A §3 filled in from the grid deck’s last slide. Nothing says “about” or “roughly”."},
  {t:"C2 started", d:"Once your numbers are set: what you want read first, quoting three of them.", open:true},
 ],
 workshop:{
  aim:"Know what each layout number means. Then, if you have a theme, set your own; if you do not, find one.",
  out:{"sec": ["A1", "A3", "C2"]},
  run:[
   {s:"Play with the grid deck", d:"Open <a href=\"grid-numbers.html\">A grid in seven numbers</a> and push every slider to its extremes. One slide per number, using Example 2’s A3."},
   {s:"Got a theme? Measure a real site’s grid", d:"Pick a website from your theme and measure its max width, margin and breakpoints, then count the columns at each breakpoint: <a href=\"toolkit.html#measure\">Toolkit › Measure a website</a> shows how. Set your own numbers on <a href=\"grid-numbers.html#s9\">the deck’s last slide</a>, copy them into A3, and say what you kept from the site and why."},
   {s:"No theme yet? Find one", d:"Press the button on <a href=\"ideas.html\">Theme ideas</a> until one is something you would use, change one thing so it is yours, and copy it into A1. Then start A3 from Example 2’s numbers."},
   {s:"Write C2, if your numbers are set", d:"One slide: what you want read first on your main screen, and the grid that makes it happen. Quote three numbers from <code>A3</code>."},
  ],
  between:"Fill in every box of <code>A3</code>.",
  mistake:"Copying Example 2’s numbers without asking whether they suit your screens. Start from them; then change them.",
  stuck:[
   ["What are the seven numbers?", "The first slide of <a href=\"grid-numbers.html\">the grid deck</a> lists them, one slide each after that."],
   ["How many columns?", "Four on a phone is common. On a bigger screen, a number your content divides into: 8 or 12."],
   ["Does it have to be 8px?", "No. Consistent, and written down."],
  ]
 }
},
{
 n:4, title:"Type, colour and the grid: one visual system",
 makes:["Layout, type and colour → Part A §3–5","A first style tile","C3 and C4 drafted"],
 shown:[
  {core:true, s:"Gallery: grids, type and colour", u:"gallery.html", take:"Choose one of each, write them down, use them everywhere, and say why."},
  {core:true, s:"One example: the bakery, for type, colour and grid", u:"case-bakery.html#s16", take:"Every number in a spec has a reason, and the reason names a person: who reads it, where, on what. That is what C3 and C4 are made of."},
  {s:"Style kit — what are we fixing?", u:"style-kit.html", take:"Grid, type and colour are one set of decisions. Made once and written down, they make every screen match — even when the screen is drawn in boxes."},
  {s:"Contrast, live", u:"https://interfaces.institute/collections/design-tools/#pairs", take:"Anything under 4.5:1 gets changed. That is the one colour rule nobody can argue with."},
  {s:"What a published scale actually does", u:"https://interfaces.institute/collections/type-scales/", take:"<b>None of the five is geometric</b>: the ratio between steps wanders in every one. Name your sizes and what each is for, rather than claiming a ratio."},
  {s:"Two paragraphs", u:"https://written.institute/laboratory/#measure", take:"Line length is the problem more often than the font is. If your text is hard to read, the column is too wide."},
  {s:"Families have jobs", u:"https://written.institute/typologies/", take:"Families have jobs. One for headings, one for reading — and say why in C3."},
  {s:"What four systems ship, measured", u:"https://interfaces.institute/collections/palettes/", take:"Every colour these systems publish <i>as text</i> passes 4.5:1; <b>six of the sixteen they publish as fills fail</b>. A fill is not a text colour."},
 ],
 three:[
  {t:"Part A §3–5 filled in", d:"Every row a number. A5 has a ratio for every text pair, none under 4.5:1."},
  {t:"A first style tile", d:"Your three screens from the style kit, in your own words, pasted into B3."},
  {t:"C3 and C4 drafted", d:"Why this type and why these colours, quoting the numbers.", open:true},
 ],
 workshop:{
  aim:"See how three redesigns decided their type, colour and grid — then decide yours, write them into Part A §3–5, and see them on your own screens.",
  out:{"sec": ["A3", "A4", "A5", "B3", "C3", "C4"]},
  bring:"Paper for the six questions",
  run:[
   {s:"Study one case, in pairs", d:"Your tutor gives each pair one case: <a href=\"case-missed-bin.html#s16\">the missed bin</a>, <a href=\"case-railcard.html#s16\">the Railcard</a> or <a href=\"case-short-course.html#s16\">the Welsh course</a>. Answer <a href=\"examples.html#questions\">the six questions</a> on paper; most answers are on slide 16."},
   {s:"Check-in: your tutor comes round", d:"One question: <b>show me one row in the redesign’s A4 or A5, and tell me why it is that number.</b>"},
   {s:"Swap: one pair from each case", d:"Join two pairs who read the other cases. Between you: <b>which change makes the biggest difference, and what number shows it?</b>"},
   {s:"Choose your three", d:"In the <a href=\"gallery.html\">Gallery</a>, choose a grid, a typeface and a palette for your audience, and <b>Copy all four</b> into A3, A4, A5 and C9. Change any number you like, and write down why."},
   {s:"A first style tile", d:"The <a href=\"style-kit.html\">Style kit</a> already has what you chose. Type in your own words, screenshot the three screens and paste them into <code>B3</code>."},
   {s:"Check-in: before you leave", d:"Your tutor looks at A3, A4 and A5: <b>is every row a number, does every text pair pass, and what did you change, and why?</b>"},
   {s:"Write C3 and C4", d:"One slide each: why this type and these colours suit your audience, quoting numbers from A4 and A5. What you changed from the Gallery, and why, is the strongest line you can write."},
  ],
  between:"If any text pair in A5 fails, fix it and copy A5 again.",
  mistake:"Choosing by look alone. Choose for your audience, then check the numbers.",
  stuck:[
   ["Which case should I study?", "The one your tutor gives your pair. You hear about the other two in the swap."],
   ["I missed weeks 3 and 4", "Start here. The Gallery gives you a complete A3, A4 and A5 in one sitting, with sources."],
   ["Do I have to use the Gallery?", "No. Your own choices and any tool are fine; the Gallery shows what a complete answer looks like."],
   ["My brand colour fails", "Darken it until it passes, or keep it for large text and decoration only."],
   ["Where do I cite the fonts and grid?", "C9. The Gallery and the Style kit write the references for you."],
  ]
 }
},
{
 n:5, title:"The journey: what are we fixing?",
 makes:["The journey before → Part A §2","The journey, mapped → B4","The before, captured → D1","C7 drafted"],
 shown:[
  {core:true, s:"Before and after: the painful one", u:"case-bakery.html", take:"The before is evidence, even when it is a message thread. Count it — channels, messages, days — and every count becomes a line in C5 and D2."},
  {core:true, s:"Before and after: the okay one", u:"case-missed-bin.html", take:"A service can look fine and still fail its users. The problems are in the order of things — which is what A2 and B4 are for."},
  {s:"Before and after: the Railcard", u:"case-railcard.html", take:"Ask what decides everything first."},
  {s:"Before and after: a Welsh course", u:"case-short-course.html", take:"Use your user’s words; explain the service’s where they appear."},
  {s:"The Flow maker", u:"flow.html", take:"A list hides where people get stuck. A map shows it: the loop back to step 3, the dead end at the phone line."},
  {s:"How flows work", u:"flow-guide.html", take:"A question on a form is a step unless the answer sends people somewhere different. Waits are not steps, but they are counted."},
  {s:"The same hue, different meanings", u:"https://symbolic.institute/collections/colour-associations/", take:"Same hue, different meaning depending on where you are. That is your cross-cultural consideration, and it is markable."},
  {s:"Traffic colour", u:"https://symbolic.institute/visual-grammar/traffic-colour/", take:"Colour means different things in different places. Pick one such difference and write it into C7 today — the brief asks for it by name."},
 ],
 three:[
  {t:"Your journey before, counted and mapped", d:"Part A §2: the goal and every step people take now, with the count — and the same steps drawn as a flow in B4."},
  {t:"The before, captured", d:"D1: one screenshot or photo per step, numbered to match A2."},
  {t:"C7 drafted", d:"One cross-cultural consideration, specific to your service.", open:true},
 ],
 workshop:{
  aim:"Find out what your design has to fix: the goal, every step people take now, counted, mapped and captured.",
  out:{"sec": ["A2", "B4", "D1", "C7"]},
  bring:"Access to the service you are improving · paper and a marker, if you draw your flow by hand",
  run:[
   {s:"Walk one case, in pairs", d:"Walk the <a href=\"case-bakery.html\">bakery’s</a> <i>now</i> slides: for each red number, say what it costs the customer. Then: which green number fixes which red one?"},
   {s:"Write the goal, then the before", d:"Into <code>A2</code>: your goal, then every step people take now, the website, the form, the call, the messages. No service yet? The before is how people manage without one."},
   {s:"Count it", d:"Steps, taps, fields, messages, days waiting, dead ends. A number, not an adjective: “199 words before you can start”, not “too much text”."},
   {s:"Learn the parts of a flow", d:"Read Part 1 of <a href=\"flow-guide.html#now\">How flows work</a>, and do its first test."},
   {s:"Map it", d:"Draw the same steps in the <a href=\"flow.html\">Flow maker</a>, mark where people get stuck, and <b>Download the slide for B4</b>. Paper, photographed, is just as good."},
   {s:"Capture it", d:"Screenshot or photograph every step into <code>D1</code>, numbered to match A2. Chats need the owner’s permission, with everyone else’s name and number blurred."},
   {s:"Write C7", d:"One slide on one cross-cultural consideration that is real for your service: colour meaning, reading direction, names and dates, language or icons."},
  ],
  between:"Finish <code>D1</code> while you can still reach the before.",
  mistake:"Describing the before instead of counting it.",
  stuck:[
   ["There is no website for my idea", "Then the before is how people manage now: <a href=\"toolkit.html#no-service\">When there’s no service yet</a>. The bakery case is exactly that."],
   ["Can I screenshot a real service?", "Yes, for your appendix, credited. Blur anyone’s personal details."],
   ["What counts as a step?", "Anything the person has to do or wait for: a page, a tap, a call, a reply. <a href=\"flow-guide.html#step\">How flows work</a> has more."],
  ]
 }
},
{
 n:6, title:"Contemporary tools, and working with AI",
 makes:["Style tile","Mood board","AI log → Part A §7"],
 shown:[
  {core:true, s:"Generate one, live", u:"https://interfaces.institute/collections/generated/", take:"A generator makes something competent in a minute. It cannot decide anything, and the deciding is what is marked."},
  {core:true, s:"Now check it against a spec", u:"https://interfaces.institute/collections/design-tools/#pairs", take:"Generated work still has to obey the numbers you declared in A3–A5. Check it against them."},
  {s:"Three variants, one prompt", u:"https://interfaces.institute/collections/generated/", take:"Three variants from one prompt is a useful exercise. Judging all three against your own spec is the assessable part."},
  {s:"What the log looks like", u:"assessment.html", take:"A7 is the record of what you used. C8 is what you make of it — was it any good, whose work is it, what did you change."},
 ],
 three:[
  {t:"Mood board and style tile", d:"B2 and B3, built only from numbers you already declared."},
  {t:"Your AI log open", d:"A7 started and C8 drafted — one line per use, from today on."},
  {t:"The style tile finished", d:"Everything you build in week 8 comes out of it.", open:true},
 ],
 workshop:{
  aim:"A style tile that obeys your own numbers, and your AI log opened.",
  out:{"sec": ["A7", "B2", "B3", "C8"]},
  bring:"Whatever AI tools you use",
  run:[
   {s:"Mood board, fast", d:"Fifteen images on one page: the feeling you are aiming at. Generated images are welcome; each one gets a line in <code>A7</code>."},
   {s:"Style tile", d:"Finish the tile you started in week 4: type scale, palette with roles, spacing, and a button, a field and a card. Every value from your own A3–A5."},
   {s:"Open the AI log", d:"Start <code>A7</code> today, one line for every AI use; you will not remember them in January. Not sure what is allowed? <a href=\"toolkit.html#ai\">Using AI</a>."},
   {s:"Optional: ask for feedback on your deck", d:"Put your name on the feedback list, and Mike will go through the deck in your shared folder. Feedback comes back over the next few weeks, and week 10 is where you act on it."},
   {s:"Write C8", d:"Eighty words on the AI you used: was it any good, whose work is it, and what did you change? If you used none, say why."},
  ],
  between:"Finish your style tile: week 8 builds from it.",
  mistake:"Leaving the log until January.",
  stuck:[
   ["What goes on a style tile?", "Type scale, colours with roles, spacing, three components. One page."],
   ["The AI made something better than mine", "Good. Log it, then make it obey your numbers."],
   ["Does asking for feedback change my mark?", "No. It is optional, and nothing about it is marked."],
  ]
 }
},
{
 n:7, title:"UX basics and screen states",
 makes:["Your screens → Part A §2","Your flow, after → B4","C6 drafted"],
 shown:[
  {s:"Empty, and not an error", u:"https://interfaces.institute/patterns/empty-states/", take:"An empty state is a working system with nothing in it yet. It says what goes here and offers the action that puts something there. Some of your screens will have one."},
  {core:true, s:"The five states", u:"https://interfaces.institute/stairwell/state/", take:"Four of the five states look identical when nobody designs them. Empty, loading, error and offline are screens, and they belong in A2."},
  {s:"Now the good pane", u:"https://interfaces.institute/stairwell/state/", take:"An empty state is not an error and should not apologise. It should offer the action that fills it."},
  {core:true, slides:"PassReady", s:"PassReady: the worst-day screens", u:"passready.html", take:"Not knowing and not being sure are states too. Each needs its own words and a next step, or the screen pretends to a certainty it has not earned."},
  {s:"Feedback", u:"https://interfaces.institute/stairwell/feedback/", take:"A button that says nothing while it works gets pressed twice. That is a real cost, not a style point."},
  {s:"A flow, drawn crudely", u:"https://interfaces.institute/collections/flow-census/", take:"Each of your screens gets a job in under ten words. If two share a job, they are one screen — merge them."},
  {slides:"Room finder", s:"A finder, taken apart", u:"room-finder/index.html", take:"Information architecture is the order people find things in: a hierarchy to browse and a search to jump. Both need an answer for “nothing here”."},
 ],
 three:[
  {t:"The journey, both ways", d:"Part A §2 — the goal, the steps people take now, and your screens, counted."},
  {t:"Your flow beside the before, and C6", d:"Your version drawn next to week 5’s map in B4, and the ethics paragraph drafted."},
  {t:"The two you build first", d:"Decide before week 8, when every screen gets wireframed.", open:true},
 ],
 workshop:{
  aim:"The screens of your version, the states you forgot, and a flow somebody else can follow.",
  out:{"sec": ["A2", "B4", "C6"]},
  bring:"Your B4 from week 5",
  run:[
   {s:"Your journey, after", d:"Open <code>A2</code>: the goal and the before are there. Now list the screens of your version."},
   {s:"Give each screen a job", d:"A job in under ten words, starting with a verb. Two screens with the same job are one screen."},
   {s:"The states check", d:"For each screen: what does it look like empty, loading, and when it fails? This usually adds one or two screens."},
   {s:"Make your flow from the before", d:"Read Part 2 of <a href=\"flow-guide.html#after\">How flows work</a>. Then in the <a href=\"flow.html\">Flow maker</a> press <b>Start from my “now”</b>, change it into your version, download <b>Both</b> for <code>B4</code>, and copy <b>What happened</b> into <code>D2</code>."},
   {s:"Swap flows", d:"Can your partner get from the start to the goal without asking you? If not, an arrow is missing."},
   {s:"Write C6", d:"Ninety words on one dimension, ethics or sustainability. The empty, loading and error screens you just found are an ethics answer."},
  ],
  between:"Nothing new. Week 8 builds from your screen list and your grid.",
  mistake:"Forgetting empty and error screens. They are half of week 9.",
  stuck:[
   ["I only have four screens", "Add the states. Empty, error and done are screens."],
   ["I have fifteen", "Which two share a job? Cross one out. Repeat."],
   ["What’s a job?", "What someone came to this screen to do. One verb."],
  ]
 }
},
{
 n:8, title:"Wireframe to screen",
 makes:["A wireframe for every screen","First 2 screens finished"],
 shown:[
  {core:true, s:"One control, drawn eight times", u:"https://interfaces.institute/components/button/", take:"A wireframe is an argument about priority. Boxes and labels only — if you are choosing a font, stop."},
  {s:"What sixty-three systems ship", u:"https://interfaces.institute/components/button/", take:"Twenty of sixty-three measured design systems use no corner radius at all. Whatever you choose, choose it rather than default to it."},
  {s:"Nobody agrees what to call anything", u:"https://interfaces.institute/collections/component-census/", take:"Eight influential systems cannot agree what to call a component. Name yours consistently and say so in A2."},
  {core:true, s:"Lorem ipsum versus real content", u:"https://interfaces.institute/collections/flow-census/#placeholder", take:"Real content changes the layout. Wireframe with the words you will actually use."},
 ],
 three:[
  {t:"A wireframe for every screen", d:"B5 — drawn against your own grid, one per screen in Part A §2."},
  {t:"Two finished screens", d:"The first two of B6, built for real in the room."},
  {t:"The rest of your screens", d:"Every remaining screen of the journey, finished — the biggest piece of work in the module, due at the start of week 9.", open:true},
 ],
 workshop:{
  aim:"Every screen wireframed, and the first two built for real.",
  out:{"sec": ["B5", "B6"]},
  bring:"Paper printed with your grid · markers · a laptop for the last half hour",
  run:[
   {s:"Watch one drawn", d:"Your tutor wireframes one screen live: boxes and labels, no colour, no fonts, no icons."},
   {s:"Wireframe the set", d:"Every screen of your journey on your own grid, quick rather than polished. Start with the boring screen."},
   {s:"The blind test", d:"Cover your labels and hand the set to a partner. Any screen whose job they cannot name, redraw now."},
   {s:"Build the first two", d:"Turn your two most important wireframes into finished screens from A3, A4, A5 and your style tile: the first two of <code>B6</code>. <a href=\"style-kit.html#fidelity\">Levels of finish</a> shows what finished means."},
   {s:"Photograph the set", d:"<code>B5</code> complete, and the first two screens of <code>B6</code> in the deck."},
  ],
  between:"Finish every screen of your journey (<code>B6</code>) before week 9: the whole of week 9 works on them. If your feedback has arrived, read it.",
  mistake:"Decorating. A wireframe that took an hour is a mockup and is worth less here.",
  stuck:[
   ["How detailed?", "Boxes and labels. If you are choosing a font, stop."],
   ["My grid doesn’t fit", "Then fix the grid and update <code>A3</code>. That is allowed, and honest."],
   ["Can I do it in Figma?", "Paper is faster, and you need a whole set."],
  ]
 }
},
{
 n:9, title:"Adaptation and access",
 makes:["Access audit → Part A §6","C5 drafted","Other sizes, if you need them"],
 shown:[
  {core:true, s:"Every size a screen has been", u:"https://interfaces.institute/collections/screen-sizes/", take:"A phone gained twenty times the pixels between 2007 and 2023, but only 1.23 times the room: 320 to 393 CSS pixels. Design in CSS pixels."},
  {s:"What a breakpoint is for", u:"https://interfaces.institute/collections/grids/#breakpoints", take:"Of 67 published grids, only nine say how they change across sizes: some change the column count, some only the width. Both are decisions."},
  {s:"Target size, measured", u:"https://interfaces.institute/components/button/", take:"Forty-two of sixty-three shipped buttons are under 44px. Yours has a measured minimum and it goes in A6."},
  {s:"Fitts, both panes", u:"https://interfaces.institute/stairwell/fitts/", take:"A target that is hard to hit is a design failure you can measure. That measurement belongs in C5."},
  {s:"Colour is not a cue on its own", u:"https://interfaces.institute/collections/wcag/", take:"Colour on its own is not a cue. Add a shape or a word, and say why in C5."},
  {core:true, s:"Tab through a real page", u:"https://interfaces.institute/collections/keyboard-grammar/#tabstops", take:"Tab through your own screens. If you cannot see where you are, neither can anyone using a keyboard."},
 ],
 three:[
  {t:"Other sizes, only if you need them", d:"B7 is optional. A better flow is worth more than more screens."},
  {t:"An honest audit", d:"Part A §6 filled in, C5 drafted, every failure written down."},
  {t:"The fixes, and the log", d:"Fix what the audit found and log each fix. The log is what is marked.", open:true},
 ],
 workshop:{
  aim:"Six images and an honest audit — on screens that arrived finished.",
  out:{"sec": ["A6", "B7", "C5"]},
  bring:"Every finished screen of your journey",
  run:[
   {s:"Screens out, first thing", d:"Every screen of your journey, finished, in front of you: this is <code>B6</code>, and today works on it."},
   {s:"Other sizes, only if you need them", d:"Only if your journey is used on more than one size of screen. At the smaller size, decide what to remove, not what to shrink."},
   {s:"Run the checklist over everything", d:"Contrast, target size, focus and non-colour cues, on every screen. Write down every failure you find, fixed or not."},
   {s:"Fill in A6", d:"Your minimum touch target, focus state and non-colour cues, taken from your own screens."},
  ],
  between:"Fix what the audit found, and log each fix.",
  mistake:"Fixing failures without logging them. The log is what is marked.",
  stuck:[
   ["Everything fits, I just made it smaller", "What would you remove? If nothing, the big one is empty."],
   ["I found ten failures", "Good. Log ten, fix three. Better than finding none."],
   ["Do I need to fix everything?", "No. You need to find it and say so."],
  ]
 }
},
{
 n:10, title:"Justifying a decision",
 makes:["Click-through → Part B §8","Part C rewritten"],
 shown:[
  {core:true, s:"Two paragraphs, same design", take:"Describing a design and defending one are different activities. Only one of them is marked."},
  {s:"Name the difference", u:"assessment.html", take:"The difference is a number you produced yourself. Every C section quotes one."},
  {core:true, s:"All nine sections", u:"assessment.html", take:"All eight C sections were drafted in the week each decision was made. Today they turn from description into defence."},
  {s:"A building correcting itself", u:"https://interfaces.institute/updates/", take:"Admitting a limit with evidence is the top band, not a weakness. That is what Criterion 4 rewards."},
 ],
 three:[
  {t:"A click-through that works", d:"B8 — the journey clicks through, start to finish, checked in the PDF."},
  {t:"Eight sections that defend", d:"Each one quotes a number from Part A and names something you rejected."},
  {t:"One read-aloud pass", d:"Before week 11: a sentence with no number in it is costing you marks.", open:true},
 ],
 workshop:{
  aim:"Eight drafted sections turned from description into defence, and a click-through that works.",
  out:{"sec": ["B8", "D2", "D3"]},
  run:[
   {s:"Mark your own deck", d:"Mark it on <a href=\"rubric.html\">the blank rubric</a>, the way you marked the examples. Your lowest criterion is where today goes."},
   {s:"Act on your feedback", d:"Had feedback from week 6? Go through it point by point: fix what you agree with, and say what you changed in the section it belongs to. No feedback? Use your own rubric marks the same way."},
   {s:"Read two sections aloud", d:"Read two of your C sections to a partner. Their only job: does each one describe, or defend?"},
   {s:"Turn description into defence", d:"Rewrite <code>C1</code>–<code>C8</code> so each quotes a number from Part A, names what you rejected, and says what is still wrong. Not more words: different ones."},
   {s:"Link your screens: your prototype", d:"Link every step to the next, plus a way back and a way out. PowerPoint: <b>Insert › Link › Place in This Document</b>; Google Slides: <b>Insert › Link › Slides in this presentation</b>. Over a pasted picture, link a rectangle with no fill and no outline, and put a <b>Start the prototype →</b> link on <code>B8</code>."},
   {s:"Export a test PDF, and click it", d:"Export the deck as a PDF, open it in a browser, and click every link. A link that works in the editor can vanish in the export, and the PDF is what is marked."},
   {s:"Before and after", d:"Check every step in <code>D2</code> has a why, then fill <code>D3</code>: your two most changed screens, before beside after."},
  ],
  between:"Read your C sections aloud once more. Any sentence without a number is the next thing to fix.",
  mistake:"Writing about how it feels. Feelings have no number attached.",
  stuck:[
   ["I don’t know what to cite", "Open your Part A and read your own numbers. It is always there."],
   ["My answer will not fit on one slide", "Cut the description. Keep the number and the reason."],
  ]
 }
},
{
 n:11, title:"Submission", dead:true,
 makes:["References → Part C §9","Submit"],
 shown:[
 ],
 three:[
  {t:"C9, your references", d:"Everything you cited, listed — Cite Them Right Harvard."},
  {t:"The PDF uploaded", d:"Exported from your deck, with the confirmation saved."},
  {t:"Nothing carried forward", d:"The quiet week. Submit by Friday 8 January, 21:00, and you are done."},
 ],
 workshop:{
  aim:"References written, PDF assembled, everyone submits.",
  out:{"sec": ["C9", "D4"]},
  bring:"Your PDF",
  run:[
   {s:"C9, the reference list", d:"List everything you cited in <code>C9</code>. It is the easiest section in Part C, and the one most often missing."},
   {s:"D4, your AI statement", d:"Say whether you used AI. If you did: which tools, for what, where in the deck, and why. If not, one line: No AI was used. <a href=\"toolkit.html#ai\">Using AI in this module</a>."},
   {s:"Assemble the PDF", d:"Export, open the PDF, and click every link one last time. Then <a href=\"assessment.html#handin\">hand it in</a>."},
   {s:"Drop in, if you need to", d:"No teaching: export problems, Moodle, last read-throughs. If your work is done, submit and go."},
  ],
  between:"Submit, if you have not.",
  mistake:"Leaving the export to the last hour. It is always bigger than you think.",
  stuck:[
   ["My PDF is 400MB", "Export at 150dpi."],
   ["Moodle rejected it", "Size limit. Same fix."],
  ]
 }
}
];
