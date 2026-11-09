"""One-off, kept for the record: the November 2026 rewire. Wireframing starts in week 5, by sketching or in
the Screen maker, carries on through week 7 and is checked and built from in week 8. B5's due week does not move."""
import sys
root = sys.argv[1]

def edit(path, pairs):
    s = open(root + '/' + path).read()
    for a, b in pairs:
        assert s.count(a) == 1, (path, s.count(a), a[:90])
        s = s.replace(a, b)
    open(root + '/' + path, 'w').write(s)

edit('weeks-data.js', [
  # ── week 5
  (' n:5, title:"The journey: what are we fixing?",\n makes:["The journey before → Part A §2","The journey, mapped → B4","The before, captured → D1","C7 drafted"],',
   ' n:5, title:"The journey, and your first wireframes",\n makes:["The journey before → Part A §2","The journey, mapped → B4","The before, captured → D1","First wireframes → B5","C7 drafted"],'),
  ('''  {core:true, s:"Before and after: the painful one", u:"case-bakery.html", take:"The before is evidence, even when it is a message thread. Count it — channels, messages, days — and every count becomes a line in C5 and D2."},
  {core:true, s:"Before and after: the okay one", u:"case-missed-bin.html", take:"A service can look fine and still fail its users. The problems are in the order of things — which is what A2 and B4 are for."},''',
   '''  {core:true, s:"Before and after: the painful one", u:"case-bakery.html", take:"The before is evidence, even when it is a message thread. Count it — channels, messages, days — and every count becomes a line in C5 and D2."},
  {core:true, slides:"Drawing a flow", s:"Drawing a flow", u:"flow-grammar.html", take:"A flow has six marks, each with one meaning. The ✗ marks matter most: they are the problems your design has to answer."},
  {core:true, slides:"Thinking in wireframes", s:"Thinking in wireframes: one whole journey", u:"wireframes.html", take:"A wireframe is an argument about priority: what is here, in what order, in what words. If you are choosing a font, stop."},'''),
  ('''  {t:"C7 drafted", d:"One cross-cultural consideration, specific to your service.", open:true},
 ],
 workshop:{
  aim:"Find out what your design has to fix: the goal, every step people take now, counted, mapped and captured.",
  out:{"sec": ["A2", "B4", "D1", "C7"]},
  bring:"Access to the service you are improving · paper and a marker, if you draw your flow by hand",''',
   '''  {t:"First wireframes, and C7 drafted", d:"Two or three screens that answer your worst problem, in B5. One cross-cultural consideration for C7.", open:true},
 ],
 workshop:{
  aim:"Find out what your design has to fix, then wireframe the first screens that fix it.",
  out:{"sec": ["A2", "B4", "D1", "B5", "C7"]},
  bring:"Access to the service you are improving · paper and a marker, if you sketch",'''),
  ('''   {s:"Learn the parts of a flow", d:"Read Part 1 of <a href=\\"flow-guide.html#now\\">How flows work</a>, and do its first test."},
   {s:"Map it", d:"Draw the same steps in the <a href=\\"flow.html\\">Flow maker</a>, mark where people get stuck, and <b>Download the slide for B4</b>. Paper, photographed, is just as good."},''',
   '''   {s:"Map it", d:"Draw the same steps in the <a href=\\"flow.html\\">Flow maker</a> with the six marks from <a href=\\"flow-grammar.html\\">Drawing a flow</a>, mark where people get stuck, and <b>Download the slide for B4</b>. Paper, photographed, is just as good. More detail, with a test: <a href=\\"flow-guide.html#now\\">How flows work</a>."},'''),
  ('''   {s:"Write C7", d:"One slide on one cross-cultural consideration that is real for your service: colour meaning, reading direction, names and dates, language or icons."},
  ],
  between:"Finish <code>D1</code> while you can still reach the before.",''',
   '''   {s:"Wireframe your worst ✗", d:"Which ✗ costs people the most? What two or three screens would answer it? Give each a job, then wireframe them, by sketching or in the <a href=\\"screen-maker.html\\">Screen maker</a>: boxes, labels, real words. <a href=\\"wireframes.html\\">Thinking in wireframes</a> walks through a whole journey."},
   {s:"The blind test", d:"Hand your screens to a partner. Can they say what each one is for, and what they would do next? Redraw any they cannot, and put the set in <code>B5</code>."},
  ],
  between:"Finish <code>D1</code> while you can still reach the before. Write <code>C7</code>: one slide on one cross-cultural consideration that is real for your service, such as colour meaning, reading direction, names and dates, language or icons.",'''),
  ('''   ["What counts as a step?", "Anything the person has to do or wait for: a page, a tap, a call, a reply. <a href=\\"flow-guide.html#step\\">How flows work</a> has more."],
''',
   '''   ["What counts as a step?", "Anything the person has to do or wait for: a page, a tap, a call, a reply. <a href=\\"flow-guide.html#step\\">How flows work</a> has more."],
   ["Should I sketch or use the Screen maker?", "Either: both count for B5. Sketch to try ideas quickly, and use the Screen maker when you know what you want."],
   ["My project is a website for big screens", "Use the Desktop setting in the Screen maker, or sketch it wide."],
'''),
  # ── week 6: the feedback offer, in the words of the announcement
  ('''   {s:"Optional: ask for feedback on your deck", d:"Put your name on the feedback list, and Mike will go through the deck in your shared folder. Feedback comes back over the next few weeks, and week 10 is where you act on it."},''',
   '''   {s:"Optional: ask for feedback on your deck", d:"Put your name on the feedback form by the end of week 7, and Mike will go through the deck in your shared folder and leave feedback right in it. It comes back over the following weeks, and week 10 is where you act on it."},'''),
  # ── week 7
  (' n:7, title:"UX basics and screen states",\n makes:["Your screens → Part A §2","Your flow, after → B4","C6 drafted"],',
   ' n:7, title:"UX basics and screen states",\n makes:["Your screens → Part A §2","Your flow, after → B4","The rest of your wireframes → B5","C6 drafted"],'),
  ('''  {core:true, slides:"PassReady", s:"PassReady: the worst-day screens", u:"passready.html", take:"Not knowing and not being sure are states too. Each needs its own words and a next step, or the screen pretends to a certainty it has not earned."},''',
   '''  {core:true, slides:"PassReady", s:"PassReady: the worst-day screens", u:"passready.html", take:"Not knowing and not being sure are states too. Each needs its own words and a next step, or the screen pretends to a certainty it has not earned."},
  {core:true, slides:"The rest of the organisms", s:"The rest of the organisms", u:"wireframes-2.html", take:"Sort them by what the person needs at that moment. Empty, loading and failed are screens too, and they need wireframes."},'''),
  ('''  {t:"The two you build first", d:"Decide before week 8, when every screen gets wireframed.", open:true},''',
   '''  {t:"The whole wireframe set", d:"Every screen, states included, sketched or in the Screen maker. Bring it to week 8.", open:true},'''),
  ('''  aim:"The screens of your version, the states you forgot, and a flow somebody else can follow.",
  out:{"sec": ["A2", "B4", "C6"]},''',
   '''  aim:"The screens of your version, the states you forgot, a flow somebody else can follow, and wireframes for all of it.",
  out:{"sec": ["A2", "B4", "B5", "C6"]},'''),
  ('''   {s:"Write C6", d:"Ninety words on one dimension, ethics or sustainability.''',
   '''   {s:"Wireframe the rest", d:"Every screen on your list, states included, by sketching or in the <a href=\\"screen-maker.html\\">Screen maker</a>. Start with the boring screen. <a href=\\"wireframes-2.html\\">The rest of the organisms</a> shows what to reach for."},
   {s:"Write C6", d:"Ninety words on one dimension, ethics or sustainability.'''),
  ('''  between:"Nothing new. Week 8 builds from your screen list and your grid.",''',
   '''  between:"Finish the wireframe set for <code>B5</code>, and decide which two screens you will build first: week 8 starts from them.",'''),
  # ── week 8
  ('''  {t:"A wireframe for every screen", d:"B5 — drawn against your own grid, one per screen in Part A §2."},''',
   '''  {t:"A wireframe for every screen", d:"B5 — sketched or from the Screen maker, one per screen in Part A §2."},'''),
  ('''  aim:"Every screen wireframed, and the first two built for real.",''', '''  aim:"Your wireframe set checked, and the first two screens built for real.",'''),
  ('''  bring:"Paper printed with your grid · markers · a laptop for the last half hour",''', '''  bring:"Your wireframes from weeks 5 and 7 · paper and markers · a laptop for the last half hour",'''),
  ('''   {s:"Watch one drawn", d:"Your tutor wireframes one screen live: boxes and labels, no colour, no fonts, no icons."},
   {s:"Wireframe the set", d:"Every screen of your journey on your own grid, quick rather than polished. Start with the boring screen."},''',
   '''   {s:"Finish the set", d:"Any screen of your journey without a wireframe yet, do it now: sketched or in the <a href=\\"screen-maker.html\\">Screen maker</a>, quick rather than polished. Boxes and labels, no colour, no fonts, no icons."},'''),
  ('''   {s:"Photograph the set", d:"<code>B5</code> complete, and the first two screens of <code>B6</code> in the deck."},''',
   '''   {s:"Into the deck", d:"Photograph your sketches, or <b>Copy as a picture</b> from the Screen maker: <code>B5</code> complete, and the first two screens of <code>B6</code> in the deck."},'''),
  ('''   ["Can I do it in Figma?", "Paper is faster, and you need a whole set."],''',
   '''   ["Can I do it in Figma?", "You can, but a pen or the Screen maker is faster, and you need a whole set."],
   ["Does the Screen maker use my grid?", "It uses its own rows and columns, and that is fine for B5. Your A3 numbers come back when you finish the screens in B6."],'''),
])

