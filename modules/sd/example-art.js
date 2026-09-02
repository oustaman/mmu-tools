/* The artefacts in the example portfolio — the student's actual work.
 *
 *  NOT REAL STUDENT WORK. Written by the module team as a teaching example.
 *  Nothing is traced, adapted or paraphrased from any real submission. The
 *  photographs are CC0/public domain; see example-photos.js for provenance.
 *
 *  These are drawn as FINISHED WORK THAT IS BAD, which is the whole point of
 *  the exercise. A barely-passing portfolio is not an empty one: it contains
 *  real screens with real plant names, real buttons and real photographs. It
 *  fails on how those things are designed and on what is never evidenced. So
 *  every artefact below is complete enough to be marked, and carries its own
 *  specific fault:
 *
 *    sketches  real pencil sketches, photographed badly and cropped by the frame
 *    mood      nine handsome photographs on an even grid, making no argument
 *    tile      coherent and legible — in the greys that fail A5's contrast
 *    flow      a real site map, generated: glossy, symmetrical, words misspelt
 *    wires     five annotated wireframes, three of them never captioned
 *    screens   five finished screens — every word of them at #8A8A8A on white
 *    resp      one screen and a uniform copy of it, so nothing reflows
 *
 *  The student's palette, from A5. Body text and the accent both fail against
 *  white, and the screens are painted in them on purpose: the contrast fault
 *  has to be visible in the work, not just recorded in a table on page 2.
 */
