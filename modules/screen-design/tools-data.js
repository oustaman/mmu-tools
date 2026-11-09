/* Every tool, guide and set of slides on this site, by the deck sections it helps fill. The Toolkit
   lists them by group; the checklist puts each one beside the sections it helps with.
   An item: [name, address, kind (explore, collect, check, make), sections, what it does, ours]. */
const TOOL_GROUPS = [
  { id: 'build', h: 'Use these tools to build your assessment', sub: 'Each one makes something you can copy straight into your deck.', items: [
    ['Flow maker', 'flow.html', 'make', ['B4', 'A2', 'D2'], 'Your journey as a 16:9 slide for B4. List what people do now and mark where they get stuck (week 5). Then make your version from a copy: remove, merge, move, rename and add screens (week 7). It labels what happened to every step, which is your D2, and counts both journeys.', true],
    ['Screen maker', 'screen-maker.html', 'make', ['B5', 'B6', 'B7'], 'Wireframes from ready-made blocks that snap into rows, at phone or desktop size. Type your own words, share what every screen has in common, then copy each screen into your deck or print the set. Sketching counts just the same.', true],
    ['Style kit', 'style-kit.html', 'make', ['A3', 'A4', 'A5', 'B3', 'C9'], 'Pick a grid, type and colour from published systems, see them on three screens in your own words, and copy A3, A4, A5 and the references. Includes what bad choices look like.', true],
    ['Gallery: grids, type and colour', 'gallery.html', 'make', ['A3', 'A4', 'A5', 'B3', 'C9'], 'Grids, typefaces and palettes from published design systems, each with its numbers and its source. Click one of each and copy A3, A4, A5 and the references, then build your B3 style tile from them.', true],
  ]},
  { id: 'layout', h: 'Layout and grids', sub: 'For A3 — columns, gutter, margin, max width, spacing scale.', items: [
    ['A grid in seven numbers', 'grid-numbers.html', 'explore', ['A3', 'C2'], 'What columns, gutter, margin, max width, breakpoints and a spacing scale mean, each with a live screen. The last slide sets your own and copies them for A3.', true],
  ]},
  { id: 'make', h: 'Sketches, mood boards, flows and screens', sub: 'For B1–B8 — use whatever you are comfortable with.', items: [
    ['PowerPoint or Google Slides', 'assessment.html', 'make', ['B1', 'B2', 'B3', 'B6', 'B8'], 'Your deck is already a design tool: screens as slides, linked into a click-through. No new software needed.'],
    ['How flows work', 'flow-guide.html', 'explore', ['B4', 'D2'], 'What each part of a flow means, with a real example from the four cases: step, wait, stuck, yes/no question, back to a step; then kept, merged, moved, removed and new. Two short self-tests. Read it before the Flow maker.'],
    ['Organisms', 'organisms.html', 'explore', ['B5'], 'Every block in the Screen maker at full size, with its code, size, job and the screens it usually turns up on.'],
    ['Paper organisms', 'paper/paper-organisms.pdf', 'make', ['B5'], 'The same blocks to print, cut out and stick onto a screen. A4, at 100%: each piece carries its code, so a paper screen can be rebuilt in the Screen maker.'],
    ['Twenty kinds of screen', 'paper/paper-cheatsheet.pdf', 'explore', ['A2', 'B5'], 'A cheatsheet: what each kind of screen does, and the organisms it is usually made of. A good place to start when you have a job but no layout.'],
  ]},
  { id: 'refs', h: 'Evidence and references', sub: 'For D1–D3 and C9 — the before, the competitors, and where your claims come from.', items: [
    ['Before and after', 'examples.html#before-after', 'collect', ['A2', 'C5', 'D1', 'D2', 'D3'], 'Four real and made-up services walked step by step: what is wrong now, measured, and the same job improved — with what a marker would credit.', true],
  ]},
  { id: 'more', h: 'Guides and slides', sub: 'Short reads and slides from class, by the section they help with.', items: [
    ['Theme ideas', 'ideas.html', 'explore', ['A1', 'C1'], 'Starting points if you have not picked a project yet.', true],
    ['Contrast checker', 'gallery.html#check', 'check', ['A5', 'C4'], 'Two colour codes in, the contrast ratio out, with pass or fail.', true],
    ['Colour and type speak first', 'type-colour.html', 'explore', ['A4', 'A5', 'C3', 'C4'], 'Week 4 slides: what colour and type say before anyone reads a word.', true],
    ['Thinking in wireframes', 'wireframes.html', 'explore', ['B5'], 'Week 5 slides: one whole journey, wireframed screen by screen.', true],
    ['Levels of finish', 'style-kit.html#fidelity', 'explore', ['B6'], 'How finished your screens need to be.', true],
    ['Who finds it hard', 'workshop.html?w=9', 'explore', ['A6', 'C5'], 'Week 9 slides: your screens through other people’s eyes.', true],
    ['Linking your slides', 'weeks.html?w=10#workshop', 'make', ['B8'], 'Week 10: link every screen to the next, then test the PDF.', true],
    ['Using AI', 'toolkit.html#ai', 'explore', ['A7', 'C8', 'D4'], 'What is allowed, and how to log it as you go.', true],
  ]},
];
