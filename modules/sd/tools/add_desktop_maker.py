"""One-off, kept for the record: gives screen-maker.html a desktop mode. Pieces gain a column and a
width (on a phone: column 0 of 1), so one set of rules places them on either device."""
import sys
p = sys.argv[1] + '/screen-maker.html'
s = open(p).read()

def rep(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:90])
    s = s.replace(a, b)

def block(start, stop, new):
    global s
    assert s.count(start) == 1 and s.count(stop) >= 1, (start[:60], stop[:60], s.count(start), s.count(stop))
    i = s.index(start); j = s.index(stop, i)
    s = s[:i] + new + s[j:]

# ── imports and basics
rep("const { O, BY, FAM, ROW, ROWS, organism, overlay, canvas, words, ARCHETYPES: A } = window.ORG;",
    "const { O, BY, FAM, ROW, ROWS, COLS, COLW, GUT, DW, dw, dx, organism, overlay, canvas, desk, words, ARCHETYPES: A } = window.ORG;")
rep("const KEY = 'sd-screens2', OLD = 'sd-screens1';", "const KEY = 'sd-screens3', V2 = 'sd-screens2';")
rep("""  const piece = (o, row, t) => ({ u: uid(), o, row, t: t || {} });""",
    """  const piece = (o, row, t, col = 0, span = 1) => ({ u: uid(), o, row, col, span, t: t || {} });""")

# ── a list of ids, stacked: on desktop, bars full width and everything else in a centred column
block("  /* a list of organism ids, stacked from a row, with a tab bar on the last row */",
      "  /* the example: the missed bin journey", """  /* a list of organism ids, stacked from a row, with a tab bar or footer on the last rows.
     On desktop the bars run full width and the rest sits in a centred column of 8: a phone
     recipe, adapted rather than stretched, for the student to change. */
  const DESKOF = { appbar: 'site-header', 'appbar-search': 'site-header', tabbar: null, keyboard: null, sheet: 'dialog' };
  const deskId = id => (id in DESKOF ? DESKOF[id] : id);
  const bleeds = o => o.fam === 'Top' || !!o.bottom;
  function stackUp(ids, start = 0) {
    let r = start; const out = [], d = isD(), list = (d ? ids.map(deskId).filter(Boolean) : ids).filter(id => !BY[id].over);
    const at = (id, row) => { const o = BY[id], b = bleeds(o); return piece(id, row, null, d && !b ? 2 : 0, d ? (b ? COLS : 8) : 1); };
    list.filter(id => !BY[id].bottom).forEach(id => { out.push(at(id, r)); r += BY[id].rows; });
    list.filter(id => BY[id].bottom).forEach(id => out.push(at(id, ROWS - BY[id].rows)));
    return out;
  }
  /* a phone set, as a first desktop set */
  function toDesk(x) {
    const y = JSON.parse(JSON.stringify(x));
    const conv = ps => ps.map(q => { const id = deskId(q.o); if (!id || BY[id].over) return null; const b = bleeds(BY[id]); return { ...q, o: id, col: b ? 0 : 2, span: b ? COLS : 8 }; }).filter(Boolean);
    y.master.pieces = conv(y.master.pieces);
    y.screens.forEach(k => { k.pieces = conv(k.pieces); if (BY[k.over] && BY[k.over].phone) { k.over = deskId(k.over) || ''; k.overT = {}; } });
    y.cur = Math.max(0, y.cur); return y;
  }

""")
rep("""  const EXAMPLE = () => ({ cur: 0, master: { pieces: [] }, screens: [""", """  const EXSET = () => ({ cur: 0, master: { pieces: [] }, screens: [""")
rep("""pieces: ps.map(([o, r, t]) => piece(o, r, t)) })) });
""", """pieces: ps.map(([o, r, t]) => piece(o, r, t)) })) });
  const EXAMPLE = () => { const set = EXSET(); return { device: 'phone', phone: set, desktop: toDesk(set) }; };
""")