(function () {
  var P = { bg:'#FFFFFF', surface:'#F4F4F4', body:'#8A8A8A', quiet:'#B4B4B4', accent:'#7ED957' };
  var SANS = 'Segoe UI, Helvetica, Arial, sans-serif';          /* stands in for Open Sans */
  var HEAD = 'Trebuchet MS, Verdana, sans-serif';               /* stands in for Montserrat */
  var HAND = 'Bradley Hand, Chalkboard SE, Comic Sans MS, Segoe Print, cursive';
  var PH = (typeof window !== 'undefined' && window.PHOTO) || { mood: [], thumb: [], hero: '' };
  var uid = 0;

  function svg(w, h, body) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" role="img">' + body + '</svg>';
  }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
  function t(x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" font-family="' + (o.f || SANS) + '" font-size="' + (o.s || 9) +
      '"' + (o.w ? ' font-weight="' + o.w + '"' : '') + ' fill="' + (o.c || P.body) + '"' +
      (o.a ? ' text-anchor="' + o.a + '"' : '') + (o.ls ? ' letter-spacing="' + o.ls + '"' : '') +
      (o.op ? ' opacity="' + o.op + '"' : '') + '>' + esc(s) + '</text>';
  }
  function r(x, y, w, h, rx, fill, stroke) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + rx +
      '" fill="' + (fill || 'none') + '"' + (stroke ? ' stroke="' + stroke + '"' : '') + '/>';
  }
  /* a photograph, cropped to fill its box */
  function img(x, y, w, h, rx, src) {
    if (!src) return r(x, y, w, h, rx, '#E8E6E3');
    var id = 'ic' + (++uid);
    return '<clipPath id="' + id + '">' + r(x, y, w, h, rx, '#000') + '</clipPath>' +
      '<image href="' + src + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
      '" preserveAspectRatio="xMidYMid slice" clip-path="url(#' + id + ')"/>';
  }
  function circImg(cx, cy, rad, src) {
    if (!src) return '<circle cx="' + cx + '" cy="' + cy + '" r="' + rad + '" fill="#E8E6E3"/>';
    var id = 'ic' + (++uid);
    return '<clipPath id="' + id + '"><circle cx="' + cx + '" cy="' + cy + '" r="' + rad + '"/></clipPath>' +
      '<image href="' + src + '" x="' + (cx - rad) + '" y="' + (cy - rad) + '" width="' + (rad * 2) +
      '" height="' + (rad * 2) + '" preserveAspectRatio="xMidYMid slice" clip-path="url(#' + id + ')"/>';
  }

  /* ── icons ──────────────────────────────────────────────────────────── */
  function icon(name, x, y, s, c) {
    var g = '<g transform="translate(' + x + ',' + y + ') scale(' + (s / 16) + ')" fill="none" stroke="' + c +
            '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">';
    var d = {
      home:  '<path d="M2 7 L8 2 L14 7 V14 H2 Z"/><path d="M6.5 14 v-4 h3 v4"/>',
      leaf:  '<path d="M13 3 C13 9 9 13 3 13 C3 7 7 3 13 3 Z"/><path d="M3 13 L9 7"/>',
      plus:  '<circle cx="8" cy="8" r="6"/><path d="M8 5 v6 M5 8 h6"/>',
      user:  '<circle cx="8" cy="6" r="3"/><path d="M2.5 14 c1-3.2 3-4.5 5.5-4.5 s4.5 1.3 5.5 4.5"/>',
      search:'<circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5 L14 14"/>',
      cam:   '<path d="M2 5 h3 l1.2-1.8 h3.6 L14 5 h0 v8 H2 Z"/><circle cx="8" cy="9" r="2.8"/>',
      bell:  '<path d="M8 2 c2.6 0 4 1.8 4 4 v3 l1.4 2 H2.6 L4 9 V6 c0-2.2 1.4-4 4-4Z"/><path d="M6.6 13.2 a1.6 1.6 0 0 0 2.8 0"/>',
      chev:  '<path d="M6 3 L11 8 L6 13"/>',
      drop:  '<path d="M8 2 C11 6 13 8 13 10.2 A5 5 0 0 1 3 10.2 C3 8 5 6 8 2Z"/>'
    }[name] || '';
    return g + d + '</g>';
  }
  function statusBar(w) {
    return t(11, 15, '9:41', { s: 7.5, w: 600, c: P.body }) +
      '<g fill="' + P.quiet + '">' +
        r(w - 46, 11, 2, 4, 1, P.quiet) + r(w - 42, 9, 2, 6, 1, P.quiet) +
        r(w - 38, 7, 2, 8, 1, P.quiet) + r(w - 34, 5.5, 2, 9.5, 1, P.quiet) +
        '<path d="M' + (w - 28) + ' 9 a6 6 0 0 1 8 0" stroke="' + P.quiet + '" stroke-width="1.3" fill="none"/>' +
        '<circle cx="' + (w - 24) + '" cy="13" r="1.2"/>' +
      '</g>' +
      r(w - 16, 6, 11, 6, 1.6, 'none', P.quiet) + r(w - 14.5, 7.5, 6, 3, 0.8, P.quiet);
  }
  function tabBar(w, h, active) {
    var items = [['home', 'Home'], ['leaf', 'Plants'], ['plus', 'Add'], ['user', 'Profile']], o = '';
    o += '<line x1="0" y1="' + (h - 38) + '" x2="' + w + '" y2="' + (h - 38) + '" stroke="#ECECEC"/>';
    for (var i = 0; i < 4; i++) {
      var cx = w / 8 + (w / 4) * i, on = i === active;
      o += icon(items[i][0], cx - 7, h - 31, 14, on ? P.accent : P.quiet) +
           t(cx, h - 10, items[i][1], { s: 6.4, c: on ? P.accent : P.quiet, a: 'middle' });
    }
    return o;
  }

  /* ── B6 · the five finished screens ─────────────────────────────────────
     Real content, real photographs, a real tab bar. Everything in it — the
     greeting, the plant names, the labels on the fields — is set in #8A8A8A
     or #B4B4B4 on white, which is the portfolio's central fault made visible
     rather than merely tabulated. */
  var PLANTS = [
    ['Monstera Deliciosa', 'Water in 2 days',  1],
    ['Prayer Plant',       'Water today',      2],
    ['Aloe Vera',          'Water in 9 days',  0],
    ['Bunny Ear Cactus',   'Water in 14 days', 4],
    ['Succulent Bowl',     'Overdue by 1 day', 3],
    ['Pilea',              'Water in 5 days',  5]
  ];
  function phone(w, h, inner) {
    return r(0, 0, w, h, 16, P.bg, '#E4E4E4') + statusBar(w) + inner(w, h);
  }
  var SCREEN = {
    'Home': function (w, h) {
      var o = t(12, 46, 'Good morning', { s: 13, w: 700, f: HEAD }) +
              t(12, 60, "2 plants need water today", { s: 7.8, c: P.quiet });
      for (var i = 0; i < 3; i++) {
        var y = 72 + i * 62, p = PLANTS[i];
        o += r(12, y, w - 24, 54, 10, P.surface) +
             img(20, y + 6, 42, 42, 8, PH.thumb[p[2]]) +
             t(70, y + 22, p[0], { s: 8.4, w: 600 }) +
             t(70, y + 36, p[1], { s: 7.2, c: P.quiet }) +
             icon('drop', w - 26, y + 33, 12, i === 1 ? P.accent : P.quiet);
      }
      o += r(12, 262, w - 24, 34, 17, P.accent) +
           t(w / 2, 283, 'Water 2 plants', { s: 9.5, w: 700, c: '#FFFFFF', a: 'middle', f: HEAD });
      return o + tabBar(w, h, 0);
    },
    'Plant list': function (w, h) {
      var o = t(12, 46, 'My Plants', { s: 13, w: 700, f: HEAD }) +
              r(12, 54, w - 24, 26, 13, P.surface) +
              icon('search', 21, 60, 13, P.quiet) +
              t(40, 71, 'Search plants', { s: 8, c: P.quiet });
      for (var i = 0; i < 5; i++) {
        var y = 92 + i * 44, p = PLANTS[i];
        o += img(12, y, 34, 34, 8, PH.thumb[p[2]]) +
             t(54, y + 15, p[0], { s: 8.8, w: 600 }) +
             t(54, y + 27, p[1], { s: 7, c: P.quiet }) +
             icon('chev', w - 22, y + 10, 13, P.quiet) +
             '<line x1="54" y1="' + (y + 38) + '" x2="' + (w - 12) + '" y2="' + (y + 38) + '" stroke="#F0F0F0"/>';
      }
      return o + tabBar(w, h, 1);
    },
    'Add plant': function (w, h) {
      var o = t(12, 46, 'Cancel', { s: 8, c: P.quiet }) +
              t(w / 2, 46, 'Add plant', { s: 10, w: 700, a: 'middle', f: HEAD }) +
              t(w - 12, 46, 'Save', { s: 8, c: P.accent, a: 'end', w: 600 }) +
              '<rect x="12" y="56" width="' + (w - 24) + '" height="62" rx="10" fill="#FAFAFA" stroke="' +
                P.quiet + '" stroke-dasharray="4 3"/>' +
              icon('cam', w / 2 - 9, 72, 18, P.quiet) +
              t(w / 2, 106, 'Add a photo', { s: 7.4, c: P.quiet, a: 'middle' });
      var fields = [['PLANT NAME', 'Monstera Deliciosa'], ['SPECIES', 'Monstera deliciosa'],
                    ['WATER EVERY', '7 days'], ['ROOM', 'Living room']];
      for (var i = 0; i < 4; i++) {
        var y = 134 + i * 42;
        o += t(12, y, fields[i][0], { s: 6.2, c: P.quiet, ls: '0.08em' }) +
             r(12, y + 6, w - 24, 26, 6, P.surface) +
             t(20, y + 23, fields[i][1], { s: 8.4 });
      }
      return o + r(12, 306, w - 24, 32, 16, P.accent) +
             t(w / 2, 326, 'Save plant', { s: 9.5, w: 700, c: '#FFFFFF', a: 'middle', f: HEAD });
    },
    'Settings': function (w, h) {
      var o = t(12, 46, 'Settings', { s: 13, w: 700, f: HEAD }),
          groups = [['REMINDERS', [['Notifications', 'on'], ['Reminder time', '09:00'], ['Sound', 'off']]],
                    ['APP', [['Units', 'Metric'], ['Dark mode', 'off'], ['About Plantly', 'chev']]]], y = 66;
      groups.forEach(function (g) {
        o += t(12, y, g[0], { s: 6.2, c: P.quiet, ls: '0.08em' }); y += 10;
        g[1].forEach(function (row) {
          o += t(12, y + 16, row[0], { s: 8.6 });
          if (row[1] === 'on' || row[1] === 'off') {
            var on = row[1] === 'on';
            o += r(w - 40, y + 5, 27, 15, 7.5, on ? P.accent : '#E2E2E2') +
                 '<circle cx="' + (w - 40 + (on ? 19.5 : 7.5)) + '" cy="' + (y + 12.5) + '" r="5.6" fill="#FFFFFF"/>';
          } else if (row[1] === 'chev') { o += icon('chev', w - 22, y + 6, 12, P.quiet); }
          else { o += t(w - 13, y + 16, row[1], { s: 8, c: P.quiet, a: 'end' }); }
          o += '<line x1="12" y1="' + (y + 26) + '" x2="' + (w - 12) + '" y2="' + (y + 26) + '" stroke="#F0F0F0"/>';
          y += 34;
        });
        y += 12;
      });
      return o + tabBar(w, h, 3);
    },
    'Profile': function (w, h) {
      var o = circImg(w / 2, 68, 26, PH.thumb[1]) +
              t(w / 2, 112, 'Sam Whitfield', { s: 12, w: 700, a: 'middle', f: HEAD }) +
              t(w / 2, 127, '12 plants · 340 waterings', { s: 7.6, c: P.quiet, a: 'middle' });
      ['My plants', 'Achievements', 'Reminders', 'Help & FAQ', 'Log out'].forEach(function (row, i) {
        var y = 148 + i * 32;
        o += t(12, y + 14, row, { s: 8.6, c: i === 4 ? P.quiet : P.body }) +
             icon('chev', w - 22, y + 4, 12, P.quiet) +
             '<line x1="12" y1="' + (y + 24) + '" x2="' + (w - 12) + '" y2="' + (y + 24) + '" stroke="#F0F0F0"/>';
      });
      return o + tabBar(w, h, 3);
    }
  };
  var ORDER = ['Home', 'Plant list', 'Add plant', 'Settings', 'Profile'];
  function grid(items, cw, ch, draw, caption) {
    var o = '', cols = 3;
    for (var i = 0; i < items.length; i++) {
      var x = 12 + (i % cols) * ((600 - 24 - (cw - 176)) / cols === 0 ? 200 : 200),
          y = 14 + Math.floor(i / cols) * (ch + 46);
      x = 12 + (i % cols) * 200;
      o += '<g transform="translate(' + x + ',' + y + ')">' + draw(items[i], cw, ch) + '</g>';
      if (caption(items[i], i)) o += t(x + cw / 2, y + ch + 20, caption(items[i], i), { s: 8.6, c: P.body, a: 'middle' });
    }
    return o;
  }
  var screens = svg(600, 822,
    '<rect width="600" height="822" fill="#FFFFFF"/>' +
    grid(ORDER, 176, 356, function (k, w, h) { return phone(w, h, SCREEN[k]); },
         function (k, i) { return '0' + (i + 1) + ' · ' + k; }));

  /* ── B5 · wireframes ────────────────────────────────────────────────────
     Annotated, and the annotations are the student's. Real structure, real
     labels — the fault is that only two of the five are ever captioned, so
     nobody reading the portfolio can say which screen the other three are. */
  var W1 = '#E9E9E9', W2 = '#D8D8D8', W3 = '#9A9A9A', WL = '#C6C6C6';
  function wlines(x, y, ws, gap) {
    var o = '';
    for (var i = 0; i < ws.length; i++) o += r(x, y + i * gap, ws[i], 4, 2, WL);
    return o;
  }
  function xbox(x, y, w, h) {   /* the crossed rectangle every wireframe uses for an image */
    return r(x, y, w, h, 3, W1, W2) +
      '<path d="M' + x + ' ' + y + ' L' + (x + w) + ' ' + (y + h) + ' M' + (x + w) + ' ' + y +
      ' L' + x + ' ' + (y + h) + '" stroke="' + W2 + '" fill="none"/>';
  }
  var WBLOCK = {
    title:  function (x, y, w) { return { d: r(x, y, w * 0.58, 13, 3, W2), h: 22 }; },
    sub:    function (x, y, w) { return { d: r(x, y, w * 0.74, 6, 3, WL), h: 14 }; },
    search: function (x, y, w) {
      return { d: r(x, y, w, 24, 12, W1, W2) + '<circle cx="' + (x + 14) + '" cy="' + (y + 12) +
        '" r="4.5" fill="none" stroke="' + W3 + '"/><path d="M' + (x + 17.5) + ' ' + (y + 15.5) +
        ' l3 3" stroke="' + W3 + '" fill="none"/>' + r(x + 26, y + 10, w * 0.4, 5, 2.5, WL), h: 32 }; },
    card:   function (x, y, w) {
      return { d: r(x, y, w, 44, 6, '#FBFBFB', W2) + xbox(x + 6, y + 6, 32, 32) +
        wlines(x + 46, y + 12, [w * 0.42, w * 0.3], 12) +
        r(x + w - 20, y + 18, 10, 10, 5, W1, W2), h: 52 }; },
    row:    function (x, y, w) {
      return { d: xbox(x, y, 26, 26) + wlines(x + 34, y + 5, [w * 0.4, w * 0.26], 11) +
        '<path d="M' + (x + w - 8) + ' ' + (y + 9) + ' l4 4 l-4 4" stroke="' + W3 +
        '" fill="none"/><line x1="' + (x + 34) + '" y1="' + (y + 32) + '" x2="' + (x + w) +
        '" y2="' + (y + 32) + '" stroke="#EDEDED"/>', h: 38 }; },
    field:  function (x, y, w) {
      return { d: r(x, y, w * 0.34, 5, 2.5, WL) + r(x, y + 9, w, 22, 4, W1, W2) +
        r(x + 6, y + 17, w * 0.5, 5, 2.5, WL), h: 39 }; },
    toggle: function (x, y, w) {
      return { d: r(x, y + 5, w * 0.46, 6, 3, WL) + r(x + w - 26, y, 26, 14, 7, W1, W2) +
        '<circle cx="' + (x + w - 19) + '" cy="' + (y + 7) + '" r="5" fill="' + W2 + '"/>' +
        '<line x1="' + x + '" y1="' + (y + 22) + '" x2="' + (x + w) + '" y2="' + (y + 22) +
        '" stroke="#EDEDED"/>', h: 30 }; },
    group:  function (x, y, w) { return { d: r(x, y, w * 0.22, 5, 2.5, W2), h: 15 }; },
    photo:  function (x, y, w) { return { d: xbox(x, y, w, 56), h: 64 }; },
    button: function (x, y, w) { return { d: r(x, y, w, 28, 14, W2) + r(x + w * 0.32, y + 11, w * 0.36, 6, 3, '#FFFFFF'), h: 36 }; },
    avatar: function (x, y, w) {
      return { d: '<circle cx="' + (x + w / 2) + '" cy="' + (y + 24) + '" r="24" fill="' + W1 +
        '" stroke="' + W2 + '"/><path d="M' + (x + w / 2 - 17) + ' ' + (y + 7) + ' l34 34 M' +
        (x + w / 2 + 17) + ' ' + (y + 7) + ' l-34 34" stroke="' + W2 + '" fill="none"/>' +
        r(x + w * 0.28, y + 56, w * 0.44, 8, 4, W2) + r(x + w * 0.34, y + 70, w * 0.32, 5, 2.5, WL), h: 86 }; }
  };
  var WIRE = {
    'Home':       [['title','greeting'],['sub','sub-heading'],['card','plant card'],['card','plant card'],
                   ['card','plant card'],['button','CTA — water 2 plants']],
    'Plant list': [['title','title'],['search','search field'],['row','list row'],['row','list row'],
                   ['row','list row'],['row','list row'],['row','list row']],
    'Add plant':  [['title','nav bar'],['photo','photo picker'],['field','plant name'],['field','species'],
                   ['field','water every'],['button','save']],
    'Settings':   [['title','title'],['group','group label'],['toggle','row + toggle'],['toggle','row + toggle'],
                   ['toggle','row + toggle'],['group','group label'],['toggle','row + toggle'],['toggle','row + toggle']],
    'Profile':    [['avatar','avatar + name + stats'],['row','list row'],['row','list row'],
                   ['row','list row'],['row','list row']]
  };
  var wires = svg(600, 800,
    '<rect width="600" height="800" fill="#FFFFFF"/>' +
    grid(ORDER, 176, 340, function (k, w, h) {
      var o = r(0, 0, w, h, 8, '#FFFFFF', '#D0D0D0'), y = 14;
      WIRE[k].forEach(function (b) {
        /* each block returns what it drew and how much vertical room it took */
        var out = WBLOCK[b[0]](12, y, w - 24);
        o += out.d;
        /* No annotations. There is no room for them beside the controls at
           this size, and there are none on the student's wireframes either —
           which is part of why Criterion 3 reads "present but underdeveloped". */
        y += out.h;
      });
      return o + '<line x1="0" y1="' + (h - 30) + '" x2="' + w + '" y2="' + (h - 30) + '" stroke="#D0D0D0"/>' +
        (function () {
          var s = '', xs = [22, 66, 110, 154];
          for (var i = 0; i < 4; i++) s += r(xs[i] - 7, h - 23, 14, 10, 2, W1, W2) + r(xs[i] - 9, h - 10, 18, 4, 2, WL);
          return s;
        })();
    }, function (k, i) { return i < 2 ? k : ''; }));

  /* ── B2 · mood board ────────────────────────────────────────────────────
     Nine photographs, one grid, no argument. Handsome and interchangeable:
     swap any two and nothing about the board changes, and nothing on it says
     what any of it is for. That is the fault, and it survives the pictures
     being good. */
  var mood = (function () {
    var o = '<rect width="600" height="452" fill="#FFFFFF"/>' +
            t(10, 18, 'MOOD BOARD', { s: 8, c: '#9A9A9A', ls: '0.16em', f: HEAD });
    for (var i = 0; i < 9; i++) {
      o += img(9 + (i % 3) * 195, 30 + Math.floor(i / 3) * 141, 187, 133, 2, PH.mood[i]);
    }
    return svg(600, 452, o);
  })();

  /* ── B3 · style tile ────────────────────────────────────────────────────
     The strongest artefact in the portfolio and the reason Criterion 1 sits
     at 50 rather than below it: a real tile, with type, colour, buttons and
     imagery on one sheet. It is also where the failing greys are declared as
     the system, so the best artefact carries the fault furthest. */
  var tile = svg(600, 330,
    '<rect width="600" height="330" fill="#FFFFFF" stroke="#E8E8E8"/>' +
    t(28, 46, 'Plantly', { f: 'Snell Roundhand, Brush Script MT, cursive', s: 30, c: P.accent }) +
    t(28, 86, 'Montserrat — headings', { f: HEAD, s: 21, w: 700, c: '#3A3A3A' }) +
    t(28, 112, 'Open Sans — body copy, 16/24, for every other label', { s: 12, c: P.body }) +
    t(28, 132, 'Quiet text for captions and secondary labels', { s: 12, c: P.quiet }) +
    r(358, 78, 104, 34, 17, P.accent) + t(410, 100, 'Add plant', { f: HEAD, s: 13, w: 700, c: '#FFFFFF', a: 'middle' }) +
    r(474, 78, 98, 34, 17, 'none', P.quiet) + t(523, 100, 'Cancel', { f: HEAD, s: 13, c: P.body, a: 'middle' }) +
    (function () {
      var sw = [['#FFFFFF', 'Background'], ['#F4F4F4', 'Surface'], [P.body, 'Body text'],
                [P.quiet, 'Quiet'], [P.accent, 'Accent']], o = '';
      for (var i = 0; i < 5; i++) {
        var x = 28 + i * 110;
        o += r(x, 158, 94, 52, 2, sw[i][0], '#DDD') +
             t(x, 224, sw[i][1], { s: 9.5, c: '#6A6A6A' }) +
             t(x, 236, sw[i][0], { s: 9, c: '#9A9A9A', f: 'ui-monospace, Menlo, monospace' });
      }
      return o;
    })() +
    t(28, 264, 'IMAGERY', { s: 8, c: '#9A9A9A', ls: '0.14em', f: HEAD }) +
    img(28, 272, 118, 44, 2, PH.mood[1]) + img(152, 272, 118, 44, 2, PH.mood[4]) +
    img(276, 272, 118, 44, 2, PH.mood[7]) +
    t(410, 264, 'ICONS', { s: 8, c: '#9A9A9A', ls: '0.14em', f: HEAD }) +
    icon('home', 410, 276, 20, P.body) + icon('leaf', 440, 276, 20, P.body) +
    icon('drop', 470, 276, 20, P.body) + icon('bell', 500, 276, 20, P.body) +
    icon('user', 530, 276, 20, P.body));

  /* ── B4 · flow diagram ──────────────────────────────────────────────────
     A real site map — every box named, every arrow going somewhere — and
     generated. Glossy, bilaterally symmetrical, sparkles nobody asked for,
     one box floating with an arrow to nothing, and four of the labels are
     misspelt in the way image generators misspell. A7 says no AI was used.
     The exercise is what a marker does next, which is ask, not assume. */
  function gbox(x, y, w, h, label, bad) {
    return '<g>' + r(x, y, w, h, 11, 'url(#gl)', '#8FD07A').replace('/>', ' filter="url(#gs)"/>') +
      r(x + 4, y + 3, w - 8, h * 0.42, 8, '#FFFFFF').replace('/>', ' opacity=".45"/>') +
      t(x + w / 2, y + h / 2 + 4.5, label, { f: HEAD, s: 12, c: bad ? '#4A7A3E' : '#3E6B33', a: 'middle' }) + '</g>';
  }
  var flow = svg(600, 340,
    '<defs>' +
      '<linearGradient id="gl" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#F0FBEA"/><stop offset="1" stop-color="#B7E7A0"/></linearGradient>' +
      '<linearGradient id="gbgg" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#F7FDF4"/><stop offset="1" stop-color="#E4F6DC"/></linearGradient>' +
      '<filter id="gs" x="-20%" y="-20%" width="150%" height="160%">' +
        '<feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#4E8A3C" flood-opacity=".28"/></filter>' +
      '<marker id="ah" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">' +
        '<path d="M0 0 L7 3.5 L0 7 z" fill="#8FD07A"/></marker>' +
    '</defs>' +
    '<rect width="600" height="340" fill="url(#gbgg)"/>' +
    '<g stroke="#8FD07A" stroke-width="2" fill="none" marker-end="url(#ah)">' +
      '<path d="M300 68 V96"/><path d="M300 96 H126 V126"/><path d="M300 96 V126"/><path d="M300 96 H474 V126"/>' +
      '<path d="M126 182 V212"/><path d="M300 182 V212"/><path d="M474 182 V212"/>' +
      '<path d="M126 268 H126 V296"/>' +
    '</g>' +
    gbox(228, 28, 144, 40, 'Splash') +
    gbox(62, 126, 128, 56, 'Home') +
    gbox(236, 126, 128, 56, 'Plannt Lisst', 1) +
    gbox(410, 126, 128, 56, 'Settingss', 1) +
    gbox(62, 212, 128, 56, 'Plant Detial', 1) +
    gbox(236, 212, 128, 56, 'Add Plnat', 1) +
    gbox(410, 212, 128, 56, 'Profile') +
    gbox(62, 296, 128, 34, 'Camera') +
    '<g fill="#FFFFFF" opacity=".85">' +
      '<path d="M36 36 l3 8 8 3 -8 3 -3 8 -3-8 -8-3 8-3z"/>' +
      '<path d="M556 60 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5-6 -6-2.5 6-2.5z"/>' +
      '<path d="M566 250 l2 5 5 2 -5 2 -2 5 -2-5 -5-2 5-2z"/>' +
    '</g>' +
    /* an arrow that leaves the diagram and arrives nowhere */
    '<path d="M538 240 H572" stroke="#8FD07A" stroke-width="2" fill="none" marker-end="url(#ah)"/>' +
    t(300, 332, 'Plantly App User Flowchart Diagramm', { f: HEAD, s: 9, c: '#7CA96E', a: 'middle' }));

  /* ── B1 · concept sketches ──────────────────────────────────────────────
     Two real sketches on paper: screens, labels, arrows, a note to self, a
     crossed-out idea. Photographed at an angle on a desk, with the second
     sheet running off the right of the frame — the artefact is evidence, and
     evidence photographed badly is evidence half lost. */
  function sheetA(x, y) {
    var o = '<g stroke="#4E4A46" fill="none" stroke-linecap="round" filter="url(#pn1)">';
    o += r(x, y, 108, 176, 8).replace('/>', ' stroke-width="1.7"/>');
    o += '<line x1="' + (x + 8) + '" y1="' + (y + 26) + '" x2="' + (x + 100) + '" y2="' + (y + 26) + '" stroke-width="1.1"/>';
    for (var i = 0; i < 3; i++) {
      var by = y + 34 + i * 34;
      o += r(x + 8, by, 92, 28, 4).replace('/>', ' stroke-width="1.1"/>');
      o += '<circle cx="' + (x + 22) + '" cy="' + (by + 14) + '" r="9" stroke-width="1.1"/>';
      o += '<line x1="' + (x + 38) + '" y1="' + (by + 11) + '" x2="' + (x + 92) + '" y2="' + (by + 11) + '" stroke-width="0.9"/>';
      o += '<line x1="' + (x + 38) + '" y1="' + (by + 19) + '" x2="' + (x + 74) + '" y2="' + (by + 19) + '" stroke-width="0.9"/>';
    }
    o += '<circle cx="' + (x + 86) + '" cy="' + (y + 152) + '" r="13" stroke-width="1.5"/>';
    o += '<path d="M' + (x + 86) + ' ' + (y + 145) + ' v14 M' + (x + 79) + ' ' + (y + 152) + ' h14" stroke-width="1.5"/>';
    o += '<path d="M' + (x + 116) + ' ' + (y + 60) + ' q22 14 2 30" stroke-width="1.1"/>';
    o += '<path d="M' + (x + 118) + ' ' + (y + 90) + ' l0 -8 l7 5 z" stroke-width="1" fill="#4E4A46"/>';
    o += '</g>';
    o += '<g fill="#3E3A36" font-family="' + HAND + '">';
    o += t(x + 8, y + 18, 'HOME', { f: HAND, s: 13, c: '#3E3A36' });
    o += t(x + 38, y + 45, 'plant name', { f: HAND, s: 8, c: '#5A544E' });
    o += t(x + 8, y + 190, 'my plants list', { f: HAND, s: 10, c: '#4A443E' });
    o += '<g transform="rotate(-7 ' + (x + 128) + ' ' + (y + 104) + ')">' +
         t(x + 122, y + 104, 'goes to', { f: HAND, s: 9, c: '#5A544E' }) +
         t(x + 122, y + 116, 'the list', { f: HAND, s: 9, c: '#5A544E' }) + '</g>';
    o += '</g>';
    return o;
  }
  function sheetB(x, y) {
    var o = '<g stroke="#4E4A46" fill="none" stroke-linecap="round" filter="url(#pn2)">';
    o += r(x, y, 112, 180, 8).replace('/>', ' stroke-width="1.7"/>');
    o += r(x + 9, y + 30, 94, 34, 4).replace('/>', ' stroke-width="1.1"/>');
    o += '<path d="M' + (x + 44) + ' ' + (y + 52) + ' l6-8 l6 8 z" stroke-width="1.1"/>';
    for (var i = 0; i < 3; i++) {
      var by = y + 74 + i * 26;
      o += r(x + 9, by, 94, 18, 3).replace('/>', ' stroke-width="1"/>');
    }
    o += r(x + 9, y + 154, 94, 18, 9).replace('/>', ' stroke-width="1.6"/>');
    /* the idea that was crossed out */
    o += '<path d="M' + (x + 9) + ' ' + (y + 126) + ' L' + (x + 103) + ' ' + (y + 144) + '" stroke-width="1.2"/>';
    o += '<path d="M' + (x + 103) + ' ' + (y + 126) + ' L' + (x + 9) + ' ' + (y + 144) + '" stroke-width="1.2"/>';
    o += '<path d="M' + (x + 126) + ' ' + (y + 46) + ' q-16 6 -20 2" stroke-width="1.1"/>';
    o += '<path d="M' + (x + 106) + ' ' + (y + 48) + ' l7 -1 l-4 6 z" stroke-width="1" fill="#4E4A46"/>';
    o += '</g>';
    o += t(x + 9, y + 22, 'ADD PLANT', { f: HAND, s: 12, c: '#3E3A36' });
    o += t(x + 14, y + 87, 'name', { f: HAND, s: 8, c: '#5A544E' });
    o += t(x + 14, y + 113, 'how often?', { f: HAND, s: 8, c: '#5A544E' });
    o += t(x + 30, y + 167, 'SAVE', { f: HAND, s: 10, c: '#3E3A36' });
    o += '<g transform="rotate(6 ' + (x + 128) + ' ' + (y + 40) + ')">' +
         t(x + 128, y + 34, 'camera', { f: HAND, s: 9.5, c: '#5A544E' }) +
         t(x + 128, y + 46, 'here!!', { f: HAND, s: 9.5, c: '#5A544E' }) + '</g>';
    return o;
  }
  var sketches = svg(600, 300,
    '<defs>' +
      '<filter id="pn1"><feTurbulence type="fractalNoise" baseFrequency="0.055" numOctaves="3" seed="4" result="n"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/></filter>' +
      '<filter id="pn2"><feTurbulence type="fractalNoise" baseFrequency="0.055" numOctaves="3" seed="11" result="n"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/></filter>' +
      '<linearGradient id="desk" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#7E7269"/><stop offset="1" stop-color="#5E554E"/></linearGradient>' +
      '<radialGradient id="vig" cx="50%" cy="45%" r="72%">' +
        '<stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".34"/></radialGradient>' +
      '<filter id="sh" x="-20%" y="-20%" width="150%" height="150%">' +
        '<feDropShadow dx="3" dy="5" stdDeviation="5" flood-opacity=".35"/></filter>' +
    '</defs>' +
    '<rect width="600" height="300" fill="url(#desk)"/>' +
    '<g transform="rotate(-5 190 150)"><rect x="52" y="18" width="252" height="268" fill="#FBFAF7" filter="url(#sh)"/>' +
      sheetA(96, 54) + '</g>' +
    '<g transform="rotate(6.5 500 150)"><rect x="374" y="10" width="256" height="272" fill="#F7F5F1" filter="url(#sh)"/>' +
      sheetB(412, 44) + '</g>' +
    '<rect width="600" height="300" fill="url(#vig)"/>');

  /* ── B7 · "responsive versions" ─────────────────────────────────────────
     The same <g>, twice, the second uniformly smaller. Nothing is removed,
     nothing reflows, the type scales with the box — the narrow one IS the
     wide one, which is what week 9 exists to prevent. */
  var resp = (function () {
    var s = phone(176, 356, SCREEN['Home']);
    return svg(600, 430,
      '<rect width="600" height="430" fill="#FFFFFF"/>' +
      '<g transform="translate(56,16) scale(1.05)">' + s + '</g>' +
      t(148, 418, 'Desktop', { s: 9.5, a: 'middle' }) +
      '<g transform="translate(390,164) scale(0.62)">' + s + '</g>' +
      t(445, 418, 'Mobile', { s: 9.5, a: 'middle' }));
  })();

  window.ART = { sketches: sketches, mood: mood, tile: tile, flow: flow,
                 wires: wires, screens: screens, resp: resp };
})();
