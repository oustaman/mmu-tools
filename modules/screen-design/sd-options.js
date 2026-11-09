/* Grids, typefaces and palettes students can choose from — one list, read by the
   Style kit (style-kit.html, the options marked kit:true) and the Gallery (gallery.html, all of them).
   The A3, A4 and A5 text both pages copy is written here too, in the order of the
   Checklist's own fields, so it pastes straight into the deck.

   GRIDS — numbers from the interfaces.institute grids register (grids.json), which cites each
   publisher's documentation; Example 2 and the Liverpool case are this module's own.
   TYPES — free faces from Google Fonts (SIL Open Font Licence), each with a scale in px.
   COLS — role-based palettes. No ratio is typed anywhere: every one is computed by ratio() below.
   Options with bad:true are the "what are we fixing" examples; only the Style kit shows them. */
(function () {
  const AC = 'Accessed: 22 October 2026';
  const GRIDS = [
    { id: 'ex2', kit: true, n: 'Example 2 (this module)', s: '8 · 6 · 4 columns, form 6 of 8', ph: { c: 4, g: 16, m: 16 }, dk: { c: 8, g: 24, m: 40 }, max: 960, bps: '1024 px desktop (8) · 768 px tablet (6) · 375 px phone (4)', main: '6 of 8', src: 'Example 2, Screen Design assessment materials, 2026.', url: 'examples.html#portfolios' },
    { id: 'bs5', kit: true, n: 'Bootstrap 5', s: '12 columns, 24 px gutters', ph: { c: 12, g: 24, m: 12 }, dk: { c: 12, g: 24, m: 12 }, max: 1320, bps: '576 · 768 · 992 · 1200 px (12 columns at every size)', main: '8 of 12', src: `Bootstrap (no date) Grid system. Available at: https://getbootstrap.com/docs/5.0/layout/grid/ (${AC}).`, url: 'https://getbootstrap.com/docs/5.0/layout/grid/' },
    { id: 'm3', kit: true, n: 'Material Design 3 (Google)', s: '4 · 8 · 12 columns', ph: { c: 4, g: 16, m: 16 }, dk: { c: 12, g: 16, m: 16 }, max: 840, bps: '600 px (8 columns) · 840 px (12 columns)', main: '8 of 12', src: `Google (no date) Material Design 3: Understanding layout. Available at: https://m3.material.io/foundations/layout/understanding-layout/overview (${AC}).`, url: 'https://m3.material.io/foundations/layout/understanding-layout/overview' },
    { id: 'carbon', kit: true, n: 'Carbon (IBM)', s: '4 · 8 · 16 columns', ph: { c: 4, g: 16, m: 16 }, dk: { c: 16, g: 16, m: 16 }, max: 1584, bps: '320 px (4) · 672 px (8) · 1056 px (16)', main: '10 of 16', src: `IBM (no date) Carbon Design System: 2x Grid. Available at: https://carbondesignsystem.com/elements/2x-grid/overview/ (${AC}).`, url: 'https://carbondesignsystem.com/elements/2x-grid/overview/' },
    { id: 'uswds', kit: true, n: 'U.S. Web Design System', s: '4 · 12 columns, 16 px gutters', ph: { c: 4, g: 16, m: 16 }, dk: { c: 12, g: 16, m: 16 }, max: 1024, bps: '320 px (4) · 1024 px (12)', main: '8 of 12', src: `U.S. General Services Administration (no date) U.S. Web Design System: Layout grid. Available at: https://designsystem.digital.gov/utilities/layout-grid/ (${AC}).`, url: 'https://designsystem.digital.gov/utilities/layout-grid/' },
    { id: 'dsfr', n: 'DSFR (French government)', s: '12 columns, 16 px gutters', ph: { c: 12, g: 16, m: 16 }, dk: { c: 12, g: 16, m: 16 }, max: 1280, bps: '576 · 992 px (12 columns at each)', main: '8 of 12', src: `Gouvernement français (no date) Système de Design de l’État: Grille. Available at: https://www.systeme-de-design.gouv.fr/elements-techniques/grille (${AC}).`, url: 'https://www.systeme-de-design.gouv.fr/elements-techniques/grille' },
    { id: 'found', n: 'Foundation 6 (Zurb)', s: '12 columns, 20 px gutters', ph: { c: 12, g: 20, m: 15 }, dk: { c: 12, g: 20, m: 15 }, max: 1200, bps: '640 px (12 columns)', main: '8 of 12', src: `Zurb (no date) Foundation 6: XY Grid. Available at: https://get.foundation/sites/docs/xy-grid.html (${AC}).`, url: 'https://get.foundation/sites/docs/xy-grid.html' },
    { id: 'ant', n: 'Ant Design (Ant Group)', s: '24 narrow columns, 8 px gutters', ph: { c: 24, g: 8, m: 16 }, dk: { c: 24, g: 8, m: 16 }, max: 0, bps: '576 · 768 · 992 · 1200 · 1600 px (24 columns at each)', main: '16 of 24', src: `Ant Group (no date) Ant Design: Grid. Available at: https://ant.design/components/grid (${AC}).`, url: 'https://ant.design/components/grid' },
    { id: 'eye', kit: true, bad: true, n: 'By eye — no grid', s: 'What we are fixing: every box placed where it looked right', ph: { c: 0, g: 0, m: 0 }, dk: { c: 0, g: 0, m: 0 }, max: 0, bps: '', main: '', src: '' },
    { id: 'liv', kit: true, n: 'Liverpool case redesign (this module)', s: '4 · 12 columns, form 6 of 12', ph: { c: 4, g: 16, m: 16 }, dk: { c: 12, g: 24, m: 32 }, max: 1140, bps: '768 px', main: '6 of 12', src: 'Before and after, case 1: Reporting a missed bin. Screen Design, 2026.', url: 'case-missed-bin.html' },
  ];
  const GF = n => `${n}. Google Fonts, SIL Open Font Licence. Available at: https://fonts.google.com (${AC}).`;
  const TYPES = [
    { id: 'atk', kit: true, n: 'Atkinson Hyperlegible', s: 'One face, drawn for low vision', fh: "'Atkinson Hyperlegible'", fb: "'Atkinson Hyperlegible'", hw: 700, h1: 28, body: 18, small: 15, why: 'drawn by the Braille Institute so similar letters cannot be confused', src: GF('Braille Institute (no date) Atkinson Hyperlegible') },
    { id: 'warm', kit: true, n: 'Fraunces + Source Sans 3', s: 'A soft serif for headings, a plain sans to read', fh: "'Fraunces'", fb: "'Source Sans 3'", hw: 700, h1: 28, body: 18, small: 15, why: 'the serif carries warmth; the sans carries everything you read', src: GF('Undercase Type (no date) Fraunces; Adobe (no date) Source Sans 3') },
    { id: 'rob', kit: true, n: 'Roboto', s: 'One neutral face', fh: "'Roboto'", fb: "'Roboto'", hw: 700, h1: 28, body: 18, small: 15, why: 'familiar from Android; wide range of weights', src: GF('Google (no date) Roboto') },
    { id: 'nun', kit: true, n: 'Nunito Sans', s: 'One friendly, rounded face', fh: "'Nunito Sans'", fb: "'Nunito Sans'", hw: 800, h1: 28, body: 18, small: 15, why: 'friendly without being childish; carries Welsh and most European letters', src: GF('Vernon Adams, Manvel Shmavonyan, Jacques Le Bailly (no date) Nunito Sans') },
    { id: 'plex', kit: true, n: 'IBM Plex Serif + IBM Plex Sans', s: 'An institutional pair', fh: "'IBM Plex Serif'", fb: "'IBM Plex Sans'", hw: 600, h1: 27, body: 18, small: 15, why: 'one family in two styles, so they always match', src: GF('IBM / Bold Monday (no date) IBM Plex') },
    { id: 'all', kit: true, bad: true, n: 'Something for everyone', s: 'What we are fixing: five typefaces, nine sizes, all of them shouting', fh: "Impact,'Arial Black'", fb: "'Comic Neue'", hw: 400, h1: 34, body: 15, small: 11, why: '', src: '' },
    { id: 'merri', kit: true, n: 'Merriweather + Inter', s: 'A sturdy serif and a screen sans', fh: "'Merriweather'", fb: "'Inter'", hw: 700, h1: 26, body: 17, small: 15, why: 'Inter was drawn for screens; Merriweather stays readable when small', src: GF('Sorkin Type (no date) Merriweather; Rasmus Andersson (no date) Inter') },
    { id: 'lex', n: 'Lexend', s: 'One wide, open face', fh: "'Lexend'", fb: "'Lexend'", hw: 700, h1: 28, body: 18, small: 15, why: 'wide letters and generous spacing, drawn with reading fluency in mind', src: GF('Bonnie Shaver-Troup and Thomas Jockin (no date) Lexend') },
    { id: 'pub', n: 'Public Sans', s: 'A government face, plain and strong', fh: "'Public Sans'", fb: "'Public Sans'", hw: 700, h1: 28, body: 18, small: 15, why: 'drawn for the U.S. Web Design System; neutral enough for any public service', src: GF('U.S. Web Design System (no date) Public Sans') },
    { id: 'noto', n: 'Noto Serif + Noto Sans', s: 'A pair for many languages', fh: "'Noto Serif'", fb: "'Noto Sans'", hw: 700, h1: 27, body: 18, small: 15, why: 'Noto has a matching face for nearly every writing system, so a second language will not change the look', src: GF('Google (no date) Noto Serif; Noto Sans') },
    { id: 'lora', n: 'Lora + Open Sans', s: 'A gentle book serif and a familiar sans', fh: "'Lora'", fb: "'Open Sans'", hw: 700, h1: 28, body: 17, small: 15, why: 'the serif gives headings a little personality; Open Sans stays clear at small sizes', src: GF('Cyreal (no date) Lora; Steve Matteson (no date) Open Sans') },
    { id: 'srcp', n: 'Source Serif 4 + Source Sans 3', s: 'A serif and a sans drawn to match', fh: "'Source Serif 4'", fb: "'Source Sans 3'", hw: 700, h1: 28, body: 18, small: 15, why: 'drawn as companions, so the two never fight', src: GF('Adobe (no date) Source Serif 4; Source Sans 3') },
    { id: 'dm', n: 'DM Serif Display + DM Sans', s: 'A display serif for big headings only', fh: "'DM Serif Display'", fb: "'DM Sans'", hw: 400, h1: 30, body: 17, small: 15, why: 'the display serif is drawn for large sizes, so it is used for headings and nothing else', src: GF('Colophon Foundry (no date) DM Serif Display; DM Sans') },
  ];
  /* on = the text colour that sits on the button and on the success panel */
  const COLS = [
    { id: 'civic', kit: true, n: 'Civic blue', s: 'The Liverpool case', ink: '#202427', muted: '#4B5257', pri: '#005DA7', bg: '#FFFFFF', panel: '#F3F2F1', ok: '#00703C', err: '#B3261E', accent: '#663BA3', src: 'Before and after, case 1 (colours kept from Liverpool City Council’s site).' },
    { id: 'gov', kit: true, n: 'GOV.UK colours', s: 'Black, blue links, green buttons, yellow focus', ink: '#0B0C0C', muted: '#505A5F', pri: '#00703C', bg: '#FFFFFF', panel: '#F3F2F1', ok: '#00703C', err: '#D4351C', accent: '#1D70B8', src: `Government Digital Service (no date) GOV.UK Design System: Colour. Available at: https://design-system.service.gov.uk/styles/colour/ (${AC}).`, url: 'https://design-system.service.gov.uk/styles/colour/' },
    { id: 'bakery', kit: true, n: 'Warm bakery', s: 'The bakery case', ink: '#2B211C', muted: '#5E534C', pri: '#8A3B12', bg: '#FBF6EE', panel: '#F1E4CF', ok: '#2E6B3F', err: '#B3261E', accent: '#C8A27A', src: 'Before and after, case 2.' },
    { id: 'rail', kit: true, n: 'Orange and navy', s: 'The Railcard case', ink: '#1F2A44', muted: '#4A5468', pri: '#A63F00', bg: '#FFFFFF', panel: '#FDF1E7', ok: '#24653A', err: '#B3261E', accent: '#F07F15', src: 'Before and after, case 3.' },
    { id: 'cymru', kit: true, n: 'Purple and blue', s: 'The Welsh course case', ink: '#1E1B2E', muted: '#525066', pri: '#0A58A8', bg: '#FFFFFF', panel: '#F4F0FA', ok: '#2D6A3E', err: '#B3261E', accent: '#E6007E', src: 'Before and after, case 4.' },
    { id: 'brand', kit: true, bad: true, n: 'Brand first', s: 'What we are fixing: pale, trendy, and unreadable', ink: '#8C8C8C', muted: '#B0B0B0', pri: '#FFD400', bg: '#F2F2F2', panel: '#FFE4E1', ok: '#7ED957', err: '#FF6F61', accent: '#FF4FA3', link: '#6CB4EE', src: '' },
    { id: 'mono', kit: true, n: 'High-contrast mono', s: 'Black, white and one blue', ink: '#000000', muted: '#3B3B3B', pri: '#1A3D8F', bg: '#FFFFFF', panel: '#EEEEEE', ok: '#1E5631', err: '#A00000', accent: '#000000', src: 'This module’s own example.' },
    { id: 'forest', n: 'Forest green', s: 'Calm, outdoors, a little serious', ink: '#1B2A21', muted: '#4D5B52', pri: '#2F6B3A', bg: '#FFFFFF', panel: '#EEF4EE', ok: '#2F6B3A', err: '#B3261E', accent: '#9BC53D', src: 'This module’s own example.' },
    { id: 'teal', n: 'Teal and coral', s: 'Clinical but friendly', ink: '#14282E', muted: '#44585E', pri: '#0B6E79', bg: '#FFFFFF', panel: '#E7F4F5', ok: '#1E6B3A', err: '#B3261E', accent: '#FF7A5C', src: 'This module’s own example.' },
    { id: 'plum', n: 'Plum and gold', s: 'Arts, events, a night out', ink: '#2A1E2B', muted: '#5B4D5C', pri: '#7A2E7E', bg: '#FFFDF9', panel: '#F5ECF4', ok: '#2D6A3E', err: '#B3261E', accent: '#E9A23B', src: 'This module’s own example.' },
    { id: 'night', n: 'Dark mode', s: 'Light text on a dark ground', ink: '#ECEAE6', muted: '#B3B0AA', pri: '#8AB4F8', on: '#0F1115', bg: '#121417', panel: '#1E2227', ok: '#7CC796', err: '#F28B82', accent: '#F6C35B', src: 'This module’s own example.' },
  ];

  const lum = h => { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  /* WCAG 2.2 AA: 4.5:1 for ordinary text (1.4.3); 3:1 for large text, icons and borders (1.4.3, 1.4.11) */
  const verdict = r => r >= 7 ? 'passes AA and AAA' : r >= 4.5 ? 'passes AA' : r >= 3 ? 'FAILS AA for ordinary text (large text and icons only)' : 'FAILS AA';
  const fam = s => s.replace(/'/g, '').split(',')[0];

  /* every text/background pair the palette uses, named as the Checklist names them */
  const pairs = C => { const on = C.on || '#FFFFFF'; return [
    ['body on background', C.ink, C.bg], ['quiet on background', C.muted, C.bg], ['body on surface', C.ink, C.panel],
    ['button text on button', on, C.pri], ['links on background', C.link || C.pri, C.bg],
    ['error on background', C.err, C.bg], ['text on success', on, C.ok], ['accent on background', C.accent, C.bg]]; };

  const a3 = G => G.bad ? ['Grid: none — placed by eye', 'Columns: none', 'Gutter: none', 'Margin: “about 10 to 20”, different on every box',
      'Max width: none', 'Spacing scale: 5, 7, 9, 11, 13, 14, 17, 19, 22, 26 and 31 px — eleven different gaps', 'Breakpoints: none', '',
      'Nothing here can be handed over: the next screen will not match.'].join('\n')
    : [`Grid: ${G.n}`, `Columns: ${G.dk.c} desktop · ${G.ph.c} phone`,
      `Gutter: ${G.dk.g === G.ph.g ? G.dk.g + ' px' : `${G.dk.g} px desktop · ${G.ph.g} px phone`}`,
      `Margin: ${G.dk.m === G.ph.m ? G.dk.m + ' px' : `${G.dk.m} px desktop · ${G.ph.m} px phone`}`,
      `Max width: ${G.max ? G.max + ' px' : 'none — the content fills the window'}; the main content spans ${G.main} columns`,
      'Spacing scale: 4 · 8 · 16 · 24 · 32 · 48 px', `Breakpoints (only for the other sizes you design): ${G.bps}`].join('\n');

  const a4 = T => T.bad ? ['Heading family: Impact, and a script for buttons', 'Body family: Comic, with an italic serif for answers', 'Base size: 15 px, centred',
      'Scale ratio: none', 'Sizes and their roles: 34, 22, 17, 16, 15, 13, 12, 11 and 9 px — no role for any of them', 'Line height: whatever the tool chose',
      'Measure (characters per line): the full width', '', 'Nobody can tell which size the next heading should be.'].join('\n')
    : [`Heading family: ${fam(T.fh)}, weight ${T.hw}`, `Body family: ${fam(T.fb)}, 400 (labels bold)`, `Base size: ${T.body} px`,
      `Scale ratio: ${T.h1} ÷ ${T.body} = ${(T.h1 / T.body).toFixed(2)} from body to heading`,
      `Sizes and their roles: ${T.h1} px headings · ${T.body} px body, answers and labels · ${T.small} px hints and small print`,
      `Line height: 1.2 for headings (${Math.round(T.h1 * 1.2)} px) · 1.5 for body (${Math.round(T.body * 1.5)} px) and small print (${Math.round(T.small * 1.5)} px)`,
      'Measure (characters per line): at most about 65', `Why: ${T.why}`].join('\n');

  const a5 = C => { const on = C.on || '#FFFFFF', pad = s => (s + ':').padEnd(13);
    const fails = pairs(C).filter(([n, f, b]) => n !== 'accent on background' && ratio(f, b) < 4.5).length;
    return [`${pad('Background')}${C.bg}`, `${pad('Surface')}${C.panel}`, `${pad('Body text')}${C.ink}`, `${pad('Quiet text')}${C.muted}`,
      `${pad('Accent')}${C.accent} — decoration only, never behind or as text`, `${pad('Button')}${C.pri} with ${on} text`,
      `${pad('Links')}${C.link || C.pri}`, `${pad('Success')}${C.ok} · Error: ${C.err}`, '',
      'CONTRAST — every text on every background it sits on',
      ...pairs(C).map(([n, f, b]) => { const r = ratio(f, b); return `  ${n.padEnd(22)}= ${r.toFixed(1)}:1 — ${n === 'accent on background' && r < 4.5 ? 'not used for text' : verdict(r)}`; }),
      '', fails ? `${fails} text pair${fails > 1 ? 's' : ''} below 4.5:1 — change ${fails > 1 ? 'them' : 'it'} before you hand in.` : 'Every text pair passes WCAG AA (4.5:1).'].join('\n'); };

  const c9 = list => list.filter(o => o && o.src).map(o => o.src).join('\n') || 'Nothing to cite: these were not taken from anywhere.';

  window.SDO = { GRIDS, TYPES, COLS, lum, ratio, verdict, pairs, a3, a4, a5, c9 };
})();