edit('sd-common.js', [
  ('''h:"Every screen of your journey wireframed: boxes and labels on your grid. Paper is fine."''',
   '''h:"Every screen of your journey wireframed: boxes and labels, sketched on paper or made in the <a href=\\"screen-maker.html\\">Screen maker</a>. Either counts."'''),
])

edit('toolkit.html', [
  ("""      ['draw.io', 'https://app.diagrams.net/',""",
   """      ['Screen maker', 'screen-maker.html', 'make', ['B5', 'B6', 'B7'], 'Wireframes from ready-made blocks that snap into rows, at phone or desktop size. Type your own words, share what every screen has in common, then copy each screen into your deck or print the set. Sketching counts just the same.', true],
      ['Organisms', 'organisms.html', 'explore', ['B5'], 'Every block in the Screen maker at full size, with its code, size, job and the screens it usually turns up on.'],
      ['Paper organisms', 'paper/paper-organisms.pdf', 'make', ['B5'], 'The same blocks to print, cut out and stick onto a screen. A4, at 100%: each piece carries its code, so a paper screen can be rebuilt in the Screen maker.'],
      ['Twenty kinds of screen', 'paper/paper-cheatsheet.pdf', 'explore', ['A2', 'B5'], 'A cheatsheet: what each kind of screen does, and the organisms it is usually made of. A good place to start when you have a job but no layout.'],
      ['draw.io', 'https://app.diagrams.net/',"""),
])

edit('screen-maker.html', [
  ("""<script src="paper/organisms.js"></script>""", """<script src="paper/organisms.js"></script>
<script src="paper/journeys.js"></script>"""),
])
s = open(root + '/screen-maker.html').read()
i = s.index("  const EXSET = () => ({ cur: 0, master: { pieces: [] }, screens: ["); j = s.index("  const EXAMPLE = () =>", i)
s = s[:i] + """  const EXSET = () => ({ cur: 0, master: { pieces: [] }, screens: window.JOURNEYS.bin.map((x, i, all) => ({ ...blank(x.name), kind: x.kind, job: x.job, goes: all[i + 1] ? all[i + 1].name : '',
    pieces: x.pieces.map(([o, r, t]) => piece(o, r, t ? { ...t } : null)) })) });
""" + s[j:]
s = s.replace("/* the example: the missed bin journey, one screen per step of the Flow maker's example */", "/* the example: the missed bin journey, as in the deck (paper/journeys.js) */")
open(root + '/screen-maker.html', 'w').write(s)
print('ok')
