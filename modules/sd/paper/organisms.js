/* Organisms: the units a screen is built from (atomic design: not a button, but "a question
   with its answers", "a search box with its filters"). Read by the print sheets and by the
   snap tool, so the two cannot disagree.

   The rules that make them interchangeable:
   - every organism is the full screen width, 375 px (90 mm in print);
   - every organism is a whole number of rows tall, a row being 56 px (13.4 mm in print);
   - a phone screen below its status bar is 784 px: exactly 14 rows.
   So any organism stacks flush under any other, and a screen is full at 14 rows.

   ARCHETYPES lists each kind of screen as the organisms it is usually built from, in order:
   the cheatsheet, the "where is this used" view and the tool's starting templates all come
   from that one list. Names follow "There Are Only Seventeen Screens" (M01–M17) and the
   module's own cases (J1–J3). Needs paper-kit.js first. */
(function () {
  const { u, C, T, box } = window.PAPER;
  const ROW = 56, ROWS = 14, W = 375;
  /* the box every organism draws into: full width, whole rows, 16 px side margins */
  const body = (inner, rows, cls = '') => `<div class="org-in ${cls}" style="height:${u(rows * ROW)}">${inner}</div>`;
  const stack = (...parts) => `<div class="org-stack">${parts.join('')}</div>`;
  const line = (w = '70%', h = 14) => `<span class="wl" style="flex:none;width:${w};height:${u(h)}"></span>`;
  const head = (t, s = 22) => `<div class="org-h">${T(t, s, 'font-weight:700')}</div>`;
  const opt = (shape) => `<div class="opt" style="height:${u(48)}"><i class="${shape}" style="width:${u(22)};height:${u(22)}"></i>${line('60%', 12)}</div>`;

  const O = [
    // ── top of the screen
    { id: 'appbar', fam: 'Top', name: 'App bar', does: 'Says where you are, with a way back.', rows: 1, edge: 1, draw: () => C.appbar('Title', true, '') },
    { id: 'appbar-search', fam: 'Top', name: 'App bar with search', does: 'Says where you are, with search one tap away.', rows: 2, edge: 1, draw: () => C.appbar('Title', false, '') + `<div class="org-pad">${C.search()}</div>` },
    { id: 'service-header', fam: 'Top', name: 'Service header', does: 'Names the service, with a menu.', rows: 1, edge: 1, draw: () =>
      `<div class="k appbar" style="height:${u(56)}"><i class="ico" style="width:${u(28)};height:${u(28)};border-radius:${u(6)}"></i>${T('Service name', 17, 'font-weight:700;flex:1')}${T('≡', 24)}</div>` },
    { id: 'progress-header', fam: 'Top', name: 'Progress header', does: 'A way back, and how far through a form you are.', rows: 1, edge: 1, draw: () =>
      `<div class="org-pad org-row">${T('‹ Back', 15, 'text-decoration:underline')}<span style="flex:1"></span>${C.progress('Step _ of _').replace('class="k prog"', `class="k prog" style="width:${u(150)}"`)}</div>` },
    // ── headings
    { id: 'page-title', fam: 'Headings', name: 'Page title', does: 'Says what this screen is, in a few words.', rows: 1, draw: () => head('Page title', 26) },
    { id: 'title-intro', fam: 'Headings', name: 'Title and intro', does: 'Says what this screen is, and the one thing to know first.', rows: 2, draw: () => stack(head('Title', 24), line('95%'), line('70%')) },
    { id: 'question', fam: 'Headings', name: 'Question with hint', does: 'Asks one question, with a hint if it needs one.', rows: 2, draw: () => stack(head('The question?', 24), T('A hint, if it helps', 14)) },
    // ── search
    { id: 'search', fam: 'Search', name: 'Search box', does: 'Finds things from a few typed words.', rows: 1, draw: () => C.search() },
    { id: 'search-filters', fam: 'Search', name: 'Search with filters', does: 'Finds things, then narrows the results.', rows: 2, draw: () => stack(C.search(), C.chips(4)) },
    { id: 'results-sort', fam: 'Search', name: 'Results count and sort', does: 'Says how many were found, and lets people reorder them.', rows: 1, draw: () =>
      `<div class="org-row">${T('12 results', 15)}<span style="flex:1"></span>${T('Sort ▾', 15, 'text-decoration:underline')}</div>` },
    // ── answers
    { id: 'text-field', fam: 'Answers', name: 'Text field', does: 'Collects one typed answer: a name, an email, a number.', rows: 2, draw: () => C.field('Label', 'Hint') },
    { id: 'radio-question', fam: 'Answers', name: 'One answer from a few', does: 'Asks a question with one answer from a short list.', rows: 4, draw: () => stack(head('The question?', 20), opt('rad'), opt('rad'), opt('rad')) },
    { id: 'checkbox-group', fam: 'Answers', name: 'Several answers', does: 'Asks a question where several answers can be true.', rows: 4, draw: () => stack(head('Select all that apply', 20), opt('chk'), opt('chk'), opt('chk')) },
    { id: 'yes-no', fam: 'Answers', name: 'Yes or no', does: 'Asks a question with only two answers.', rows: 2, draw: () => stack(head('The question?', 20),
      `<div class="row2">${['Yes', 'No'].map(t => `<div class="opt" style="height:${u(44)};width:${u(163)}"><i class="rad" style="width:${u(20)};height:${u(20)}"></i>${T(t, 15)}</div>`).join('')}</div>`) },
    { id: 'date-picker', fam: 'Answers', name: 'Date picker', does: 'Chooses a day from a month.', rows: 6, draw: () => C.calendar().replace(`style="width:${u(343)}"`, '') },
    { id: 'time-slots', fam: 'Answers', name: 'Time slots', does: 'Chooses a time from the ones still free.', rows: 2, draw: () => C.slots() },
    { id: 'postcode', fam: 'Answers', name: 'Postcode lookup', does: 'Finds an address from a postcode.', rows: 2, draw: () => stack(T('Postcode', 16, 'font-weight:600'),
      `<div class="row2"><div class="box" style="height:${u(48)};width:${u(200)}"></div>${box(127, 48, 'btn sec', T('Find address', 15, 'font-weight:600'))}</div>`) },
    { id: 'upload', fam: 'Answers', name: 'Upload a photo', does: 'Adds a photo or a file.', rows: 3, draw: () => stack(T('Add a photo', 16, 'font-weight:600'),
      `<div class="box upl" style="height:${u(104)}">${T('+', 26)}${T('Choose a photo', 14)}</div>`) },
    { id: 'consent', fam: 'Answers', name: 'Agree to terms', does: 'Asks people to agree before they go on.', rows: 2, draw: () => stack(
      `<div class="opt" style="height:${u(56)};align-items:flex-start;padding-top:${u(12)}"><i class="chk" style="width:${u(22)};height:${u(22)}"></i><span class="lt">${line('95%', 12)}${line('60%', 12)}</span></div>`,
      T('Read the terms', 14, 'text-decoration:underline')) },
    // ── content
    { id: 'list', fam: 'Content', name: 'List', does: 'Shows several things of one kind, each leading to more.', rows: 3, draw: () => C.rows(3).replace(/height:calc\(72 \* var\(--u\)\)/g, `height:${u(56)}`) },
    { id: 'card', fam: 'Content', name: 'Card', does: 'Shows one thing with its picture, title and detail.', rows: 4, draw: () => C.card(130) },
    { id: 'two-cards', fam: 'Content', name: 'Two cards', does: 'Shows two things side by side.', rows: 3, draw: () => C.cards2() },
    { id: 'image', fam: 'Content', name: 'Picture', does: 'Shows a picture: a labelled box is enough.', rows: 3, draw: () => C.img(152) },
    { id: 'detail', fam: 'Content', name: 'Detail', does: 'Tells everything important about one thing.', rows: 3, draw: () => stack(head('Name of the thing', 20), T('Price · place · date', 14), line('95%'), line('95%'), line('60%')) },
    { id: 'summary', fam: 'Content', name: 'Summary with Change links', does: 'Shows every answer back, each with a Change link.', rows: 4, draw: () => C.summary(4).replace(/height:calc\(64 \* var\(--u\)\)/g, `height:${u(52)}`) },
    { id: 'price', fam: 'Content', name: 'Price breakdown', does: 'Shows what something costs, and the total.', rows: 3, draw: () => stack(C.keyvals(2),
      `<div class="sr" style="height:${u(44)}">${T('Total', 16, 'font-weight:700;flex:1')}${T('£0.00', 16, 'font-weight:700')}</div>`) },
    { id: 'map', fam: 'Content', name: 'Map', does: 'Shows where things are.', rows: 6, edge: 1, draw: () => C.map(6 * ROW) },
    { id: 'player', fam: 'Content', name: 'Media player', does: 'Plays a video or a sound, with its controls.', rows: 6, draw: () => C.media(200) },
    { id: 'chat', fam: 'Content', name: 'Conversation', does: 'Shows a conversation, newest at the bottom.', rows: 6, draw: () => C.bubbles() },
    // ── feedback
    { id: 'error', fam: 'Feedback', name: 'Error summary', does: 'Says what went wrong, and how to fix it.', rows: 2, draw: () => C.error() },
    { id: 'success', fam: 'Feedback', name: 'Success panel', does: 'Says it worked, with a reference to keep.', rows: 3, draw: () => C.success('Done') },
    { id: 'notice', fam: 'Feedback', name: 'Notice', does: 'Gives one piece of information to know before going on.', rows: 2, draw: () => C.info() },
    { id: 'empty', fam: 'Feedback', name: 'Empty state', does: 'Says there is nothing here yet, and how to add something.', rows: 4, draw: () => stack(C.icon(56), head('Nothing here yet', 20), line('80%'), C.button('Add one', 'sec')) },
    { id: 'loading', fam: 'Feedback', name: 'Loading', does: 'Says something is on its way.', rows: 2, draw: () => stack(C.spinner(), `<div style="text-align:center">${T('Loading…', 14)}</div>`) },
    // ── actions and the bottom of the screen
    { id: 'button', fam: 'Actions', name: 'Main button', does: 'The one main action on the screen.', rows: 1, draw: () => C.button('Continue') },
    { id: 'button-link', fam: 'Actions', name: 'Button and link', does: 'The main action, and a way out.', rows: 2, draw: () => stack(C.button('Continue'), `<div style="text-align:center">${T('Cancel', 15, 'text-decoration:underline')}</div>`) },
    { id: 'two-buttons', fam: 'Actions', name: 'Two buttons', does: 'Back and next, side by side.', rows: 1, draw: () => C.btnrow('Back', 'Next') },
    { id: 'composer', fam: 'Actions', name: 'Message box', does: 'Writes and sends a message.', rows: 1, edge: 1, draw: () => C.inputbar() },
    { id: 'tabbar', fam: 'Actions', name: 'Tab bar', does: 'Moves between the main parts of an app. Always at the bottom.', rows: 1, edge: 1, bottom: 1, draw: () => C.tabbar(4).replace(`height:calc(64 * var(--u))`, `height:${u(56)}`) },
  ];
  /* The system: a code from the family (three letters, so it never looks like a deck section
     such as A3 or C4), numbered in order; and the size in px, always 375 wide. The codes and
     sizes are what the snap tool shows, so a paper mock-up can be rebuilt there piece by piece. */
  const FAM = { Top: 'TOP', Headings: 'HED', Search: 'SRC', Answers: 'ANS', Content: 'CON', Feedback: 'FBK', Actions: 'ACT' };
  const count = {};
  O.forEach(o => {
    count[o.fam] = (count[o.fam] || 0) + 1;
    o.code = `${FAM[o.fam]}-${String(count[o.fam]).padStart(2, '0')}`;
    o.h = o.rows * ROW;
    o.size = `${W} × ${o.h} px`;
  });
  const BY = Object.fromEntries(O.map(o => [o.id, o]));

  /* one organism, drawn at its real size; label: the small name and size in the corner */
  function organism(id, opts = {}) {
    const o = BY[id];
    const tag = opts.label === false ? '' : `<span class="org-tag"><b>${o.code}</b> ${o.name} · ${o.size}</span>`;
    return `<div class="org${o.edge ? ' edge' : ''}" data-org="${id}" style="width:${u(W)};height:${u(o.rows * ROW)}">${body(o.draw(), o.rows)}${tag}</div>`;
  }

  /* the screen canvas: a phone, its status bar, and 14 numbered row slots */
  function canvas(inner = '', opts = {}) {
    const slots = Array.from({ length: ROWS }, (_, i) => `<i style="height:${u(ROW)}"><b>${i + 1}</b></i>`).join('');
    /* the border sits outside the 375 px, so the inside is exactly as wide as an organism */
    return `<div class="canvas" style="width:calc(${W} * var(--u) + 1.2mm)">
      <div class="k status" style="height:${u(28)}">${T('9:41', 12)}${T('▮▮▮ ▰', 12)}</div>
      <div class="slots" style="height:${u(ROWS * ROW)}">${opts.slots === false ? '' : `<div class="slot-lines">${slots}</div>`}<div class="slot-fill">${inner}</div></div></div>`;
  }

  /* the kinds of screen, as recipes of organisms, top to bottom (each adds up to 14 rows or fewer) */
  const ARCHETYPES = [
    { id: 'M01', name: 'The Launch', does: 'Shows who the app is while it opens.', recipe: ['loading'] },
    { id: 'M02', name: 'The Gate', does: 'Lets people sign in, or make an account, before going further.', recipe: ['page-title', 'text-field', 'text-field', 'button-link', 'notice'] },
    { id: 'M03', name: 'The Permission Request', does: 'Asks to use location, camera or notifications, and says why.', recipe: ['image', 'title-intro', 'button-link'] },
    { id: 'M04', name: 'The Walkthrough', does: 'Explains the app in three or four panels before it starts.', recipe: ['image', 'title-intro', 'two-buttons'] },
    { id: 'M05', name: 'The Home Tab', does: 'Opens the app every time, and leads to everything else.', recipe: ['appbar-search', 'two-cards', 'list', 'tabbar'] },
    { id: 'M06', name: 'The List / Stream', does: 'Shows many things of one kind, to scroll through.', recipe: ['appbar', 'search-filters', 'list', 'list', 'tabbar'] },
    { id: 'M07', name: 'The Detail', does: 'Shows everything about one thing, and what you can do with it.', recipe: ['appbar', 'image', 'detail', 'price', 'button'] },
    { id: 'M08', name: 'The Player', does: 'Plays something, and keeps the person in control of it.', recipe: ['appbar', 'player', 'detail'] },
    { id: 'M09', name: 'The Map', does: 'Shows where things are, and how to get there.', recipe: ['appbar-search', 'map', 'list'] },
    { id: 'M10', name: 'The Compose / Create', does: 'Makes something new: a message, a post, a report.', recipe: ['appbar', 'text-field', 'text-field', 'image', 'button'] },
    { id: 'M11', name: 'The Form', does: 'Asks questions, best one at a time.', recipe: ['progress-header', 'radio-question', 'button'] },
    { id: 'M12', name: 'The Checkout', does: 'Takes payment, showing exactly what for, before anything is committed.', recipe: ['appbar', 'page-title', 'price', 'text-field', 'text-field', 'button'] },
    { id: 'M13', name: 'The Chat', does: 'Holds a conversation, newest message at the bottom.', recipe: ['appbar', 'chat', 'composer'] },
    { id: 'M14', name: 'The Search / Discover', does: 'Finds things from a few words.', recipe: ['search-filters', 'results-sort', 'list', 'list', 'tabbar'] },
    { id: 'M15', name: 'The Profile', does: 'Represents one person, place or thing, and what belongs to it.', recipe: ['appbar', 'image', 'detail', 'two-buttons', 'list'] },
    { id: 'M16', name: 'The Settings', does: 'Lets people choose how the app behaves.', recipe: ['appbar', 'page-title', 'checkbox-group', 'list'] },
    { id: 'M17', name: 'The System State', does: 'Says what is happening when there is nothing to show: empty, loading, offline, broken.', recipe: ['appbar', 'empty'] },
    { id: 'J1', name: 'The Start Page', does: 'Says what a service does and who it is for, with one way in.', recipe: ['service-header', 'title-intro', 'notice', 'button'] },
    { id: 'J2', name: 'Check Your Answers', does: 'Shows every answer back, each with a Change link, before anything is sent.', recipe: ['progress-header', 'page-title', 'summary', 'button'] },
    { id: 'J3', name: 'Done', does: 'Confirms it worked: a reference to keep, and what happens next.', recipe: ['service-header', 'success', 'title-intro', 'button-link'] },
  ];
  ARCHETYPES.forEach(a => { a.rows = a.recipe.reduce((s, id) => s + BY[id].rows, 0);
    if (a.rows > ROWS) console.warn(`${a.id} ${a.name}: ${a.rows} rows, more than ${ROWS}`);
    a.recipe.forEach(id => { if (!BY[id]) console.warn(`${a.id}: no organism ${id}`); }); });
  /* where each organism turns up */
  const USED = Object.fromEntries(O.map(o => [o.id, ARCHETYPES.filter(a => a.recipe.includes(o.id)).map(a => a.id)]));

  function screen(recipe, opts = {}) {
    return canvas(recipe.map(id => organism(id, { label: opts.label }).replace('class="org', `class="org${BY[id].bottom ? ' bottom' : ''}`)).join(''), { slots: opts.slots });
  }
  window.ORG = { ROW, ROWS, W, FAM, O, BY, organism, canvas, screen, ARCHETYPES, USED };
})();
