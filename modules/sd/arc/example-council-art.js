/* The artefacts in the council example — the student's work, drawn.
 *
 *  NOT REAL STUDENT WORK, and not a real council. Castlegate is made up; its
 *  "before" site below is drawn by the module team to look like a typical
 *  council form, not captured from any. Phone numbers are from the 01632 960
 *  range Ofcom keeps for drama, so none of them rings anybody.
 *
 *  This is the strong example, so unlike example-art.js the work is good. The
 *  palette is the student's A5 and every pair in it passes; the screens obey
 *  A3 (8 columns, 960 max, 40 margin) and A4 (1.25 scale from 18). One flaw is
 *  drawn in on purpose: the mobile summary in `resp` keeps two columns it no
 *  longer has room for, which is what holds Criterion 1 at 72.
 *
 *    sketches  eight thumbnails, four crossed out, number 6 circled
 *    mood      swatches, type, an illustration, three words
 *    tile      the style tile — every value from A3 to A6
 *    flow      four screens and three decisions
 *    wires     four desktop wireframes, annotated
 *    s1..s4    the four finished screens, one per slide
 *    resp      screens 2 and 4 at desktop, tablet and mobile
 *    before    the council's current seven steps (D1)
 *    side      two steps, before beside after (D3)
 */
(function () {
  var P = { bg:'#FFFFFF', surface:'#F2F4F6', body:'#1F2933', quiet:'#52606D', accent:'#0B5C8E',
            focus:'#FFB81C', error:'#B42318', ok:'#1E6B3A', line:'#CBD2D9', paper:'#FBF8F1' };
  var HEAD = 'Lexend, Trebuchet MS, Verdana, sans-serif';
  var BODY = 'Atkinson Hyperlegible, Verdana, Segoe UI, sans-serif';
  var HAND = 'Bradley Hand, Chalkboard SE, Comic Sans MS, Segoe Print, cursive';
  var OLD  = 'Arial, Helvetica, sans-serif';

  function svg(w, h, body) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" role="img">' + body + '</svg>';
  }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
  function t(x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" font-family="' + (o.f || BODY) + '" font-size="' + (o.s || 18) +
      '"' + (o.w ? ' font-weight="' + o.w + '"' : '') + ' fill="' + (o.c || P.body) + '"' +
      (o.a ? ' text-anchor="' + o.a + '"' : '') + (o.ls ? ' letter-spacing="' + o.ls + '"' : '') +
      (o.op ? ' opacity="' + o.op + '"' : '') + '>' + esc(s) + '</text>';
  }
  /* SVG has no wrapping: break on words at an approximate character width */
  function para(x, y, s, chars, o) {
    o = o || {}; var lh = o.lh || (o.s || 18) * 1.5, out = '', line = '', n = 0;
    String(s).split(' ').forEach(function (w) {
      if ((line + ' ' + w).trim().length > chars) { out += t(x, y + n * lh, line.trim(), o); n++; line = w; }
      else line += ' ' + w;
    });
    return out + t(x, y + n * lh, line.trim(), o);
  }
  function lines(s, chars) { var n = 1, line = ''; String(s).split(' ').forEach(function (w) {
    if ((line + ' ' + w).trim().length > chars) { n++; line = w; } else line += ' ' + w; }); return n; }
  function r(x, y, w, h, rx, fill, stroke, sw) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + rx +
      '" fill="' + (fill || 'none') + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 1) + '"' : '') + '/>';
  }
  function ln(x1, y1, x2, y2, c, sw, dash) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + c +
      '" stroke-width="' + (sw || 1) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
  }
  function g(tx, ty, sc, body) { return '<g transform="translate(' + tx + ',' + ty + ')' + (sc ? ' scale(' + sc + ')' : '') + '">' + body + '</g>'; }

  /* ── the council's chrome (the student's design) ─────────────────────── */
  function gate(x, y, s, c) {   /* the made-up logo: a gate in a wall */
    return g(x, y, s / 24, '<path d="M2 22 V8 L6 4 L10 8 V22 M14 22 V8 L18 4 L22 8 V22 M10 12 H14 M2 22 H22" fill="none" stroke="' + c + '" stroke-width="2" stroke-linejoin="round"/>');
  }
  function browser(w, h, inner) {
    return r(0, 0, w, h, 10, '#FFFFFF', '#AEB6BF') +
      r(0, 0, w, 34, 10, '#E4E7EB') + r(0, 24, w, 10, 0, '#E4E7EB') +
      '<circle cx="18" cy="17" r="5" fill="#C9CED4"/><circle cx="36" cy="17" r="5" fill="#C9CED4"/><circle cx="54" cy="17" r="5" fill="#C9CED4"/>' +
      r(90, 8, w - 180, 18, 9, '#FFFFFF') + t(w / 2, 21, 'Council tax · student exemption', { s: 11, c: P.quiet, a: 'middle' }) +
      g(0, 34, 0, inner);
  }
  /* A3, as two layouts: desktop is 8 columns with the help panel beside the
     form; tablet is 6, and the panel drops below it. Mobile is drawn on its own. */
  var DESK = { w: 1200, M: 120, prog: 960, sx: 858, below: 0, h: 720 };
  var TAB  = { w: 768,  M: 32,  prog: 704, sx: 32,  below: 1, h: 940 };
  /* the page frame every after-screen shares: header, service bar, progress */
  function page(L, step, main, side) {
    var w = L.w, M = L.M, out = '', seg = (L.prog - 36) / 4;
    out += r(0, 0, w, 56, 0, P.accent) + gate(M, 16, 22, '#FFFFFF') +
      t(M + 32, 35, 'Castlegate City Council', { s: 16, c: '#FFFFFF', w: 700 }) +
      t(w - M, 35, 'Talk to a person', { s: 15, c: '#FFFFFF', a: 'end', w: 700 }) + ln(w - M - 118, 39, w - M, 39, '#FFFFFF', 1.2);
    out += t(M, 92, 'Council tax: student exemption', { s: 15, c: P.quiet });
    if (step) {
      out += t(w - M, 92, 'Step ' + step + ' of 4', { s: 15, c: P.quiet, a: 'end' });
      for (var i = 0; i < 4; i++) out += r(M + i * (seg + 12), 104, seg, 6, 3, i < step ? P.accent : P.line);
    }
    out += main;
    if (side) out += side;
    return out;
  }
  function backlink(x, y) { return t(x, y, '‹ Back', { s: 17, c: P.accent, w: 700 }) + ln(x + 14, y + 4, x + 58, y + 4, P.accent, 1.2); }
  function radio(x, y, w, label, on) {
    return r(x, y, w, 52, 6, on ? '#E8F1F8' : '#FFFFFF', on ? P.accent : P.line, on ? 2 : 1.5) +
      '<circle cx="' + (x + 28) + '" cy="' + (y + 26) + '" r="11" fill="#FFFFFF" stroke="' + P.body + '" stroke-width="2"/>' +
      (on ? '<circle cx="' + (x + 28) + '" cy="' + (y + 26) + '" r="5.5" fill="' + P.body + '"/>' : '') +
      t(x + 52, y + 32, label, { s: 18 });
  }
  function check(x, y, label, on, chars) {
    return r(x, y, 26, 26, 3, '#FFFFFF', P.body, 2) +
      (on ? '<path d="M' + (x + 6) + ' ' + (y + 13) + ' l5 5 l10 -11" fill="none" stroke="' + P.body + '" stroke-width="2.6"/>' : '') +
      para(x + 40, y + 19, label, chars || 58, { s: 17 });
  }
  function button(x, y, label, w) {
    w = w || (label.length * 10.5 + 48);
    return r(x, y + 4, w, 48, 6, '#08466C') + r(x, y, w, 48, 6, P.accent) + t(x + w / 2, y + 30, label, { s: 18, c: '#FFFFFF', w: 700, a: 'middle' });
  }
  function textlink(x, y, label, s) { return t(x, y, label, { s: s || 17, c: P.accent }) + ln(x, y + 4, x + label.length * (s || 17) * 0.52, y + 4, P.accent, 1.1); }
  function field(x, y, w, label, value, hint) {
    return t(x, y, label, { s: 18, w: 700 }) + (hint ? t(x, y + 24, hint, { s: 15, c: P.quiet }) : '') +
      r(x, y + (hint ? 36 : 12), w, 44, 4, '#FFFFFF', P.body, 2) + t(x + 14, y + (hint ? 64 : 40), value, { s: 18 });
  }
  function help(x, y, w, h, title, body) {
    return r(x, y, w, h, 6, P.surface) + t(x + 20, y + 34, title, { s: 18, f: HEAD, w: 600 }) + body;
  }
  var SIDEHELP = function (x, y) {
    return help(x, y, 222, 196, 'Need help?',
      para(x + 20, y + 64, 'Talk to a person about your application.', 22, { s: 15, c: P.quiet, lh: 22 }) +
      t(x + 20, y + 128, '01632 960 214', { s: 18, w: 700 }) + t(x + 20, y + 152, 'Mon–Fri, 9am to 5pm', { s: 15, c: P.quiet }) +
      textlink(x + 20, y + 180, 'Chat online', 15));
  };
  function actions(x, y, label) {
    return button(x, y, label) + textlink(x + label.length * 10.5 + 80, y + 30, 'Save and come back later');
  }

  /* ── the four screens ────────────────────────────────────────────────── */
  var W = 1200, H = 720;
  function sideAt(L, y, below) { return L.below ? [L.M, below] : [L.sx, y]; }
  var SCREEN = {
    1: function (L) {
      L = L || DESK; var M = L.M, main = backlink(M, 150) +
        para(M, 214, 'Does everyone who lives with you study full time?', 34, { s: 35, f: HEAD, w: 600, lh: 44 }) +
        t(M, 314, 'If they do, your home may not have to pay council tax.', { s: 18, c: P.quiet }) +
        radio(M, 340, 714, 'Yes, everyone', true) + radio(M, 404, 714, "No, someone doesn't", false) +
        radio(M, 468, 714, "I'm not sure", false) +
        t(M, 556, '▸ What counts as full time', { s: 17, c: P.accent, w: 700 }) +
        actions(M, 590, 'Continue');
      var a = sideAt(L, 150, 690), b2 = L.below ? [L.M + 246, 690] : [858, 372];
      var side = help(a[0], a[1], 222, 196, "You won't need",
        t(a[0] + 20, a[1] + 64, '✓  an account', { s: 17 }) + t(a[0] + 20, a[1] + 98, '✓  a council tax number', { s: 17 }) +
        t(a[0] + 20, a[1] + 132, '✓  a bill', { s: 17 }) + para(a[0] + 20, a[1] + 168, 'Five minutes, and your housemates’ names.', 22, { s: 15, c: P.quiet, lh: 20 })) +
        SIDEHELP(b2[0], b2[1]);
      return page(L, 1, main, side);
    },
    2: function (L) {
      L = L || DESK; var M = L.M, rows = [['Amara Okafor', 'Castlegate University', 'June 2028'], ['Tom Riley', 'Castlegate University', 'June 2027'],
                           ['Lin Wei', 'Castlegate College of Art', 'July 2027']];
      var main = backlink(M, 150) + t(M, 204, 'Your home and who lives there', { s: 35, f: HEAD, w: 600 }) +
        t(M, 254, 'Address', { s: 18, w: 700 }) + r(M, 268, 714, 52, 6, P.surface) +
        t(M + 18, 300, '14 Ashbourne Road, Castlegate CG4 7RT', { s: 18 }) + textlink(M + 640, 300, 'Change') +
        t(M, 358, 'Who lives here', { s: 22, f: HEAD, w: 600 }) +
        t(M, 392, 'Name', { s: 15, c: P.quiet, w: 700 }) + t(M + 250, 392, 'University or college', { s: 15, c: P.quiet, w: 700 }) +
        t(M + 540, 392, 'Course ends', { s: 15, c: P.quiet, w: 700 }) + ln(M, 402, M + 714, 402, P.line, 1.5);
      rows.forEach(function (rw, i) {
        var y = 436 + i * 46;
        main += t(M, y, rw[0], { s: 18 }) + t(M + 250, y, rw[1], { s: 18 }) + t(M + 540, y, rw[2], { s: 18 }) +
          textlink(M + 654, y, 'Edit', 15) + ln(M, y + 16, M + 714, y + 16, P.line, 1);
      });
      main += textlink(M, 598, '+ Add someone') + actions(M, 628, 'Continue');
      var a2 = sideAt(L, 150, 720); return page(L, 2, main, SIDEHELP(a2[0], a2[1]));
    },
    3: function (L) {
      L = L || DESK; var M = L.M;
      var main = backlink(M, 150) + t(M, 204, "Proof that you're students", { s: 35, f: HEAD, w: 600 }) +
        t(M, 238, 'The law asks for proof. Choose how.', { s: 18, c: P.quiet }) +
        r(M, 258, 714, 164, 6, '#E8F1F8', P.accent, 2) +
        '<circle cx="' + (M + 28) + '" cy="' + 288 + '" r="11" fill="#FFFFFF" stroke="' + P.body + '" stroke-width="2"/><circle cx="' + (M + 28) + '" cy="288" r="5.5" fill="' + P.body + '"/>' +
        t(M + 52, 294, 'Castlegate University confirms it for us', { s: 18, w: 700 }) +
        t(M + 52, 320, 'Usually within 2 working days. Nothing to upload.', { s: 15, c: P.quiet }) +
        check(M + 52, 340, 'I agree that my university can tell the council my name, course and course end date.', false, 56) +
        r(M, 434, 714, 76, 6, '#FFFFFF', P.line, 1.5) +
        '<circle cx="' + (M + 28) + '" cy="472" r="11" fill="#FFFFFF" stroke="' + P.body + '" stroke-width="2"/>' +
        t(M + 52, 466, 'Upload a student certificate', { s: 18, w: 700 }) +
        t(M + 52, 492, 'A PDF or a photo, one per person. Any size.', { s: 15, c: P.quiet }) +
        t(M, 552, 'Before you send', { s: 22, f: HEAD, w: 600 }) +
        check(M, 570, 'What I have told you is true to the best of my knowledge.', false, 62) +
        actions(M, 618, 'Send application');
      var a3 = sideAt(L, 150, 710); return page(L, 3, main, SIDEHELP(a3[0], a3[1]));
    },
    4: function (L) {
      L = L || DESK; var M = L.M;
      var main = r(M, 132, 714, 132, 6, P.ok) +
        t(M + 357, 182, 'Application sent', { s: 35, f: HEAD, w: 600, c: '#FFFFFF', a: 'middle' }) +
        t(M + 357, 216, 'Your reference', { s: 18, c: '#FFFFFF', a: 'middle' }) +
        t(M + 357, 248, 'CT-48213', { s: 28, w: 700, c: '#FFFFFF', a: 'middle' }) +
        t(M, 302, 'We have emailed this to you. Keep it — it is how we find your application.', { s: 17, c: P.quiet }) +
        t(M, 352, 'What happens next', { s: 22, f: HEAD, w: 600 });
      [['1', 'Castlegate University confirms you are students', 'usually 2 working days'],
       ['2', 'We update your council tax account', 'within 10 working days'],
       ['3', 'If you have had a bill, we send a corrected one', 'by post and email']].forEach(function (s, i) {
        var y = 384 + i * 50;
        main += '<circle cx="' + (M + 16) + '" cy="' + (y + 12) + '" r="15" fill="' + P.accent + '"/>' +
          t(M + 16, y + 18, s[0], { s: 16, c: '#FFFFFF', w: 700, a: 'middle' }) +
          t(M + 46, y + 10, s[1], { s: 18 }) + t(M + 46, y + 32, s[2], { s: 15, c: P.quiet });
      });
      main += t(M, 562, 'Your application', { s: 22, f: HEAD, w: 600 });
      [['Home', '14 Ashbourne Road, CG4 7RT'], ['People', '3 full-time students'], ['Proof', 'Your university confirms']].forEach(function (rw, i) {
        var y = 596 + i * 34;
        main += t(M, y, rw[0], { s: 17, w: 700 }) + t(M + 200, y, rw[1], { s: 17 }) + textlink(M + 640, y, 'Change', 15) +
          ln(M, y + 12, M + 714, y + 12, P.line, 1);
      });
      var a4 = sideAt(L, 132, 704); return page(L, 0, main, SIDEHELP(a4[0], a4[1]));
    }
  };
  function screen(n) { return svg(W, H + 34, browser(W, H + 34, SCREEN[n]())); }

  /* ── B7: two screens at three sizes ──────────────────────────────────── */
  function mobile2() {
    var o = r(0, 0, 375, 760, 0, '#FFFFFF') + r(0, 0, 375, 48, 0, P.accent) + gate(16, 13, 20, '#FFFFFF') +
      t(46, 30, 'Castlegate City Council', { s: 15, c: '#FFFFFF', w: 700 }) +
      t(16, 78, 'Step 2 of 4', { s: 15, c: P.quiet }) + backlink(16, 110) +
      para(16, 156, 'Your home and who lives there', 18, { s: 28, f: HEAD, w: 600, lh: 34 }) +
      t(16, 240, 'Address', { s: 17, w: 700 }) + r(16, 252, 343, 64, 6, P.surface) +
      para(30, 278, '14 Ashbourne Road, Castlegate CG4 7RT', 28, { s: 17, lh: 22 }) +
      t(16, 352, 'Who lives here', { s: 22, f: HEAD, w: 600 });
    [['Amara Okafor', 'Castlegate University · June 2028'], ['Tom Riley', 'Castlegate University · June 2027'],
     ['Lin Wei', 'Castlegate College of Art · July 2027']].forEach(function (p, i) {
      var y = 370 + i * 86;
      o += r(16, y, 343, 76, 6, '#FFFFFF', P.line, 1.5) + t(32, y + 30, p[0], { s: 17, w: 700 }) + t(32, y + 56, p[1], { s: 15, c: P.quiet }) +
        textlink(310, y + 30, 'Edit', 15);
    });
    o += textlink(16, 646, '+ Add someone') + r(16, 672, 343, 48, 6, P.accent) + t(187, 702, 'Continue', { s: 17, c: '#FFFFFF', w: 700, a: 'middle' });
    return o;
  }
  function mobile4() {
    var o = r(0, 0, 375, 760, 0, '#FFFFFF') + r(0, 0, 375, 48, 0, P.accent) + gate(16, 13, 20, '#FFFFFF') +
      t(46, 30, 'Castlegate City Council', { s: 15, c: '#FFFFFF', w: 700 }) +
      r(16, 68, 343, 150, 6, P.ok) + t(187, 114, 'Application sent', { s: 28, f: HEAD, w: 600, c: '#FFFFFF', a: 'middle' }) +
      t(187, 150, 'Your reference', { s: 17, c: '#FFFFFF', a: 'middle' }) + t(187, 186, 'CT-48213', { s: 26, w: 700, c: '#FFFFFF', a: 'middle' }) +
      t(16, 258, 'What happens next', { s: 22, f: HEAD, w: 600 }) +
      para(16, 290, '1  The university confirms — usually 2 working days', 34, { s: 16, lh: 22 }) +
      para(16, 344, '2  We update your account — within 10 working days', 34, { s: 16, lh: 22 }) +
      t(16, 424, 'Your application', { s: 22, f: HEAD, w: 600 });
    /* the flaw: still two columns at 375, so the values wrap into a sliver */
    [['Home', '14 Ashbourne Road, CG4 7RT'], ['People', '3 full-time students'], ['Proof', 'Your university confirms']].forEach(function (rw, i) {
      var y = 460 + i * 78;
      o += t(16, y, rw[0], { s: 16, w: 700 }) + para(120, y, rw[1], 14, { s: 16, lh: 21 }) + textlink(300, y, 'Change', 14) +
        ln(16, y + 56, 359, y + 56, P.line, 1);
    });
    return o;
  }
  var resp = (function () {
    var o = r(0, 0, 1200, 860, 0, '#FFFFFF');
    [[2, 30], [4, 450]].forEach(function (row) {
      var n = row[0], y = row[1];
      o += g(20, y, 0.36, browser(W, H + 34, SCREEN[n]())) + t(236, y + 290, 'Desktop · 1024+', { s: 14, c: P.quiet, a: 'middle' });
      o += g(500, y - 6, 0.4, r(-14, -14, 796, 968, 26, '#1F2933') + r(0, 0, 768, 940, 8, '#FFFFFF') +
             '<clipPath id="tb' + n + '"><rect width="768" height="940" rx="8"/></clipPath><g clip-path="url(#tb' + n + ')">' +
             SCREEN[n](TAB) + '</g>') +
           t(654, y + 390, 'Tablet · 768', { s: 14, c: P.quiet, a: 'middle' });
      o += g(860, y - 6, 0.5, r(-8, -8, 391, 776, 22, '#1F2933') + '<clipPath id="mb' + n + '"><rect width="375" height="760" rx="16"/></clipPath><g clip-path="url(#mb' + n + ')">' +
             (n === 2 ? mobile2() : mobile4()) + '</g>') +
           t(954, y + 390, 'Mobile · 375', { s: 14, c: P.quiet, a: 'middle' });
      o += t(20, y - 8, 'Screen ' + n, { s: 15, w: 700 });
    });
    return svg(1200, 860, o);
  })();

  /* ── B1 sketches ─────────────────────────────────────────────────────── */
  var sketches = (function () {
    var o = r(0, 0, 1200, 640, 0, P.paper);
    for (var i = 0; i < 8; i++) {
      var col = i % 4, row = Math.floor(i / 4), x = 40 + col * 290, y = 40 + row * 300;
      var stroke = '#4B4F55', crossed = [0, 1, 3, 4].indexOf(i) >= 0;
      o += '<rect x="' + x + '" y="' + y + '" width="250" height="180" fill="none" stroke="' + stroke + '" stroke-width="1.6" transform="rotate(' + ((i % 3) - 1) * 0.6 + ' ' + (x + 125) + ' ' + (y + 90) + ')"/>';
      o += ln(x, y + 22, x + 250, y + 22, stroke, 1.2);
      if (crossed) {   /* a list of exemptions, the old site's idea */
        for (var k = 0; k < 6; k++) o += ln(x + 16, y + 44 + k * 20, x + 200 - (k % 3) * 30, y + 44 + k * 20, stroke, 1.4);
        o += ln(x + 4, y + 4, x + 246, y + 176, '#B42318', 2.4) + ln(x + 246, y + 4, x + 4, y + 176, '#B42318', 2.4);
      } else if (i === 2) {   /* a seven-step progress bar */
        for (var k2 = 0; k2 < 7; k2++) o += r(x + 16 + k2 * 32, y + 36, 26, 8, 2, 'none', stroke, 1.2);
        o += ln(x + 16, y + 70, x + 200, y + 70, stroke, 1.6) + r(x + 16, y + 92, 210, 26, 3, 'none', stroke, 1.2) + r(x + 16, y + 130, 80, 28, 4, 'none', stroke, 1.4);
      } else {
        o += ln(x + 16, y + 52, x + (i === 5 ? 226 : 180), y + 52, stroke, 3) + ln(x + 16, y + 66, x + 150, y + 66, stroke, 2);
        o += r(x + 16, y + 82, 150, 18, 3, 'none', stroke, 1.2) + r(x + 16, y + 106, 150, 18, 3, 'none', stroke, 1.2);
        if (i === 5) o += r(x + 16, y + 130, 150, 18, 3, 'none', stroke, 1.2) + r(x + 180, y + 82, 54, 66, 3, 'none', stroke, 1.2);
        o += r(x + 16, y + 152, 64, 20, 4, 'none', stroke, 1.4);
      }
      o += t(x + 6, y + 214, String(i + 1), { f: HAND, s: 22, c: '#4B4F55' });
      if (i === 5) o += '<ellipse cx="' + (x + 125) + '" cy="' + (y + 92) + '" rx="150" ry="118" fill="none" stroke="#0B5C8E" stroke-width="2.4"/>' +
        t(x + 40, y + 246, 'this one — one Q about the whole house', { f: HAND, s: 18, c: '#0B5C8E' });
      if (i === 2) o += t(x + 30, y + 214, '7 steps = the before?', { f: HAND, s: 17, c: '#4B4F55' });
    }
    return svg(1200, 640, o);
  })();

  /* ── B2 mood board ───────────────────────────────────────────────────── */
  var mood = (function () {
    var o = r(0, 0, 1200, 640, 0, '#ECEAE5');
    /* the terrace, as an illustration (the AI one stays described, not shown) */
    o += r(40, 40, 520, 340, 4, '#DCE6EE');
    for (var i = 0; i < 5; i++) {
      var x = 60 + i * 98;
      o += '<path d="M' + x + ' 360 V210 L' + (x + 49) + ' 160 L' + (x + 98) + ' 210 V360 Z" fill="' + ['#C9B79C', '#B9A486', '#C9B79C', '#D3C4AC', '#B9A486'][i] + '" stroke="#6B5E4B" stroke-width="1.4"/>' +
        r(x + 14, 228, 26, 34, 1, '#F7F3EA', '#6B5E4B') + r(x + 58, 228, 26, 34, 1, '#F7F3EA', '#6B5E4B') + r(x + 36, 296, 26, 64, 1, ['#0B5C8E', '#1F2933', '#B42318', '#1E6B3A', '#0B5C8E'][i]);
    }
    o += t(52, 404, 'AI-generated (Firefly) — kept on the board only', { s: 13, c: '#52606D' });
    /* swatches */
    [['#0B5C8E', 'Town hall navy'], ['#1F2933', 'Ink'], ['#F2F4F6', 'Paper'], ['#FFB81C', 'Look here'], ['#1E6B3A', 'Done']].forEach(function (c, i) {
      o += r(600 + i * 112, 40, 96, 96, 4, c[0], '#AEB6BF') + t(600 + i * 112, 158, c[1], { s: 14, c: '#1F2933' });
    });
    o += t(600, 230, 'Aa', { f: HEAD, s: 72, w: 600 }) + t(720, 214, 'Lexend', { s: 18, w: 700 }) + t(720, 238, 'questions only', { s: 15, c: '#52606D' });
    o += t(600, 330, 'Aa', { s: 72 }) + t(720, 314, 'Atkinson Hyperlegible', { s: 18, w: 700 }) + t(720, 338, 'I, l and 1 never look alike', { s: 15, c: '#52606D' });
    [['calm', -3, '#FFF2C4'], ['official', 2, '#E8F1F8'], ['human', -1, '#E3F0E8']].forEach(function (w, i) {
      var x = 70 + i * 360;
      o += '<g transform="rotate(' + w[1] + ' ' + (x + 120) + ' 520)">' + r(x, 440, 240, 150, 3, w[2], '#C8C2B6') +
        t(x + 120, 530, w[0], { f: HAND, s: 44, c: '#1F2933', a: 'middle' }) + '</g>';
    });
    return svg(1200, 640, o);
  })();

  /* ── B3 style tile ───────────────────────────────────────────────────── */
  var tile = (function () {
    var o = r(0, 0, 1200, 680, 0, '#FFFFFF');
    o += t(40, 52, 'Castlegate council tax · style tile', { s: 15, c: P.quiet });
    [['#FFFFFF', 'Background', '—'], ['#F2F4F6', 'Surface', '—'], ['#1F2933', 'Body', '14.76:1'], ['#52606D', 'Quiet', '6.46:1'],
     ['#0B5C8E', 'Accent', '7.15:1'], ['#B42318', 'Error', '6.57:1']].forEach(function (c, i) {
      o += r(40 + i * 96, 72, 80, 80, 4, c[0], '#CBD2D9') + t(40 + i * 96, 172, c[1], { s: 12.5, w: 700 }) +
        t(40 + i * 96, 192, c[0], { s: 12, c: P.quiet }) + t(40 + i * 96, 210, c[2], { s: 12, c: P.quiet });
    });
    var ty = 270;
    [[35, 'The question', HEAD, 600], [28, 'Section heads', HEAD, 600], [22, 'Field labels', HEAD, 600], [18, 'Body text you read', BODY, 400], [15, 'Hints only', BODY, 400]].forEach(function (s) {
      o += t(40, ty, s[1], { s: s[0], f: s[2], w: s[3], c: s[0] === 15 ? P.quiet : P.body }) + t(560, ty, s[0] + ' px', { s: 13, c: P.quiet, a: 'end' });
      ty += s[0] * 1.5 + 6;
    });
    o += t(40, 560, '1.25 scale · 18 px base · 1.5 line height · 66 characters', { s: 14, c: P.quiet });
    /* components */
    o += button(640, 72, 'Continue') + textlink(820, 102, 'Save and come back later', 16);
    o += radio(640, 150, 500, 'Yes, everyone', true) + radio(640, 212, 500, "No, someone doesn't", false);
    o += t(640, 302, 'Postcode', { s: 18, w: 700 }) + r(640, 312, 260, 48, 4, P.focus) + r(640, 312, 260, 44, 4, '#FFFFFF', P.body, 2) +
      r(640, 356, 260, 4, 0, P.body) + t(654, 342, 'CG4 7RT', { s: 18 }) + t(912, 342, '← focus: yellow + dark bar', { s: 13, c: P.quiet });
    o += r(640, 392, 500, 72, 4, '#FFFFFF') + r(640, 392, 5, 72, 0, P.error) +
      t(660, 418, '⚠ Error:', { s: 17, c: P.error, w: 700 }) + t(744, 418, 'Enter a postcode, like CG4 7RT', { s: 17, c: P.error }) +
      r(660, 428, 260, 30, 4, '#FFFFFF', P.error, 2);
    /* spacing */
    o += t(640, 520, 'Spacing', { s: 15, w: 700 });
    [4, 8, 16, 24, 40, 64].forEach(function (s, i) { o += r(640 + i * 80, 540, s, s, 0, P.accent) + t(640 + i * 80, 630, s, { s: 13, c: P.quiet }); });
    return svg(1200, 680, o);
  })();

  /* ── B4 flow ─────────────────────────────────────────────────────────── */
  var flow = (function () {
    var o = r(0, 0, 1200, 560, 0, '#FFFFFF') +
      '<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#1F2933"/></marker></defs>';
    function box(x, y, w, label, sub, fill) {
      return r(x, y, w, 64, 8, fill || '#E8F1F8', P.accent, 2) + t(x + w / 2, y + (sub ? 28 : 38), label, { s: 17, w: 700, a: 'middle' }) +
        (sub ? t(x + w / 2, y + 50, sub, { s: 13, c: P.quiet, a: 'middle' }) : '');
    }
    function dia(cx, cy, label) {
      return '<path d="M' + cx + ' ' + (cy - 44) + ' L' + (cx + 74) + ' ' + cy + ' L' + cx + ' ' + (cy + 44) + ' L' + (cx - 74) + ' ' + cy + ' Z" fill="#FFF7E0" stroke="#B07B00" stroke-width="2"/>' +
        t(cx, cy + 6, label, { s: 15, w: 700, a: 'middle' });
    }
    function arrow(x1, y1, x2, y2, label, lx, ly) {
      return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#1F2933" stroke-width="1.8" marker-end="url(#ar)"/>' +
        (label ? t(lx, ly, label, { s: 13, c: P.quiet, a: 'middle' }) : '');
    }
    o += r(30, 168, 120, 48, 24, '#FFFFFF', P.body, 2) + t(90, 198, 'Search', { s: 16, a: 'middle', w: 700 });
    o += arrow(150, 192, 196, 192) + box(200, 160, 170, '1  Start', 'all students?');
    o += arrow(370, 192, 426, 192) + dia(500, 192, 'Everyone?');
    o += arrow(574, 192, 626, 192, 'yes', 600, 182) + box(630, 160, 170, '2  Your home', 'address + people');
    o += arrow(800, 192, 846, 192) + dia(920, 192, 'Proof?');
    o += arrow(920, 236, 920, 290, 'university', 966, 268) + box(840, 294, 160, 'University', 'confirms', '#FFFFFF');
    o += arrow(994, 192, 1040, 192, 'upload', 1018, 182) + box(1044, 160, 136, 'Upload', 'certificate', '#FFFFFF');
    o += arrow(920, 358, 920, 404) + arrow(1112, 224, 1000, 404) + box(840, 408, 160, '3  Send', 'declaration');
    o += arrow(840, 440, 760, 440) + box(560, 408, 200, '4  Sent', 'reference CT-…', '#E3F0E8');
    o += arrow(500, 236, 500, 290, "no", 518, 268) + box(410, 294, 180, 'Other discounts', '25% single person …', '#FFFFFF');
    o += arrow(426, 192, 426, 192);
    o += arrow(470, 166, 330, 96) + r(160, 60, 200, 48, 8, '#FFFFFF', P.quiet, 1.5) + t(260, 90, "Not sure → talk to a person", { s: 14, a: 'middle' });
    o += t(30, 520, 'Every screen: ‹ Back · Save and come back later (email link) · Talk to a person', { s: 15, c: P.quiet });
    return svg(1200, 560, o);
  })();

  /* ── B5 wireframes ───────────────────────────────────────────────────── */
  var wires = (function () {
    var G = '#9AA5B1', L = '#D9DEE3', o = r(0, 0, 1200, 760, 0, '#FFFFFF');
    var notes = ['question first, before the logo has done its job', 'list grows in place — no reload',
                 'faster route first, upload second', 'reference big; what next in dates'];
    for (var i = 0; i < 4; i++) {
      var x = 30 + (i % 2) * 590, y = 30 + Math.floor(i / 2) * 370, w = 560, h = 330;
      o += r(x, y, w, h, 6, '#FFFFFF', G, 1.6) + r(x, y, w, 26, 6, L) + r(x, y + 16, w, 10, 0, L);
      for (var c = 0; c < 8; c++) o += r(x + 20 + c * 66.5, y + 36, 58, h - 46, 0, 'rgba(11,92,142,0.04)');
      o += r(x + 20, y + 44, 120, 8, 4, L) + r(x + 20, y + 70, 360, 22, 4, G) + r(x + 20, y + 100, 260, 10, 5, L);
      if (i === 0) for (var k = 0; k < 3; k++) o += r(x + 20, y + 126 + k * 36, 380, 28, 4, '#FFFFFF', G, 1.4);
      if (i === 1) { o += r(x + 20, y + 124, 380, 30, 4, L); for (var k1 = 0; k1 < 3; k1++) o += ln(x + 20, y + 180 + k1 * 28, x + 400, y + 180 + k1 * 28, G, 1.2); }
      if (i === 2) { o += r(x + 20, y + 120, 380, 80, 4, '#FFFFFF', G, 2) + r(x + 20, y + 210, 380, 40, 4, '#FFFFFF', G, 1.2); }
      if (i === 3) { o += r(x + 20, y + 116, 380, 60, 4, G); for (var k3 = 0; k3 < 3; k3++) o += r(x + 20, y + 190 + k3 * 18, 260, 8, 4, L); }
      o += r(x + 20, y + h - 52, 110, 30, 5, G) + r(x + 150, y + h - 42, 140, 8, 4, L);
      o += r(x + 426, y + 70, 114, 120, 4, L);
      o += t(x + 20, y + h + 26, (i + 1) + ' · ' + notes[i], { f: HAND, s: 17, c: '#0B5C8E' });
    }
    return svg(1200, 760, o);
  })();

  /* ── D1: the council's current seven steps (drawn, not captured) ─────── */
  var before = (function () {
    var o = r(0, 0, 1200, 760, 0, '#E9ECEF');
    var titles = ['Discounts and exemptions', 'Sign in or create an account', 'Your council tax account', 'Select exemption type',
                  'Residents (1 of ?)', 'Supporting evidence', 'Declaration'];
    function shell(x, y, n, inner) {
      return r(x, y, 270, 330, 4, '#FFFFFF', '#9AA5B1') + r(x, y, 270, 30, 4, '#5A6570') + r(x, y + 26, 270, 4, 0, '#5A6570') +
        t(x + 10, y + 19, 'CASTLEGATE CITY COUNCIL', { f: OLD, s: 9, c: '#FFFFFF', w: 700 }) + t(x + 260, y + 19, 'Revenues & Benefits', { f: OLD, s: 8, c: '#DDE2E6', a: 'end' }) +
        t(x + 10, y + 52, titles[n - 1], { f: OLD, s: 13, w: 700, c: '#222' }) + inner +
        '<circle cx="' + (x + 250) + '" cy="' + (y + 310) + '" r="15" fill="#B42318"/>' + t(x + 250, y + 316, String(n), { s: 16, w: 700, c: '#FFFFFF', a: 'middle' });
    }
    var body = [
      function (x, y) { var s = ''; for (var i = 0; i < 14; i++) s += t(x + 10, y + 76 + i * 15, '› ' + ['Class A', 'Class B', 'Class C', 'Class D', 'Class E', 'Class F', 'Class G', 'Class H', 'Class I', 'Class J', 'Class K', 'Class L', 'Class M', 'Class N — occupied only by students'][i] + (i < 13 ? ' — ' + 'unoccupied and…'.slice(0, 8 + i % 5) : ''), { f: OLD, s: 9.5, c: '#1A5DAB' }); return s; },
      function (x, y) { return t(x + 10, y + 80, 'Email', { f: OLD, s: 10 }) + r(x + 10, y + 86, 200, 18, 0, '#FFF', '#888') + t(x + 10, y + 124, 'Password (8+ chars, 1 symbol)', { f: OLD, s: 10 }) + r(x + 10, y + 130, 200, 18, 0, '#FFF', '#888') + r(x + 10, y + 160, 70, 20, 0, '#DDD', '#888') + t(x + 45, y + 174, 'Register', { f: OLD, s: 10, a: 'middle' }) + para(x + 10, y + 206, 'A verification code has been sent. Check your inbox and junk folder before continuing.', 44, { f: OLD, s: 9.5, c: '#555', lh: 14 }); },
      function (x, y) { return t(x + 10, y + 80, 'Council tax account number *', { f: OLD, s: 10 }) + r(x + 10, y + 86, 200, 18, 0, '#FFF', '#888') + t(x + 10, y + 118, '(10 digits — see top right of your bill)', { f: OLD, s: 9, c: '#777' }) + t(x + 10, y + 146, 'Date you became liable *', { f: OLD, s: 10 }) + r(x + 10, y + 152, 120, 18, 0, '#FFF', '#888') + t(x + 10, y + 194, '✕ Account number not recognised', { f: OLD, s: 10, c: '#C00' }); },
      function (x, y) { var s = r(x + 10, y + 70, 240, 20, 0, '#FFF', '#888') + t(x + 16, y + 84, '-- Please select --  ▾', { f: OLD, s: 10 }) + r(x + 10, y + 92, 240, 170, 0, '#FFF', '#888'); for (var i = 0; i < 11; i++) s += t(x + 16, y + 108 + i * 15, 'Class ' + 'ABCDEFGHIJKLMNOPQRSTUVW'[i + 5] + ' — ' + ['repossessed', 'held by trustee', 'annexe', 'bankruptcy', 'unoccupied', 'Crown', 'students', 'under 18', 'severely impaired', 'diplomats', 'care leaver'][i], { f: OLD, s: 9.5, c: i === 7 ? '#FFF' : '#222' }) + (i === 7 ? '' : ''); return r(x + 11, y + 207, 238, 14, 0, '#1A5DAB') + s; },
      function (x, y) { return t(x + 10, y + 80, 'Resident name *', { f: OLD, s: 10 }) + r(x + 10, y + 86, 200, 18, 0, '#FFF', '#888') + t(x + 10, y + 120, 'Date of birth *', { f: OLD, s: 10 }) + r(x + 10, y + 126, 120, 18, 0, '#FFF', '#888') + t(x + 10, y + 160, 'Student? ( ) Yes ( ) No', { f: OLD, s: 10 }) + r(x + 10, y + 180, 150, 20, 0, '#DDD', '#888') + t(x + 85, y + 194, 'Save and add another', { f: OLD, s: 10, a: 'middle' }) + t(x + 10, y + 224, 'Page reloads for each person', { f: OLD, s: 9, c: '#777' }); },
      function (x, y) { return t(x + 10, y + 80, 'Upload evidence for: Resident 1', { f: OLD, s: 10 }) + r(x + 10, y + 86, 200, 18, 0, '#FFF', '#888') + t(x + 16, y + 99, 'Browse…  no file selected', { f: OLD, s: 9.5 }) + para(x + 10, y + 128, 'PDF only. Max 2MB. Must be an official certificate dated within the current academic year, obtained from your institution.', 44, { f: OLD, s: 9.5, c: '#555', lh: 14 }) + t(x + 10, y + 206, '✕ File too large (3.4MB)', { f: OLD, s: 10, c: '#C00' }); },
      function (x, y) { return para(x + 10, y + 74, 'I declare that the information provided is true and complete. I understand that providing false information may result in prosecution under the Council Tax (Administration and Enforcement) Regulations 1992 and that the council may share data…', 46, { f: OLD, s: 8.5, c: '#444', lh: 12 }) + r(x + 10, y + 168, 12, 12, 0, '#FFF', '#888') + t(x + 28, y + 178, 'I agree', { f: OLD, s: 10 }) + r(x + 10, y + 196, 70, 20, 0, '#DDD', '#888') + t(x + 45, y + 210, 'Submit', { f: OLD, s: 10, a: 'middle' }) + t(x + 10, y + 250, 'Thank you. We will contact you', { f: OLD, s: 10, w: 700 }) + t(x + 10, y + 264, 'within 28 days.', { f: OLD, s: 10, w: 700 }); }
    ];
    for (var i = 0; i < 7; i++) {
      var x = (i < 4 ? 30 + i * 290 : 175 + (i - 4) * 290), y = i < 4 ? 30 : 400;
      o += shell(x, y, i + 1, body[i](x, y));
    }
    return svg(1200, 760, o);
  })();

  /* ── D3: side by side ────────────────────────────────────────────────── */
  var side = (function () {
    var o = r(0, 0, 1200, 760, 0, '#FFFFFF');
    function pair(y, beforeN, afterN, label) {
      var bx = before.match(/<svg[^>]*>([\s\S]*)<\/svg>/)[1];
      var pos = beforeN < 4 ? [30 + (beforeN) * 290, 30] : [175 + (beforeN - 4) * 290, 400];
      return t(40, y - 10, label, { s: 17, w: 700 }) +
        t(300, y + 12, 'Before', { s: 14, c: P.quiet, a: 'middle' }) + t(860, y + 12, 'After', { s: 14, c: P.quiet, a: 'middle' }) +
        '<svg x="150" y="' + (y + 22) + '" width="300" height="300" viewBox="' + pos[0] + ' ' + pos[1] + ' 270 330">' + bx + '</svg>' +
        '<text x="600" y="' + (y + 180) + '" font-size="40" text-anchor="middle" fill="' + P.accent + '">→</text>' +
        g(680, y + 32, 0.38, browser(W, H + 34, SCREEN[afterN]()));
    }
    o += pair(40, 3, 1, '"Select exemption type" → one question about the house');
    o += pair(420, 5, 3, '"A PDF per person, under 2 MB" → the university confirms it');
    return svg(1200, 760, o);
  })();

  window.ART = { sketches: sketches, mood: mood, tile: tile, flow: flow, wires: wires,
                 s1: screen(1), s2: screen(2), s3: screen(3), s4: screen(4),
                 resp: resp, before: before, side: side };
})();