# ── state: a phone set and a desktop set
block("  /* load: this version", "  const isM = () =>", """  /* Two sets of screens, a phone one and a desktop one, each with its own master; S is whichever
     is showing. A first visit starts blank. The example lives apart, under its own key, so trying
     it never touches the student's own screens. */
  const EXKEY = 'sd-screens3-example', MODE = 'sd-screens3-mode';
  const freshSet = () => ({ cur: 0, master: { pieces: [] }, screens: [blank()] });
  const fresh = () => ({ device: 'phone', phone: freshSet(), desktop: freshSet() });
  const tidySet = (x, d) => { if (!x || !Array.isArray(x.screens) || !x.screens.length) return null; x.master = x.master || { pieces: [] };
    [x.master, ...x.screens].forEach(k => { k.pieces = (k.pieces || []).filter(q => BY[q.o] && !BY[q.o].over && (d ? !BY[q.o].phone : !BY[q.o].desk));
      k.pieces.forEach(q => { if (d) { const b = bleeds(BY[q.o]); q.span = b ? COLS : (q.span > 1 ? q.span : BY[q.o].dspan); q.col = b ? 0 : (q.col || 0); } else { q.col = 0; q.span = 1; } }); }); return x; };
  const tidy = w => { if (!w) return null; if (w.screens) w = { device: 'phone', phone: w };
    const phone = tidySet(w.phone, false), desktop = tidySet(w.desktop, true); if (!phone && !desktop) return null;
    return { device: w.device === 'desktop' ? 'desktop' : 'phone', phone: phone || freshSet(), desktop: desktop || freshSet() }; };
  const load = k => { try { return tidy(JSON.parse(localStorage.getItem(k) || 'null')); } catch (e) { return null; } };
  let W = load(KEY) || load(V2) || fresh(), mode = 'mine';
  try { if (localStorage.getItem(MODE) === 'example') { mode = 'example'; W = load(EXKEY) || EXAMPLE(); } } catch (e) {}
  let S = W[W.device];
  function isD() { return W.device === 'desktop'; }

  let sel = null, hist = [], fut = [], flash = null;
""")
rep("""  const save = () => { try { localStorage.setItem(mode === 'example' ? EXKEY : KEY, JSON.stringify(S)); localStorage.setItem(MODE, mode); } catch (e) {} };""",
    """  const save = () => { W[W.device] = S; try { localStorage.setItem(mode === 'example' ? EXKEY : KEY, JSON.stringify(W)); localStorage.setItem(MODE, mode); } catch (e) {} };""")
rep("""  function switchTo(m, state) { save(); mode = m; S = state; hist = []; fut = []; sel = null; render(); }""",
    """  function switchTo(m, state) { save(); mode = m; W = state; S = W[W.device]; hist = []; fut = []; sel = null; renderPal(); render(); }
  function setDevice(d) { if (d === W.device) return; save(); W.device = d; S = W[d]; hist = []; fut = []; sel = null; peeked = null; renderPal(); render(); tell(d === 'desktop' ? 'Desktop screens.' : 'Phone screens.'); }""")

# ── rows, and now columns
block("  /* ── rows ── */", "  /* ── the list of organisms ── */", """  /* ── rows and columns ── */
  const masterOn = s => s !== S.master && s.useMaster !== false;
  const fixed = s => masterOn(s) ? S.master.pieces : [];
  const colsNow = () => isD() ? COLS : 1;
  const spanOf = o => isD() ? (bleeds(o) ? COLS : o.dspan) : 1;
  const end = p => p.row + BY[p.o].rows;
  const overlaps = (a, b) => a.row < end(b) && b.row < end(a) && a.col < b.col + b.span && b.col < a.col + a.span;
  const clashes = s => s.pieces.filter(p => fixed(s).some(m => overlaps(p, m)));
  const everyPiece = s => fixed(s).concat(s.pieces);
  /* which rows have anything in them */
  function rowMap(s) { const m = Array(ROWS).fill(null); everyPiece(s).forEach(p => { for (let r = p.row; r < end(p) && r < ROWS; r++) m[r] = p; }); return m; }
  const isFree = (s, t, skip) => everyPiece(s).every(q => q === skip || !overlaps(t, q));
  /* the first place a piece fits, reading down the rows; on desktop, its preferred column first */
  function firstFit(s, o, span, from = 0, pref = 0) {
    const rows = o.rows, top = colsNow() - span;
    for (let r = from; r + rows <= ROWS; r++) for (const c of [pref, ...Array.from({ length: top + 1 }, (_, i) => i)]) {
      if (c < 0 || c > top) continue;
      if (isFree(s, { o: o.id, row: r, col: c, span })) return { row: r, col: c };
    }
    return null;
  }
  const allFits = s => s.pieces.every(p => end(p) <= ROWS && p.col + p.span <= colsNow()) && everyPiece(s).every((p, i, a) => a.every((q, j) => j <= i || !overlaps(p, q)));
  /* put p at a row and column; anything in the way moves down below it, if there is room */
  function place(s, p, r, c = p.col) {
    const rows = BY[p.o].rows; r = Math.max(0, Math.min(r, ROWS - rows)); c = Math.max(0, Math.min(c, colsNow() - p.span));
    const t = { ...p, row: r, col: c }, fx = fixed(s), wall = fx.concat(s.pieces.filter(q => q !== p && pinned(q.o)));
    const hit = wall.find(m => overlaps(t, m));
    if (hit) return fx.includes(hit) ? `Those rows cross the master's ${BY[hit.o].name}. Choose other rows, or switch the master off for this screen.`
      : `${BY[hit.o].code} ${BY[hit.o].name} stays where it is, so there is no room there. Choose other rows.`;
    const done = wall.concat([t]), moves = [];
    for (const x of s.pieces.filter(q => q !== p && !pinned(q.o)).map(q => ({ ...q, ref: q })).sort((a, b) => a.row - b.row)) {
      let h; while ((h = done.find(m => overlaps(x, m)))) x.row = end(h);
      if (end(x) > ROWS) return `There is no room: that would push ${BY[x.o].name} past row ${ROWS}. Remove something, or choose other rows.`;
      done.push(x); moves.push(x);
    }
    moves.forEach(x => { x.ref.row = x.row; }); p.row = r; p.col = c; return '';
  }
  const topEnd = s => everyPiece(s).filter(p => BY[p.o].fam === 'Top').reduce((m, p) => Math.max(m, end(p)), 0);

  function add(id, at, atCol) {
    const s = cur(), o = BY[id];
    if (o.over) {
      if (isM()) { say('Overlays go on a screen, not on the master.'); return; }
      snap(); s.over = id; s.overT = {}; render(); say(`${o.code} ${o.name} lies over this screen and takes no rows. One overlay at a time: a new one replaces it.`); return;
    }
    const before = JSON.stringify(S), span = spanOf(o), p = piece(id, 0, null, 0, span); let err = '';
    const centre = Math.floor((colsNow() - span) / 2);
    if (at != null && !pinned(id)) { p.col = atCol == null ? centre : atCol; s.pieces.push(p); err = place(s, p, at, p.col); }
    else if (o.bottom) { s.pieces.push(p); err = place(s, p, ROWS - o.rows, 0); }
    else if (o.fam === 'Top') { const r = topEnd(s); s.pieces.push(p); err = place(s, p, r, 0); }
    else {
      const sp = s.pieces.find(q => q.u === sel) || fixed(s).find(q => q.u === sel);
      const pref = sp && !bleeds(BY[sp.o]) && sp.col + span <= colsNow() ? sp.col : centre;
      const f = firstFit(s, o, span, sp ? end(sp) : topEnd(s), pref) || firstFit(s, o, span, 0, pref);
      if (!f) err = `${o.code} ${o.name} needs ${plural(o.rows, 'row')}, and no gap on this screen is that tall${isD() ? ' and wide' : ''}. Remove or move something first.`;
      else { p.row = f.row; p.col = f.col; s.pieces.push(p); }
    }
    if (err) { S = JSON.parse(before); say(err); render(); return; }
    keep(before); sel = p.u; flash = p.u; say(''); render(); tell(`${o.name} added: rows ${p.row + 1} to ${end(p)}.`);
  }

""")

