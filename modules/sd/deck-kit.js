/* The decks' moving parts: slide navigation, the theme button, and the drawings. Everything drawn
   comes from organisms.js, journeys.js and flow-draw.js, so a slide cannot disagree with the tools.
   In the page:
     data-screen="bin:0"        one screen of a journey (data-hl="ACT-01,FBK-03" outlines organisms)
     data-parts="bin:0"         what that screen is made of, with the ones new to this journey marked
     data-strip="bin"           the whole journey, small
     data-cards="ANS-03,ANS-04" organisms as cards
     data-one="ANS-02"          one organism on its own
     data-fig="name"            a flow, from the figures the page passes to DK.figures()  */
window.DK = (function () {
  const $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const O = () => window.ORG, J = () => window.JOURNEYS;

  /* a list of pieces into an element. A piece: [id, row, words, col, span]; desktop if col is given */
  function draw(el, ps, opts = {}) {
    const { organism, canvas, desk, words, ROW, BY, dx, dw, COLS } = O();
    const d = !!opts.desktop, hl = new Set(opts.hl || []);
    const inner = ps.map(([id, row, , col, span], i) => { const o = BY[id], bleed = o.fam === 'Top' || o.bottom;
      const where = d ? (bleed ? 'left:0;width:100%' : `left:calc(${dx(col)} * var(--u));width:calc(${dw(span)} * var(--u))`) : '';
      return `<div class="dk-p${hl.has(o.code) ? ' dk-hl' : ''}" data-i="${i}" style="top:calc(${row * ROW} * var(--u));${where}">${organism(id, { label: !!opts.label, span: d ? (bleed ? COLS : span) : 0 })}</div>`; }).join('');
    const over = opts.over ? O().overlay(opts.over, ps.map(p => p[0]), '', { label: false }) : '';
    el.innerHTML = (d ? desk : canvas)(inner + over, { slots: !!opts.slots });
    el.classList.add('dk-s');
    el.querySelector('.canvas').classList.add('full');
    words(el, { text: org => { const w = org.closest('[data-i]'); return w ? ps[+w.dataset.i][2] || {} : (opts.overT || {}); } });
  }
  const screenOf = ref => { const [j, n] = ref.split(':'); return J()[j][+n]; };

  function fill() {
    const { BY, O: all, words, organism } = O(), byCode = Object.fromEntries(all.map(o => [o.code, o]));
    $$('[data-screen]').forEach(el => { const s = screenOf(el.dataset.screen);
      draw(el, s.pieces, { hl: (el.dataset.hl || '').split(',').filter(Boolean), slots: el.dataset.slots != null, label: el.dataset.label != null }); });
    $$('[data-parts]').forEach(el => { const [j, n] = el.dataset.parts.split(':'), seen = new Set();
      J()[j].slice(0, +n).forEach(s => s.pieces.forEach(p => seen.add(p[0])));
      const here = []; J()[j][+n].pieces.forEach(p => { if (!here.includes(p[0])) here.push(p[0]); });
      el.classList.add('parts');
      el.innerHTML = here.map(id => { const o = BY[id]; return `<li><span class="c">${o.code}</span><span class="n">${esc(o.name)}${seen.has(id) ? '' : '<span class="nw">new</span>'}</span><span class="j">${esc(o.does)}</span></li>`; }).join(''); });
    $$('[data-strip]').forEach(el => { const js = J()[el.dataset.strip]; el.classList.add('strip');
      el.innerHTML = js.map((s, i) => `${i ? '<span class="arr" aria-hidden="true">→</span>' : ''}<div><div class="st" data-i2="${i}"></div><p class="nm">${i + 1} · ${esc(s.name)}</p></div>`).join('');
      $$('.st', el).forEach(c => draw(c, js[+c.dataset.i2].pieces)); });
    $$('[data-cards]').forEach(el => { el.classList.add('dk-cards');
      el.innerHTML = el.dataset.cards.split(',').map(code => { const o = byCode[code.trim()], d = o.desk;
        return `<div class="dk-card${d && o.dspan > 4 ? ' w2' : ''}"><div class="fr full${o.over ? ' ov' : ''}${d ? ' desk' : ''}">${organism(o.id, { label: false })}</div>
          <div class="t"><b>${o.code}</b>${esc(o.name)}</div><div class="s">${o.size === undefined ? '' : (d ? `${O().dw(o.dspan)} × ${o.h} px` : o.size)}</div><div class="d">${esc(o.does)}</div></div>`; }).join('');
      words(el); });
    $$('[data-one]').forEach(el => { const o = byCode[el.dataset.one]; el.classList.add('full'); el.innerHTML = organism(o.id, { label: el.dataset.label != null }); words(el); });
    $$('[data-count]').forEach(el => { const c = el.dataset.count; el.textContent = c === 'all' ? all.length : c === 'phone' ? all.filter(o => !o.desk).length : ''; });
  }

  /* flow figures: the same steps and the same drawing code as the Flow maker */
  let n = 0;
  const S = (t, w, o) => Object.assign({ id: 'x' + (++n), t, w: w || '', k: 'step', bad: false, note: '', ifnot: '', go: 'stuck', back: '', from: [] }, o || {});
  const Q = (t, ifnot, o) => S(t, '', Object.assign({ k: 'q', ifnot }, o || {}));
  const Wt = t => S(t, '', { k: 'wait' });
  function figures(f) { $$('[data-fig]').forEach(el => { el.classList.add('fig'); el.innerHTML = f[el.dataset.fig] || ''; const svg = el.querySelector('svg'); if (svg) svg.setAttribute('aria-label', el.dataset.alt || 'A flow diagram'); }); }

  /* try it: a row, three answers, and the reason */
  function quiz(el, rows, labels) {
    el.classList.add('quiz');
    el.innerHTML = rows.map(([t], i) => `<div class="qi" data-i="${i}"><p>${t}</p><div class="qb" role="group" aria-label="Your answer">${Object.entries(labels).map(([k, v]) => `<button type="button" data-a="${k}">${v}</button>`).join('')}</div><p class="qr" role="status"></p></div>`).join('');
    el.addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (!b) return; const qi = b.closest('.qi'), [, ans, why] = rows[+qi.dataset.i], ok = b.dataset.a === ans;
      $$('button', qi).forEach(x => x.classList.toggle('on', x === b));
      qi.querySelector('.qr').innerHTML = (ok ? '<b>Yes.</b> ' : `<b>Not quite: ${labels[ans].toLowerCase()}.</b> `) + why; });
  }

  /* slides */
  function nav() {
    const root = document.documentElement, slides = $$('.sl'), jump = document.getElementById('jump');
    jump.innerHTML = slides.map((s, i) => `<option value="${i}">${i + 1} · ${esc(s.dataset.t)}</option>`).join('');
    let cur = 0; const present = () => root.classList.contains('present');
    function mark(i) { cur = Math.max(0, Math.min(slides.length - 1, i)); jump.value = cur;
      document.getElementById('prev').disabled = cur === 0; document.getElementById('next').disabled = cur === slides.length - 1;
      try { history.replaceState(null, '', location.pathname + location.search + '#s' + (cur + 1)); } catch (e) {} }
    function show(i, smooth) { mark(i);
      if (present()) { slides.forEach((s, k) => s.classList.toggle('on', k === cur)); scrollTo(0, 0); }
      else slides[cur].scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' }); }
    const measure = () => root.style.setProperty('--hdr', document.querySelector('header').offsetHeight + 'px');
    addEventListener('resize', measure); measure();
    const seen = new IntersectionObserver(es => { if (present()) return;
      const t = es.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (t) mark(slides.indexOf(t.target)); }, { rootMargin: '-40% 0px -55% 0px' });
    slides.forEach(s => seen.observe(s));
    jump.onchange = () => show(+jump.value, true);
    document.getElementById('prev').onclick = () => show(cur - 1, true);
    document.getElementById('next').onclick = () => show(cur + 1, true);
    document.getElementById('present').onclick = e => { root.classList.toggle('present'); e.currentTarget.setAttribute('aria-pressed', String(present())); show(cur); };
    addEventListener('keydown', e => {
      if (/SELECT|INPUT|TEXTAREA/.test(e.target.tagName) || e.altKey || e.metaKey || e.ctrlKey) return;
      if (e.key === 'ArrowRight' || (present() && (e.key === 'PageDown' || e.key === ' '))) { e.preventDefault(); show(cur + 1, true); }
      if (e.key === 'ArrowLeft' || (present() && e.key === 'PageUp')) { e.preventDefault(); show(cur - 1, true); }
      if (e.key.toLowerCase() === 'f') { if (document.fullscreenElement) document.exitFullscreen(); else root.requestFullscreen(); }
    });
    const m = parseInt((location.hash.match(/^#s(\d+)$/) || [])[1], 10);
    if (new URLSearchParams(location.search).get('view') === 'slides') { root.classList.add('present'); document.getElementById('present').setAttribute('aria-pressed', 'true'); }
    show(m ? m - 1 : 0);
  }
  function theme() {
    const root = document.documentElement;
    try { const t = localStorage.getItem('sd-theme'); if (t) root.dataset.theme = t; } catch (e) {}
    if (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches) root.dataset.theme = 'dark';
    document.getElementById('theme').onclick = () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('sd-theme', root.dataset.theme); } catch (e) {} };
  }
  /* call after any data-* the page adds of its own */
  function start() { if (window.ORG && window.JOURNEYS) fill(); nav(); theme(); }
  return { draw, S, Q, Wt, figures, quiz, start, screenOf };
})();
