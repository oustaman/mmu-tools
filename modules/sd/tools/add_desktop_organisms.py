"""One-off, kept for the record: adds desktop support to paper/organisms.js and paper/paper.css.
New organisms go at the end of their family, so every code already printed keeps its number."""
import sys
root = sys.argv[1]
p = root + '/paper/organisms.js'
s = open(p).read()

def after(anchor_start, text):
    global s
    i = s.index(anchor_start)
    j = s.index(' },\n', i) + len(' },\n')
    s = s[:j] + text + s[j:]

def rep(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:80])
    s = s.replace(a, b)

after("    { id: 'progress-header',", """    { id: 'site-header', fam: 'Top', name: 'Site header with menu', does: 'Names the site, and leads to its main parts. On a big screen it replaces the tab bar.', rows: 1, edge: 1, desk: 1, draw: () =>
      `<div class="k appbar dhead" style="height:${u(56)}"><i class="ico" style="width:${u(28)};height:${u(28)};border-radius:${u(6)}"></i>${T('Service name', 17, 'font-weight:700;flex:1')}${T('Menu item', 15)}${T('Menu item', 15)}${T('Menu item', 15)}${box(110, 38, 'btn sec', T('Sign in', 14, 'font-weight:600'))}</div>` },
""")
after("    { id: 'page-tabs',", """    { id: 'breadcrumb', fam: 'Headings', name: 'Breadcrumbs', does: 'Shows where this page sits, with a way back up.', rows: 1, desk: 1, draw: () =>
      `<div class="crumbs">${T('Home', 14, 'text-decoration:underline')}${T('›', 14)}${T('Section', 14, 'text-decoration:underline')}${T('›', 14)}${T('This page', 14)}</div>` },
""")
after("    { id: 'accordion',", """    { id: 'side-menu', fam: 'Content', name: 'Side menu', does: 'Lists the parts of a section, beside the content.', rows: 6, desk: 1, span: 3, draw: () =>
      `<div class="sidem">${['Section one', 'Section two', 'Section three', 'Section four', 'Section five'].map((t, i) => `<span class="${i ? '' : 'on'}" style="height:${u(48)}">${T(t, 15)}</span>`).join('')}</div>` },
    { id: 'data-table', fam: 'Content', name: 'Table', does: 'Compares several things across the same few columns.', rows: 4, desk: 1, span: 8, draw: () =>
      `<table class="dtab"><thead><tr>${['Column', 'Column', 'Column', 'Column'].map(t => `<th style="height:${u(44)}">${T(t, 14, 'font-weight:700')}</th>`).join('')}</tr></thead><tbody>${[0, 1, 2].map(() => `<tr>${['Item', 'Value', 'Value', 'Value'].map(t => `<td style="height:${u(48)}">${T(t, 14)}</td>`).join('')}</tr>`).join('')}</tbody></table>` },
    { id: 'three-cards', fam: 'Content', name: 'Three cards', does: 'Shows three things side by side.', rows: 4, desk: 1, span: 12, draw: () =>
      `<div class="row3c">${[0, 1, 2].map(() => `<div class="card">${box('full', 130, 'img')}<div class="cardb"><span class="wl b"></span><span class="wl"></span></div></div>`).join('')}</div>` },
""")
after("    { id: 'tabbar',", """    { id: 'footer', fam: 'Actions', name: 'Footer', does: 'Closes the page: contact, help and the small print.', rows: 2, edge: 1, bottom: 1, desk: 1, draw: () =>
      `<div class="dfoot">${T('Service name', 15, 'font-weight:700;flex:1')}${T('Help', 14, 'text-decoration:underline')}${T('Contact', 14, 'text-decoration:underline')}${T('Privacy', 14, 'text-decoration:underline')}</div>` },
""")

# which organisms make no sense on which device, and how wide they start on desktop
rep("""  const count = {};
  O.forEach(o => {""", """  /* On desktop the same 56 px rows run across a 12-column grid: a column is 69 px, a gutter
     24 px, a side margin 24 px, so a window is 1140 px. Four columns are 348 px, about a phone. */
  const COLS = 12, COLW = 69, GUT = 24, MARGIN = 24, DW = 1140;
  const dw = n => n * COLW + (n - 1) * GUT, dx = c => MARGIN + c * (COLW + GUT);
  const PHONE_ONLY = new Set(['appbar', 'appbar-search', 'tabbar', 'keyboard', 'sheet']);
  const SPAN = { Top: 12, Headings: 8, Search: 8, Answers: 6, Content: 6, Feedback: 6, Actions: 4, Own: 6, Overlay: 4 };
  const WIDE = { map: 8, player: 8, chat: 8, summary: 8, composer: 8, 'task-list': 8, 'date-picker': 6, price: 4, 'two-cards': 6, card: 4 };
  const count = {};
  O.forEach(o => {
    o.phone = PHONE_ONLY.has(o.id); o.dspan = o.span || WIDE[o.id] || SPAN[o.fam];""")

rep("""    const tag = opts.label === false ? '' : `<span class="org-tag"><b>${o.code}</b> ${o.name} · ${o.size}</span>`;
    return `<div class="org${o.edge ? ' edge' : ''}${o.over ? ' ov' : ''}" data-org="${o.id}" style="width:${u(W)};height:${u(o.rows * ROW)}">${body(o.draw(t), o.rows)}${tag}</div>`;""",
"""    const size = opts.span ? `${o.edge && opts.span === COLS ? DW : dw(opts.span)} × ${o.h} px` : o.size;
    const tag = opts.label === false ? '' : `<span class="org-tag"><b>${o.code}</b> ${o.name} · ${size}</span>`;
    return `<div class="org${o.edge ? ' edge' : ''}${o.over ? ' ov' : ''}" data-org="${o.id}" style="width:${opts.span ? '100%' : u(o.desk ? dw(o.dspan) : W)};height:${u(o.rows * ROW)}">${body(o.draw(t), o.rows)}${tag}</div>`;""")