# ── the list: built for the device showing
block("  const STARTERS = [", "  $('filter').oninput", """  const STARTERS = () => ['appbar', 'page-title', 'question', 'text-field', 'radio-question', 'list', 'card', 'notice', 'button', 'tabbar'].map(id => (isD() ? { appbar: 'site-header', tabbar: 'footer' }[id] || id : id));
  const sizeOf = o => o.over || !isD() ? o.size : `${bleeds(o) ? DW : dw(o.dspan)} × ${o.h} px`;
  const item = o => `<div class="sm-item" role="button" tabindex="0" draggable="true" data-id="${o.id}"
      data-q="${esc((o.code + ' ' + o.name + ' ' + o.does).toLowerCase())}"><b>${o.code}</b>${esc(o.name)}
      <small class="px">${sizeOf(o)} · ${plural(o.rows, 'row')}${isD() && !o.over ? `, ${spanOf(o)} columns` : ''}</small><small>${esc(o.does)}</small></div>`;
  function renderPal() {
    const here = o => (isD() ? !o.phone : !o.desk), q = $('filter').value = '';
    $('pal').innerHTML = `<details class="sm-fam sm-start" open><summary>Start with these<span>${STARTERS().length}</span></summary>
    <p class="sm-p" style="margin:0 0 8px">The ones most screens are made of. Everything else is in the groups below.</p>${STARTERS().map(id => item(BY[id])).join('')}</details>` +
    Object.keys(FAM).map(f => `<details class="sm-fam" data-fam="${f}"><summary>${FNAME[f]}<span>${FAM[f]} · ${O.filter(o => o.fam === f && here(o)).length}</span></summary>` +
    (f === 'Own' ? '<p class="sm-p" style="margin:0 0 8px">For an organism the set does not have: a note in its place, saying what it would be. Pick the height you need.</p>' : '') +
    (f === 'Overlay' ? '<p class="sm-p" style="margin:0 0 8px">These lie over the screen and take no rows, one at a time.</p>' : '') +
    O.filter(o => o.fam === f && here(o)).map(item).join('') + '</details>').join('');
  }
""")

