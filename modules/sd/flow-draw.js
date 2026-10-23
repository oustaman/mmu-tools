/* Drawing for flows: shared by the Flow maker (flow.html) and the guide to how flows work
   (flow-guide.html). Pure functions: a list of steps in, SVG out. A step is
   {id, t: text, w: where, k: 'step'|'q'|'wait', bad, note, ifnot, go: 'stuck'|'back', back, from: [ids]}. */
(function () {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const nums = list => { const m = {}; let n = 0; list.forEach(x => { if (x.k !== 'wait') m[x.id] = ++n; }); return m; };
  const counts = list => ({ steps: list.filter(x => x.k !== 'wait').length, waits: list.filter(x => x.k === 'wait').length,
    stuck: list.filter(x => x.bad || (x.k === 'q' && x.ifnot && x.go === 'stuck')).length, loops: list.filter(x => x.k === 'q' && x.ifnot && x.go === 'back').length });

  /* what happened to each step now: the D2 vocabulary */
  /* What happened to each step now — the brief's own words for D2: kept, merged, moved or
     removed (and new, for a screen nothing came from). Renaming a step does not change what it
     is: one step now, one screen after, is kept. */
  function fatesOf(before, after) {
    const an = nums(after), pos = {}; after.forEach((a, i) => { pos[a.id] = i; });
    const out = {}; let maxPos = -1;
    before.forEach(b => {
      const refs = after.filter(a => (a.from || []).includes(b.id));
      if (!refs.length) { out[b.id] = { kind: 'removed', label: 'Removed' }; return; }
      const r = refs[0], to = an[r.id] ? `step ${an[r.id]}` : 'a wait', moved = pos[r.id] < maxPos;
      maxPos = Math.max(maxPos, pos[r.id]);
      const kind = r.from.length > 1 ? 'merged' : moved ? 'moved' : 'kept';
      const label = (kind === 'merged' ? `Merged into ${to}` : kind === 'moved' ? `Moved → ${to}` : `Kept → ${to}`) + (kind === 'merged' && moved ? ', moved' : '');
      out[b.id] = { kind, label, to: an[r.id] };
    });
    return out;
  }

  const wrap = (s, max) => { const out = []; let line = ''; String(s).split(/\s+/).forEach(w => { if ((line + ' ' + w).trim().length > max) { if (line) out.push(line); line = w; } else line = (line + ' ' + w).trim(); }); if (line) out.push(line); return out.length ? out : ['']; };
  const clip = (lines, n) => lines.length <= n ? lines : [...lines.slice(0, n - 1), lines[n - 1].replace(/[,.;:]?$/, '') + '…'];
  const T = (lines, x, y, lh, attrs) => `<text ${attrs} text-anchor="middle">${lines.map((l, i) => `<tspan x="${x}" y="${y + i * lh}">${esc(l)}</tspan>`).join('')}</text>`;
  const COL = { ink: '#1A1618', mute: '#5A5352', box: '#FFFFFF', line: '#1A1618', q: '#FFF4D6', qs: '#8A6100', wait: '#F1EFEC', bad: '#B3261E', badf: '#FCEAE8', ok: '#285638', okf: '#E3EFE7', loop: '#1A526D', rm: '#8E8685' };

  function band(list, x0, y0, bw0, bh0, label, sub, F, one) {
    const out = [], N = nums(list), items = list, head = label ? 82 : 0;
    if (label) out.push(`<text x="${x0}" y="${y0 + 26}" font-size="24" font-weight="800" letter-spacing="2" fill="${COL.ink}">${esc(label)}</text>`,
      `<text x="${x0}" y="${y0 + 56}" font-size="19" fill="${COL.mute}">${esc(sub)}</text>`);
    if (!items.length) { out.push(`<text x="${x0}" y="${y0 + 120}" font-size="22" fill="${COL.mute}">Nothing here yet.</text>`); return out.join(''); }
    const hasLoop = items.some(x => x.k === 'q' && x.ifnot && x.go === 'back'), top = y0 + head + (hasLoop ? 40 : 14), h = bh0 - (top - y0);
    const units = x => x.k === 'wait' ? 0.72 : x.k === 'q' ? 1.3 : 1;
    const lim = one ? 11 : 8, per = items.length <= lim ? items.length : items.length <= 2 * lim ? Math.ceil(items.length / 2) : Math.ceil(items.length / 3);
    const rows = []; for (let i = 0; i < items.length; i += per) rows.push(items.slice(i, i + per));
    const gap = per > 8 ? 40 : 54, maxU = Math.max(...rows.map(r => r.reduce((s, x) => s + units(x), 0)));
    const maxN = Math.max(...rows.map(r => r.length));
    const bw = Math.min(250, (bw0 - (maxN - 1) * gap) / maxU);
    const rowH = h / rows.length, bh = Math.min(120, rowH - (rowH < 230 ? 74 : 92)), fs = bw < 150 ? 15 : 17, cpl = Math.max(10, Math.floor((bw - 34) / (fs * 0.52)));
    const P = {}; let prev = null;
    rows.forEach((r, ri) => {
      const rw = r.reduce((s, x) => s + units(x) * bw, 0) + (r.length - 1) * gap;
      let x = x0 + (bw0 - rw) / 2; const y = top + ri * rowH + 6, cy = y + bh / 2;
      r.forEach(it => {
        const w = units(it) * bw, cx = x + w / 2;
        P[it.id] = { x, y, w, cx, cy, top: y, bot: y + bh };
        if (prev) {
          if (prev.cy === cy) out.push(`<line x1="${prev.x + prev.w + 4}" y1="${cy}" x2="${x - 4}" y2="${cy}" stroke="${COL.line}" stroke-width="2.5" marker-end="url(#ah)"/>`);
          else { const mid = y - 18;
            out.push(`<path d="M${prev.cx},${prev.bot + 4} V${mid} H${cx} V${y - 4}" fill="none" stroke="${COL.line}" stroke-width="2.5" marker-end="url(#ah)"/>`); }
          if (prev.q) out.push(`<text x="${prev.cy === cy ? prev.x + prev.w + 8 : prev.cx + 8}" y="${prev.cy === cy ? cy - 10 : prev.bot + 22}" font-size="15" fill="${COL.mute}">yes</text>`);
        }
        const f = F && F[it.id];
        if (it.k === 'wait') {
          out.push(`<rect x="${x}" y="${cy - 34}" width="${w}" height="68" rx="34" fill="${COL.wait}" stroke="${COL.mute}" stroke-width="2" stroke-dasharray="7 6"/>`,
            T(clip(wrap('⏱ ' + it.t, Math.floor(w / 8)), 2), cx, cy - 2, 18, `font-size="14" font-style="italic" fill="${COL.mute}"`));
          P[it.id].top = cy - 34; P[it.id].bot = cy + 34;
        } else if (it.k === 'q') {
          out.push(`<polygon points="${cx},${y - 8} ${x + w},${cy} ${cx},${y + bh + 8} ${x},${cy}" fill="${COL.q}" stroke="${COL.qs}" stroke-width="2.5"/>`,
            (() => { const ql = clip(wrap(it.t, Math.max(8, Math.floor(w * 0.62 / ((fs - 1) * 0.52)))), Math.max(2, Math.floor((bh - 10) / 18))); return T(ql, cx, cy - (ql.length - 1) * 9 + 5, 18, `font-size="${fs - 1}" fill="${COL.ink}"`); })(),
            `<text x="${x + 4}" y="${y + 6}" font-size="15" font-weight="800" fill="${COL.qs}">${N[it.id]}</text>`);
          P[it.id].q = true; P[it.id].top = y - 8; P[it.id].bot = y + bh + 8;
        } else {
          const fit = Math.max(1, Math.floor((bh - (it.w ? 40 : 22)) / (fs + 4))), tl = clip(wrap(it.t, cpl), Math.min(fit, 4)), wl = it.w ? clip(wrap(it.w, cpl + 2), 1) : [];
          const th = tl.length * (fs + 4) + (wl.length ? 20 : 0), ty = cy - th / 2 + fs;
          out.push(`<rect x="${x}" y="${y}" width="${w}" height="${bh}" rx="10" fill="${it.bad ? COL.badf : f && f.kind === 'removed' ? '#F4F3F1' : COL.box}" stroke="${it.bad ? COL.bad : f && f.kind === 'removed' ? COL.rm : COL.line}" stroke-width="${it.bad ? 3.5 : 2.5}"${f && f.kind === 'removed' ? ' stroke-dasharray="8 6"' : ''}/>`,
            T(tl, cx, ty, fs + 4, `font-size="${fs}" font-weight="600" fill="${f && f.kind === 'removed' ? COL.rm : COL.ink}"`),
            wl.length ? T(wl, cx, ty + tl.length * (fs + 4) + 2, 18, `font-size="14" fill="${COL.mute}"`) : '',
            `<text x="${x + 10}" y="${y + 22}" font-size="15" font-weight="800" fill="${it.bad ? COL.bad : COL.mute}">${N[it.id]}</text>`);
          if (it.bad) out.push(`<text x="${x + w - 10}" y="${y + bh - 10}" font-size="19" font-weight="800" fill="${COL.bad}" text-anchor="end">✗</text>`);
        }
        /* below the box: why people get stuck, or where a "no" leads */
        const below = P[it.id].bot + 12;
        if (it.bad && it.note) out.push(T(clip(wrap(it.note, Math.floor((w + 24) / 7.6)), 3), cx, below + 14, 18, `font-size="14.5" fill="${COL.bad}"`));
        if (it.k === 'q' && it.ifnot && it.go === 'stuck') {
          const ll = wrap('no: ' + it.ifnot, Math.floor(w / 8)).slice(0, 2);
          out.push(`<line x1="${cx}" y1="${P[it.id].bot}" x2="${cx}" y2="${below + 4}" stroke="${COL.bad}" stroke-width="2.5"/>`,
            `<rect x="${x + 6}" y="${below + 4}" width="${w - 12}" height="${ll.length * 18 + 26}" rx="6" fill="${COL.badf}" stroke="${COL.bad}" stroke-width="2"/>`,
            T(ll.map((l, i) => i === 0 ? '✗ ' + l : l), cx, below + 24, 18, `font-size="14.5" font-weight="600" fill="${COL.bad}"`));
        }
        if (f) { const tag = f.kind === 'removed' ? 'removed' : `${f.kind} → ${f.to || 'wait'}`;
          const tw = tag.length * 8.6 + 18, c = f.kind === 'removed' ? COL.rm : f.kind === 'merged' || f.kind === 'moved' ? COL.loop : COL.ok;
          const tx = it.k === 'q' ? cx - tw / 2 : x + w - tw + 8, ty = it.k === 'q' ? P[it.id].bot - 4 : P[it.id].top - 15;
          out.push(`<rect x="${tx}" y="${ty}" width="${tw}" height="26" rx="13" fill="#fff" stroke="${c}" stroke-width="2"/>`,
            `<text x="${tx + tw / 2}" y="${ty + 18}" font-size="14" font-weight="700" fill="${c}" text-anchor="middle">${esc(tag)}</text>`); }
        prev = P[it.id]; x += w + gap;
      });
    });
    /* loops: a "no" that sends people back goes over the top */
    let lane = 0;
    items.forEach(it => { if (it.k !== 'q' || !it.ifnot || it.go !== 'back' || !P[it.back]) return;
      const a = P[it.id], b = P[it.back], ly = Math.min(a.top, b.top) - 30 - lane * 12; lane++;
      out.push(`<path d="M${a.cx},${a.top} V${ly} H${b.x + 30} V${b.top - 2}" fill="none" stroke="${COL.loop}" stroke-width="2.5" marker-end="url(#al)"/>`,
        `<text x="${(a.cx + b.cx) / 2}" y="${ly - 8}" font-size="15" font-weight="600" fill="${COL.loop}" text-anchor="middle">no: ${esc(it.ifnot)} — back to ${N[it.back]}</text>`); });
    return out.join('');
  }

  const DEFS = `<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${COL.line}"/></marker>
      <marker id="al" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${COL.loop}"/></marker></defs>`;
  const FONT = "system-ui,-apple-system,'Segoe UI',Roboto,sans-serif";
  /* a small drawing for teaching: one row, sized to what is in it */
  const units = list => list.reduce((s, x) => s + (x.k === 'wait' ? 0.72 : x.k === 'q' ? 1.3 : 1), 0);
  const rowW = list => Math.round(units(list) * 230 + Math.max(0, list.length - 1) * 54);
  const notes = list => list.some(x => (x.bad && x.note) || (x.k === 'q' && x.ifnot && x.go === 'stuck'));
  function mini(list, F) {
    const loop = list.some(x => x.k === 'q' && x.ifnot && x.go === 'back'), bw0 = rowW(list), bh0 = 214 + (loop ? 40 : 14) - (notes(list) ? 0 : 30), P = 20;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${bw0 + 2 * P} ${bh0 + P}" font-family="${FONT}" role="img">${DEFS}<rect width="100%" height="100%" fill="#fff"/>${band(list, P, P - 4, bw0, bh0, '', '', F, true)}</svg>`;
  }
  /* now above, your version below, with what happened to every step */
  function pair(before, after) {
    const F = fatesOf(before, after), bw0 = Math.max(rowW(before), rowW(after)), P = 20;
    const hb = 82 + 214 + (before.some(x => x.k === 'q' && x.go === 'back' && x.ifnot) ? 40 : 14) - (notes(before) ? 0 : 30), ha = 82 + 214 + 14 - (notes(after) ? 0 : 30);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${bw0 + 2 * P} ${hb + ha + 2 * P}" font-family="${FONT}" role="img">${DEFS}<rect width="100%" height="100%" fill="#fff"/>
      ${band(before, P, P, bw0, hb, 'NOW', '', F, true)}<line x1="${P}" y1="${P + hb}" x2="${bw0 + P}" y2="${P + hb}" stroke="#DFDBD7" stroke-width="2"/>${band(after, P, P + hb + 12, bw0, ha, 'YOUR VERSION', '', null, true)}</svg>`;
  }
  window.FD = { esc, nums, counts, fatesOf, wrap, clip, T, COL, band, DEFS, FONT, mini, pair, rowW };
})();