# the desktop window, with its column grid showing
rep("""  /* the kinds of screen, as recipes""", """  /* the desktop window: a browser bar, then the same 14 rows across 12 columns */
  function desk(inner = '', opts = {}) {
    const slots = Array.from({ length: ROWS }, (_, i) => `<i style="height:${u(ROW)}"><b>${i + 1}</b></i>`).join('');
    const grid = Array.from({ length: COLS }, (_, i) => `<i style="left:${u(dx(i))};width:${u(COLW)}"></i>`).join('');
    return `<div class="canvas desk" style="width:calc(${DW} * var(--u) + 1.2mm)">
      <div class="dbar2" style="height:${u(36)}"><i></i><i></i><i></i><span></span></div>
      <div class="slots" style="height:${u(ROWS * ROW)}">${opts.slots === false ? '' : `<div class="colgrid">${grid}</div><div class="slot-lines">${slots}</div>`}<div class="slot-fill">${inner}</div></div></div>`;
  }

  /* the kinds of screen, as recipes""")
rep("window.ORG = { ROW, ROWS, W, FAM, O, BY, base, named, of, organism, overlay, canvas, screen, words, ARCHETYPES, USED };",
    "window.ORG = { ROW, ROWS, W, COLS, COLW, GUT, MARGIN, DW, dw, dx, FAM, O, BY, base, named, of, organism, overlay, canvas, desk, screen, words, ARCHETYPES, USED };")
rep("""      const ls = [...org.querySelectorAll('.wl')]""", """      /* the words for the three cards are the same as for any card */
      const ls = [...org.querySelectorAll('.wl')]""")
open(p, 'w').write(s)

css = open(root + '/paper/paper.css').read()
css += """
/* ── the desktop window: 1140 px, 12 columns, the same rows ── */
.canvas.desk{border-radius:2.5mm}
.dbar2{display:flex;align-items:center;gap:calc(7 * var(--u));padding:0 calc(14 * var(--u));border-bottom:0.25mm solid var(--line);background:var(--faint)}
.dbar2 i{display:block;width:calc(11 * var(--u));height:calc(11 * var(--u));border-radius:50%;border:0.25mm solid var(--line);background:#fff;flex:none}
.dbar2 span{display:block;flex:1;max-width:calc(520 * var(--u));height:calc(20 * var(--u));margin-left:calc(14 * var(--u));border-radius:99px;border:0.25mm solid var(--line);background:#fff}
.colgrid{position:absolute;inset:0} .colgrid i{position:absolute;top:0;bottom:0;background:#F6F3F1}
.desk .slot-lines i{background:none}
.desk .org:not(.edge) .org-in{padding:0}
.desk .org.edge .appbar,.desk .org.edge .org-pad{padding-left:calc(24 * var(--u));padding-right:calc(24 * var(--u))}
.desk .row2 > *{flex:1;width:auto!important;min-width:0}
.desk .card.sm{width:auto!important;flex:1}
.desk .ovl.middle{left:50%;right:auto;transform:translate(-50%,-50%)}
.desk .ovl.bottom{left:auto;right:calc(24 * var(--u))}
.dhead{gap:calc(22 * var(--u))} .dhead .btn{flex:none}
.crumbs{display:flex;align-items:center;gap:calc(8 * var(--u))}
.sidem{display:flex;flex-direction:column;border:0.3mm solid var(--line);border-radius:calc(6 * var(--u));overflow:hidden}
.sidem span{display:flex;align-items:center;padding:0 calc(12 * var(--u));border-bottom:0.25mm solid var(--pale)} .sidem span:last-child{border-bottom:0} .sidem span.on{border-left:1.2mm solid var(--line)}
.dtab{width:100%;border-collapse:collapse} .dtab th,.dtab td{text-align:left;padding:0 calc(12 * var(--u));border-bottom:0.25mm solid var(--pale)} .dtab th{border-bottom:0.4mm solid var(--line)}
.row3c{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(24 * var(--u))}
.dfoot{display:flex;align-items:center;gap:calc(22 * var(--u));height:calc(112 * var(--u));padding:0 calc(24 * var(--u));border-top:0.25mm solid var(--line);background:var(--faint)}
"""
open(root + '/paper/paper.css', 'w').write(css)

# the paper kit is phone-sized: desktop-only organisms stay out of it
for f, pairs in {
  root + '/paper/organisms.html': [
    ("const { O, FAM, USED, ARCHETYPES, organism, canvas, ROW, W } = window.ORG;",
     "const { FAM, USED, ARCHETYPES, organism, canvas, ROW, W } = window.ORG;\nconst O = window.ORG.O.filter(o => !o.desk);"),
  ],
  root + '/paper/cheatsheet.html': [
    ("const { ARCHETYPES: A, BY, O, USED, screen } = window.ORG;",
     "const { ARCHETYPES: A, BY, USED, screen } = window.ORG;\nconst O = window.ORG.O.filter(o => !o.desk);"),
  ],
}.items():
    t = open(f).read()
    for a, b in pairs:
        assert t.count(a) == 1, a
        t = t.replace(a, b)
    open(f, 'w').write(t)
print('ok')