# ── the picture beside the list; on desktop it floats beside the narrower list
block("  function peek(it) {", "  const unpeek = () => {};", """  function peek(it) {
    const o = BY[it.dataset.id], pk = $('peek'), d = isD() && !o.over; if (peeked === o.id) { if (isD()) pk.classList.add('on'); return; } peeked = o.id;
    pk.classList.add('on');
    const span = d ? spanOf(o) : 0, frame = d ? (bleeds(o) && span === COLS ? DW : dw(span)) : (o.desk ? dw(o.dspan) : 375);
    const room = isD() ? 430 : pk.clientWidth - 2, un = Math.min(1, room / frame);
    pk.innerHTML = `<div class="pk-in full${d ? ' desk' : ''}${o.over ? ' ov' : ''}" style="width:${frame * un + 2}px">${organism(o.id, { label: false, span: d ? span : 0 })}</div>
      <h3><b>${o.code}</b>${esc(o.name)}</h3><span class="px">${sizeOf(o)} · ${plural(o.rows, 'row')}</span><p>${esc(o.does)}</p>
      ${window.ORG.USED[o.id].length ? `<p>Usually on: ${window.ORG.USED[o.id].map(id => esc(AN[id])).join(', ')}</p>` : ''}`;
    pk.style.setProperty('--u', un + 'px');
    words(pk);
    if (isD()) { const r = it.getBoundingClientRect(), pr = $('pal').getBoundingClientRect(); pk.style.left = (pr.right + 22) + 'px'; pk.style.top = Math.max(70, Math.min(r.top - 8, innerHeight - pk.offsetHeight - 10)) + 'px'; }
  }
""")
rep("  const unpeek = () => {};", "  const unpeek = () => { if (isD()) { $('peek').classList.remove('on'); peeked = null; } };")
rep("""  $('pal').addEventListener('focusin', e => { const it = e.target.closest('.sm-item'); if (it) peek(it); });
""", """  $('pal').addEventListener('focusin', e => { const it = e.target.closest('.sm-item'); if (it) peek(it); });
  $('pal').addEventListener('mouseleave', unpeek); $('pal').addEventListener('focusout', unpeek);
""")

# ── drawing a screen
block("  function screenHTML(s, opts = {}) {", "  /* the words typed into a piece", """  function screenHTML(s, opts = {}) {
    const mine = s.pieces, fx = fixed(s), bad = new Set(clashes(s).map(p => p.u)), d = isD();
    const lab = (p, m) => `${BY[p.o].code} ${BY[p.o].name}, rows ${p.row + 1} to ${end(p)}${d && !bleeds(BY[p.o]) ? `, columns ${p.col + 1} to ${p.col + p.span}` : ''}${m ? ', from the master' : ''}${bad.has(p.u) ? ', crosses the master' : ''}`;
    const where = p => { if (!d) return ''; const b = bleeds(BY[p.o]); return b ? 'left:0;width:100%' : `left:calc(${dx(p.col)} * var(--u));width:calc(${dw(p.span)} * var(--u))`; };
    const one = (p, m) => `<div class="sm-p2${m ? ' m' : ' s'}${p.u === sel && opts.edit ? ' sel' : ''}${bad.has(p.u) ? ' clash' : ''}" data-u="${p.u}"${m ? ' data-m="1"' : ''}
      ${opts.edit ? `tabindex="0" role="group" aria-label="${esc(lab(p, m))}"` : ''} style="top:calc(${p.row * ROW} * var(--u));${where(p)}">${organism(p.o, { label: opts.label, span: d ? (bleeds(BY[p.o]) ? COLS : p.span) : 0 })}${opts.edit && d && !m && !pinned(p.o) ? '<span class="sm-rz" aria-hidden="true" title="Drag to change the width"></span>' : ''}</div>`;
    const inner = fx.map(p => one(p, true)).join('') + mine.map(p => one(p, false)).join('')
      + (opts.edit && !mine.length && !fx.length ? '<p class="sm-empty">Click an organism on the left, or drag one here.</p>' : '')
      + (s.over ? overlay(s.over, fx.concat(mine).filter(p => end(p) === ROWS).map(p => p.o), opts.edit ? '<button type="button" class="sm-ovx" data-do="rm-over" aria-label="Remove the overlay">✕</button>' : '', { label: opts.label }) : '');
    return (d ? desk : canvas)(inner, { slots: opts.slots !== false });
  }
""")
rep("""    const ps = fixed(s).concat(s.pieces).slice().sort((a, b) => a.row - b.row);""", """    const ps = fixed(s).concat(s.pieces).slice().sort((a, b) => a.row - b.row || a.col - b.col);""")
rep("""    const big = biggestGap(s);
    document.querySelectorAll('.sm-item').forEach(el => el.classList.toggle('nofit', !BY[el.dataset.id].over && !pinned(el.dataset.id) && BY[el.dataset.id].rows > big));""",
    """    document.querySelectorAll('.sm-item').forEach(el => { const o = BY[el.dataset.id]; el.classList.toggle('nofit', !o.over && !pinned(o.id) && !firstFit(s, o, spanOf(o))); });""")

