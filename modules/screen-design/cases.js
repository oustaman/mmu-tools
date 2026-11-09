/* Before and after — the walkthrough, shared by every case page.
 *
 *  A case is a run of <section class="ws"> slides. Each slide has a screen
 *  (.stagec) with numbered pins and optional rings marking a region, and a
 *  pane (.pane) with a list item per number. Point at a number in either and
 *  both light up, so a reader always knows which part of the screen a
 *  sentence is about.
 *
 *  data-tags="A2 D1" on anything turns into links to those sections of the
 *  checklist, named from PARTS in sd-common.js — the same names the deck uses,
 *  so "this is what C5 looks like" is one click from "fill in C5".
 *
 *  Keys: ← → move; the slide is in the address (#s4) so a link can open it.
 */
(function () {
  const NAMES = {};
  try { PARTS.forEach(p => p.items.forEach(x => { NAMES[x.sec] = x.t; })); } catch (e) {}
  document.querySelectorAll('[data-tags]').forEach(el => {
    const box = document.createElement('span'); box.className = 'chips';
    box.innerHTML = el.dataset.tags.trim().split(/\s+/).map(s =>
      `<a class="chip" href="assessment.html#${s}" title="Open ${s} on the checklist"><i>${s}</i>${NAMES[s] || ''}</a>`).join('');
    el.appendChild(box);
  });

  const slides = [...document.querySelectorAll('.ws')];
  const nav = document.getElementById('wtnav'), ct = document.getElementById('wtct');
  const prev = document.getElementById('wtprev'), next = document.getElementById('wtnext');
  /* the slide chips, grouped by phase so "now" and "improved" read as two runs */
  const groups = [];
  slides.forEach((s, i) => {
    const g = s.dataset.group || '';
    let grp = groups.find(x => x.g === g); if (!grp) groups.push(grp = { g, items: [] });
    grp.items.push(i);
  });
  nav.innerHTML = groups.map(grp => `<span class="grp">${grp.g ? `<i>${grp.g}</i>` : ''}${grp.items.map(i =>
    `<button type="button" data-i="${i}" class="${slides[i].dataset.kind || ''}" title="${slides[i].dataset.title}">${slides[i].dataset.short || i + 1}</button>`).join('')}</span>`).join('');

  /* Pins and rings are not placed by hand. Anything on a screen marked
     data-t="4" gets a ring around it and number 4 on its corner, measured from
     the element itself once its slide is showing — hand-placed pins drift the
     moment a line of text wraps differently. data-pin="tl" puts the number on
     the top-left corner instead of the top-right. */
  function place(s) {
    const scr = s.querySelector('.scr'); if (!scr) return;
    scr.querySelectorAll('.pin.auto, .ring.auto').forEach(e => e.remove());
    const kind = s.dataset.kind === 'new' ? 'good' : 'bad', done = new Set(), spots = [];
    scr.querySelectorAll('[data-t]').forEach(t => {
      let x = 0, y = 0, el = t;
      while (el && el !== scr) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
      const w = t.offsetWidth, h = t.offsetHeight, n = t.dataset.t;
      const ring = document.createElement('span'); ring.className = 'ring auto'; ring.dataset.n = n;
      Object.assign(ring.style, { left: `${x - 4}px`, top: `${y - 4}px`, width: `${w + 8}px`, height: `${h + 8}px` });
      scr.appendChild(ring);
      if (done.has(n)) return; done.add(n);
      const pin = document.createElement('span'); pin.className = `pin ${kind} auto`; pin.dataset.n = n; pin.textContent = n;
      const px = Math.max(18, t.dataset.pin === 'tl' ? x : Math.min(x + w, 360 - 18));
      let py = Math.max(18, y);
      /* two targets can share a corner (a bin inside the row of bins): step the
         later number down until it no longer sits on an earlier one */
      while (spots.some(([a, b]) => Math.abs(a - px) < 34 && Math.abs(b - py) < 34)) py += 36;
      spots.push([px, py]);
      Object.assign(pin.style, { left: `${px}px`, top: `${py}px` });
      scr.appendChild(pin);
    });
    wire(s);
  }

  let cur = 0;
  function show(i, scroll) {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach((s, k) => s.classList.toggle('on', k === cur));
    place(slides[cur]);
    nav.querySelectorAll('button').forEach(b => b.setAttribute('aria-current', String(+b.dataset.i === cur)));
    ct.textContent = `${cur + 1} of ${slides.length} · ${slides[cur].dataset.title}`;
    prev.disabled = cur === 0; next.disabled = cur === slides.length - 1;
    try { history.replaceState(null, '', `${location.pathname}${location.search}#s${cur + 1}`); } catch (e) {}
    if (scroll) document.getElementById('wt').scrollIntoView({ block: 'start' });
  }
  nav.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) show(+b.dataset.i, true); });
  prev.onclick = () => show(cur - 1, true);
  next.onclick = () => show(cur + 1, true);
  addEventListener('keydown', e => {
    if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName) || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1, true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1, true); }
  });

  /* a number on the screen and the same number in the pane light up together */
  function wire(s) {
    const light = (n, on) => s.querySelectorAll(`[data-n="${n}"]`).forEach(el => el.classList.toggle('hot', on));
    s.querySelectorAll('[data-n]:not([data-wired])').forEach(el => {
      el.dataset.wired = '1';
      const n = el.dataset.n;
      el.addEventListener('mouseenter', () => light(n, true));
      el.addEventListener('mouseleave', () => light(n, false));
      el.addEventListener('focusin', () => light(n, true));
      el.addEventListener('focusout', () => light(n, false));
      if (el.classList.contains('pin')) {
        el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button');
        el.setAttribute('aria-label', `Point ${n}: ${(s.querySelector(`li[data-n="${n}"] b`) || {}).textContent || ''}`);
        el.addEventListener('click', () => { const li = s.querySelector(`li[data-n="${n}"]`); if (li) { li.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); light(n, true); setTimeout(() => light(n, false), 1400); } });
      }
    });
  }
  slides.forEach(wire);
  /* the screens use a web font; measure again once it has loaded */
  if (document.fonts) document.fonts.ready.then(() => place(slides[cur]));
  addEventListener('load', () => place(slides[cur]));

  const n = parseInt((location.hash.match(/^#s(\d+)$/) || [])[1], 10);
  show(n ? n - 1 : 0);
})();