# ── the tools
block("  /* the tools beside the selected piece */", "  const removeSel =", """  /* the tools beside the selected piece: to its right on a phone, above it on desktop */
  function renderTools() {
    const s = cur(), t = $('tools'), p = s.pieces.find(q => q.u === sel), mp = !p && fixed(s).find(q => q.u === sel);
    const el = sel && $('canvas').querySelector(`[data-u="${sel}"]`);
    if ((!p && !mp) || !el) { t.style.display = 'none'; return; }
    const off = $('cwrap').getBoundingClientRect(), r = el.getBoundingClientRect();
    const b = q => q === false ? '' : ' disabled', pin = p && pinned(p.o);
    t.style.display = 'flex';
    t.innerHTML = mp ? `<button type="button" data-do="to-master" aria-label="Go to the master" title="Go to the master">M</button>`
      : `<button type="button" class="hd" data-do="drag" aria-label="Drag to move" title="Drag to move"${b(pin)}>⠿</button>
        <button type="button" data-do="up" aria-label="Move up a row" title="Up a row"${b(pin)}>↑</button>
        <button type="button" data-do="down" aria-label="Move down a row" title="Down a row"${b(pin)}>↓</button>
        ${isD() ? `<button type="button" data-do="left" aria-label="Move a column left" title="A column left"${b(pin)}>←</button>
        <button type="button" data-do="right" aria-label="Move a column right" title="A column right"${b(pin)}>→</button>
        <button type="button" data-do="thin" aria-label="Narrower by a column" title="Narrower"${b(pin)}>−</button>
        <button type="button" data-do="wide" aria-label="Wider by a column" title="Wider"${b(pin)}>+</button>` : ''}
        <button type="button" data-do="rm" aria-label="Remove" title="Remove">✕</button>`;
    if (isD() && innerWidth > 1060) { t.style.left = (r.left - off.left) + 'px'; const above = r.top - off.top - 42; t.style.top = (above >= 0 ? above : r.bottom - off.top + 6) + 'px'; }
    else { t.style.left = ''; t.style.top = (r.top - off.top) + 'px'; }
  }
  /* up and down: into an empty row, or past the piece next to it */
  let refocus = false;
  const tell = t => { $('sr').textContent = ''; setTimeout(() => { $('sr').textContent = t; }, 30); };
  const where = p => isD() && !bleeds(BY[p.o]) ? `rows ${p.row + 1} to ${end(p)}, columns ${p.col + 1} to ${p.col + p.span}` : `rows ${p.row + 1} to ${end(p)}`;
  const moved2 = p => { refocus = document.activeElement && document.activeElement.classList.contains('sm-p2'); render(); tell(`${BY[p.o].name}: ${where(p)}`); };
  function nudge(d) {
    const s = cur(), p = s.pieces.find(q => q.u === sel); if (!p || pinned(p.o)) return;
    const rows = BY[p.o].rows, nr = p.row + d; if (nr < 0 || nr + rows > ROWS) return;
    const t = { ...p, row: nr }, hit = everyPiece(s).filter(q => q !== p && overlaps(t, q));
    const stuck = hit.find(q => fixed(s).includes(q) || pinned(q.o));
    if (stuck) { say(`${BY[stuck.o].name} stays where it is.`); return; }
    const before = JSON.stringify(S);
    if (!hit.length) p.row = nr;
    else if (d < 0) { const err = place(s, p, Math.min(...hit.map(q => q.row)), p.col); if (err) { S = JSON.parse(before); say(err); render(); return; } }
    else { const top = p.row, h = Math.max(...hit.map(q => BY[q.o].rows)); hit.forEach(q => { q.row = top; }); p.row = top + h;
      if (!allFits(s)) { S = JSON.parse(before); const q = cur().pieces.find(x => x.u === sel); const err = place(cur(), q, nr, q.col); if (err) { S = JSON.parse(before); say(err); render(); return; } } }
    keep(before); moved2(cur().pieces.find(x => x.u === sel));
  }
  /* left and right, narrower and wider: desktop only, and only into empty columns */
  function sideways(dc, ds) {
    const s = cur(), p = s.pieces.find(q => q.u === sel); if (!isD() || !p || pinned(p.o)) return;
    const col = p.col + dc, span = p.span + ds;
    if (col < 0 || span < 2 || col + span > COLS) return;
    if (!isFree(s, { ...p, col, span }, p)) { say(`Something is in the way. Move it first, or use another row.`); return; }
    snap(); p.col = col; p.span = span; moved2(p);
  }
""")
rep("""    if (b.dataset.do === 'up') nudge(-1); if (b.dataset.do === 'down') nudge(1); if (b.dataset.do === 'rm') removeSel();""",
    """    if (b.dataset.do === 'up') nudge(-1); if (b.dataset.do === 'down') nudge(1); if (b.dataset.do === 'rm') removeSel();
    if (b.dataset.do === 'left') sideways(-1, 0); if (b.dataset.do === 'right') sideways(1, 0); if (b.dataset.do === 'thin') sideways(0, -1); if (b.dataset.do === 'wide') sideways(0, 1);""")

# ── dragging, in two directions, and by the right edge to change the width
block("  /* dragging a piece: by its body", "  /* ── the side: this screen, or the master ── */", """  /* dragging a piece: by its body (not its words) or by ⠿, snapping to rows and, on desktop,
     columns; by its right edge, to change its width */
  function startDrag(e, p, rz) { drag = { p, x0: e.clientX, y0: e.clientY, row0: p.row, col0: p.col, span0: p.span, rz, on: false }; moved = false; }
  $('canvas').addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.isContentEditable || e.target.closest('button')) return;
    const w = e.target.closest('.sm-p2.s'); if (!w) return;
    const p = cur().pieces.find(q => q.u === w.dataset.u); if (!p || pinned(p.o)) return;
    const rz = e.target.classList.contains('sm-rz'); if (rz) { e.preventDefault(); if (sel !== p.u) select(p.u); }
    startDrag(e, p, rz);
  });
  $('tools').addEventListener('pointerdown', e => { if (!e.target.closest('[data-do="drag"]')) return; const p = cur().pieces.find(q => q.u === sel); if (p) { e.preventDefault(); startDrag(e, p); } });
  const scale = () => $('canvas').querySelector('.slots').getBoundingClientRect().width / DW;
  function ghostAt(row, rows, col, span, bleed) {
    const g = $('ghost'), sl = $('canvas').querySelector('.slots').getBoundingClientRect(), off = $('cwrap').getBoundingClientRect();
    g.style.display = 'block'; g.style.top = (sl.top - off.top + row * rowPx()) + 'px'; g.style.height = (rows * rowPx()) + 'px';
    if (isD() && !bleed) { g.style.left = (sl.left - off.left + dx(col) * scale()) + 'px'; g.style.width = (dw(span) * scale()) + 'px'; g.style.right = 'auto'; }
    else { g.style.left = (sl.left - off.left) + 'px'; g.style.width = sl.width + 'px'; g.style.right = 'auto'; }
  }
  addEventListener('pointermove', e => {
    if (!drag) return;
    const dx1 = e.clientX - drag.x0, dy = e.clientY - drag.y0; if (!drag.on && Math.abs(dy) < 6 && Math.abs(dx1) < 6) return;
    if (!drag.on) { drag.on = true; moved = true; const el = $('canvas').querySelector(`[data-u="${drag.p.u}"]`); if (el) el.classList.add('drag'); }
    const rows = BY[drag.p.o].rows, step = isD() ? (COLW + GUT) * scale() : 1;
    if (drag.rz) { drag.span = Math.max(2, Math.min(COLS - drag.col0, drag.span0 + Math.round(dx1 / step))); drag.to = drag.row0; drag.toCol = drag.col0; }
    else { drag.span = drag.span0; drag.to = Math.max(0, Math.min(ROWS - rows, drag.row0 + Math.round(dy / rowPx()))); drag.toCol = isD() ? Math.max(0, Math.min(COLS - drag.span0, drag.col0 + Math.round(dx1 / step))) : 0; }
    ghostAt(drag.to, rows, drag.toCol, drag.span);
  });
  addEventListener('pointerup', () => {
    if (!drag) return; const d = drag; drag = null; $('ghost').style.display = 'none';
    if (!d.on) return;
    setTimeout(() => { moved = false; }, 0);
    if (d.to === d.row0 && d.toCol === d.col0 && d.span === d.span0) { render(); return; }
    const before = JSON.stringify(S); d.p.span = d.span;
    const err = place(cur(), d.p, d.to, d.toCol);
    if (err) { S = JSON.parse(before); say(err); } else { keep(before); sel = d.p.u; say(''); }
    render();
  });
  /* dragging an organism in from the list */
  let fromPal = null;
  $('pal').addEventListener('dragstart', e => { const it = e.target.closest('.sm-item'); if (!it) return; fromPal = it.dataset.id; unpeek(); e.dataTransfer.setData('text/plain', BY[fromPal].code); e.dataTransfer.effectAllowed = 'copy'; });
  const dropAt = (e, o) => { const sl = $('canvas').querySelector('.slots').getBoundingClientRect(), span = spanOf(o);
    const row = Math.max(0, Math.min(ROWS - o.rows, Math.round((e.clientY - sl.top) / rowPx() - o.rows / 2)));
    const col = isD() ? Math.max(0, Math.min(COLS - span, Math.round(((e.clientX - sl.left) / scale() - dw(span) / 2 - dx(0)) / (COLW + GUT)))) : 0;
    return { row, col, span }; };
  $('cwrap').addEventListener('dragover', e => { if (!fromPal) return; e.preventDefault(); const o = BY[fromPal]; if (o.over || pinned(fromPal)) return; const a = dropAt(e, o); ghostAt(a.row, o.rows, a.col, a.span); });
  $('cwrap').addEventListener('dragleave', e => { if (!$('cwrap').contains(e.relatedTarget)) $('ghost').style.display = 'none'; });
  $('cwrap').addEventListener('drop', e => { e.preventDefault(); $('ghost').style.display = 'none'; if (!fromPal) return; const id = fromPal; fromPal = null; const o = BY[id];
    if (o.over || pinned(id)) add(id); else { const a = dropAt(e, o); add(id, a.row, a.col); } });
  document.addEventListener('dragend', () => { fromPal = null; $('ghost').style.display = 'none'; });

""")

# the form: fields in groups, so desktop can lay them in two columns; and a way to start desktop from phone
rep("""      <label for="f-name">Name</label><input id="f-name" placeholder="e.g. Your postcode and address" value="${esc(s.name)}">
      <label for="f-kind">Kind of screen</label><select id="f-kind">${kindOpts(s.kind)}</select>
      <div class="sm-recipe">""", """      ${fromPhone}
      <div class="fg"><label for="f-name">Name</label><input id="f-name" placeholder="e.g. Your postcode and address" value="${esc(s.name)}"></div>
      <div class="fg"><label for="f-job">Job of this screen</label><input id="f-job" placeholder="The one thing it does for the person" value="${esc(s.job)}"></div>
      <div class="fg"><label for="f-kind">Kind of screen</label><select id="f-kind">${kindOpts(s.kind)}</select>
      <div class="sm-recipe">""")
rep("""<br><button type="button" class="sm-b xs" data-act="recipe" style="margin-top:4px">Use these${s.pieces.length ? ' (replaces this screen)' : ''}</button>` : ''}</div>
      <label for="f-job">Job of this screen</label><input id="f-job" placeholder="The one thing it does for the person" value="${esc(s.job)}">
      <label for="f-goes">Goes to</label><input id="f-goes" list="names" placeholder="The next screen" value="${esc(s.goes)}">
      <datalist id="names">${S.screens.filter(x => x !== s && x.name).map(x => `<option value="${esc(x.name)}">`).join('')}</datalist>""",
    """<br><button type="button" class="sm-b xs" data-act="recipe" style="margin-top:4px">Use these${s.pieces.length ? ' (replaces this screen)' : ''}</button>` : ''}</div></div>
      <div class="fg"><label for="f-goes">Goes to</label><input id="f-goes" list="names" placeholder="The next screen" value="${esc(s.goes)}">
      <datalist id="names">${S.screens.filter(x => x !== s && x.name).map(x => `<option value="${esc(x.name)}">`).join('')}</datalist></div>""")
rep("""    const a = AK[s.kind], c = clashes(s).length;""", """    const a = AK[s.kind], c = clashes(s).length;
    const empty = x => x.screens.length === 1 && !x.screens[0].pieces.length && !x.master.pieces.length;
    const fromPhone = isD() && empty(S) && !empty(W.phone) ? `<p class="sm-msg" style="grid-column:1/-1">You have phone screens. Start your desktop set from them? They arrive in a centred column for you to adapt, not just stretched.
      <br><button type="button" class="sm-b xs" data-act="fromphone" style="margin-top:6px">Start from my phone screens</button></p>` : '';""")

# the strip: desktop tiles are shown on the desktop set's own master
rep("""  /* ── copy as a picture""", """  /* ── copy as a picture""")

# links carry both sets
rep("""    const raw = new TextEncoder().encode(JSON.stringify({ v: 2, master: S.master, screens: S.screens }));""",
    """    save(); const raw = new TextEncoder().encode(JSON.stringify({ v: 3, ...W }));""")
block("      const got = JSON.parse(new TextDecoder().decode(raw));", "    } catch (e) { say('That link did not open", """      const got = tidy(JSON.parse(new TextDecoder().decode(raw)));
      if (!got) throw new Error('empty');
      const n = got.phone.screens.filter(x => x.pieces.length).length + got.desktop.screens.filter(x => x.pieces.length).length;
      if (!await ask(`Open the ${plural(n, 'screen')} from this link? They replace the screens in this browser.`, 'Open them')) return;
      switchTo('mine', got); say('Screens opened from the link.');
""")

# ── printing: desktop is one to a landscape page
rep("""    let html = '';
    for (let i = 0; i < S.screens.length; i += 2) html += `<section class="page"><div class="pair">${S.screens.slice(i, i + 2).map((s, k) => sheet(s, i + k)).join('')}</div>${foot}</section>`;""",
    """    let html = '';
    if (isD()) S.screens.forEach((s, i) => { html += `<section class="page land" style="--u:0.2mm">${sheet(s, i)}${foot}</section>`; });
    else for (let i = 0; i < S.screens.length; i += 2) html += `<section class="page"><div class="pair">${S.screens.slice(i, i + 2).map((s, k) => sheet(s, i + k)).join('')}</div>${foot}</section>`;""")

# ── the chooser and buttons
rep("""    if ($('kinds').children.length) return;""", """    if ($('kinds').children.length && $('kinds').dataset.d === W.device) return;
    $('kinds').dataset.d = W.device;""")
rep("""{ ...blank(), useMaster: false, pieces: stackUp(AK[b.dataset.k].recipe) }""", """{ ...blank(), useMaster: false, pieces: stackUp(AK[b.dataset.k].recipe) }""")
rep("""    if (a === 'exreset' && mode === 'example') { snap(); S = EXAMPLE(); sel = null; render();""",
    """    if (a === 'dev') setDevice(b.dataset.d);
    if (a === 'fromphone') { snap(); S = toDesk(W.phone); sel = null; render(); say('Your phone screens, in a centred column. Now adapt them: what goes beside what on a big screen?'); }
    if (a === 'exreset' && mode === 'example') { snap(); S = EXAMPLE()[W.device]; sel = null; render();""")
rep("""snap(); S = { cur: 0, master: { pieces: [] }, screens: [blank()] }; sel = null; render(); }""", """snap(); S = freshSet(); sel = null; render(); }""")
rep("""'Start again? Every screen and the master will be cleared. Undo brings them back.'""", """`Start again? Every ${isD() ? 'desktop' : 'phone'} screen and its master will be cleared. Undo brings them back.`""")
rep("""      const overs = found.filter(f => BYCODE[f.c].over);""", """      const wrong = found.filter(f => isD() ? false : BYCODE[f.c].desk).map(f => f.c);
      if (wrong.length) { say(`${wrong.join(', ')} ${wrong.length > 1 ? 'are' : 'is'} for desktop screens only. Switch to Desktop at the top, or choose another organism.`); return; }
      const overs = found.filter(f => BYCODE[f.c].over);""")
rep("""    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); nudge(e.key === 'ArrowUp' ? -1 : 1); }""",
    """    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); nudge(e.key === 'ArrowUp' ? -1 : 1); }
    if (isD() && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { e.preventDefault(); const dir = e.key === 'ArrowLeft' ? -1 : 1; if (e.shiftKey) sideways(0, dir); else sideways(dir, 0); }""")
rep("""    $('undo').disabled = !hist.length; $('redo').disabled = !fut.length;""", """    $('undo').disabled = !hist.length; $('redo').disabled = !fut.length;
    document.body.classList.toggle('dm', isD());
    document.querySelectorAll('[data-act="dev"]').forEach(b => { const on = b.dataset.d === W.device; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });""")
rep("""  if (matchMedia('(pointer: coarse)').matches) $('hint')""", """  renderPal();
  if (matchMedia('(pointer: coarse)').matches) $('hint')""")
rep("""  $('pal').addEventListener('click', e => { const it""", """  $('pal').addEventListener('click', e => { const it""")

# ── markup: the device switch
rep("""  <div class="sm-row" style="margin-bottom:16px">
    <button type="button" class="sm-b pri" data-act="new" aria-haspopup="dialog">+ New screen</button>""",
    """  <div class="sm-row" style="margin-bottom:16px">
    <span class="sm-seg" role="group" aria-label="Screen size"><button type="button" data-act="dev" data-d="phone">Phone</button><button type="button" data-act="dev" data-d="desktop">Desktop</button></span>
    <button type="button" class="sm-b pri" data-act="new" aria-haspopup="dialog">+ New screen</button>""")
rep("""Set up the <b>master</b> once with what every screen shares, such as the app bar and tab bar.""",
    """Work at <b>phone</b> or <b>desktop</b> size. Set up the <b>master</b> once with what every screen shares, such as the bars at the top and bottom.""")

# ── styles
rep("""  .sm-recipe{""", """  .sm-seg{display:inline-flex;border:1px solid var(--line-2);border-radius:8px;overflow:hidden;margin-right:4px}
  .sm-seg button{font:inherit;font-size:0.84rem;font-weight:600;min-height:36px;padding:0 13px;border:0;background:var(--bg);color:var(--ink);cursor:pointer}
  .sm-seg button + button{border-left:1px solid var(--line-2)}
  .sm-seg button.on{background:var(--ink);color:var(--bg)}
  .sm-rz{position:absolute;right:-4px;top:0;bottom:0;width:9px;cursor:ew-resize;z-index:4;display:none;background:#8C2437;border-radius:3px;opacity:.75}
  .sm-p2.sel .sm-rz,.sm-p2:hover .sm-rz{display:block}
  /* desktop: the window needs the width, so the list narrows, its picture floats, the form goes underneath */
  .dm .wrap{max-width:1640px}
  .dm .sm-grid{grid-template-columns:280px minmax(0,1fr)}
  .dm .pal2{grid-template-columns:minmax(0,1fr)}
  .dm .peek{position:fixed;z-index:60;width:454px;background:var(--surface);border:1px solid var(--line-2);border-radius:12px;padding:12px;box-shadow:0 8px 28px rgba(0,0,0,.22);pointer-events:none;display:none}
  .dm .peek.on{display:flex} .dm .peek .hint{display:none}
  .dm .sm-stage{--u:min(1px, calc((min(100vw, 1640px) - 420px) / 1150))}
  .dm .sm-cwrap{margin-right:0}
  .dm .sm-tools{flex-direction:row;background:var(--surface);padding:3px;border-radius:9px;box-shadow:0 2px 10px rgba(0,0,0,.2)}
  .dm .sm-side{grid-column:2}
  .dm #side{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 24px;align-items:start} .dm #side > h2,.dm #side > .sm-p,.dm #side > .mchk,.dm #side > .sm-more{grid-column:1/-1}
  .dm .sm-mini{--u:0.1px} .dm .sm-kind{--u:0.115px}
  .dm .sm-mini > span{max-width:100px}
  @media(max-width:1060px){ .dm .sm-grid{grid-template-columns:1fr} .dm .sm-side{grid-column:auto} .dm #side{display:block} .dm .sm-stage{--u:calc((100vw - 60px) / 1150)} .dm .sm-tools{left:auto;right:6px} }
  .sm-recipe{""")
open(p, 'w').write(s)
print('ok')
