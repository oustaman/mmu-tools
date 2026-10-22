/* The Screen Design marking and feedback sheet, built from the module's own data.
 * Criteria, their descriptions and all twenty band descriptors come from
 * rubric-data.js (verbatim from the 2026-27 brief); the stepped scale from the
 * same file. Nothing about the rubric is typed here, so the sheet cannot drift
 * from the brief.
 *
 *   npm install docx@9      (once, anywhere on the path)
 *   node tools/make-feedback-sheet.js Screen_Design_Feedback_Sheet_2026-27.docx
 */
const fs = require('fs'), vm = require('vm');
const SD = require('path').join(__dirname, '..') + '/';
vm.runInThisContext(fs.readFileSync(SD + 'rubric-data.js', 'utf8'));
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  AlignmentType, BorderStyle, PageOrientation, VerticalAlign, HeightRule, PageBreak, TableLayoutType
} = require('docx');

const FONT = 'Arial', INK = '1F2933', QUIET = '52606D', LINE = '9AA5B1', HEAD = 'E9ECEF';
const CONTENT = 16838 - 2 * 680;                 // A4 landscape, 12 mm margins
const COLS = [3000, 2240, 2240, 2240, 2240, 2240, 1278];
if (COLS.reduce((a, b) => a + b) !== CONTENT) throw new Error('columns ' + COLS.reduce((a, b) => a + b) + ' vs ' + CONTENT);

const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size || 16, bold: o.bold, italics: o.italics, color: o.color || INK });
const para = (runs, o = {}) => new Paragraph({ children: Array.isArray(runs) ? runs : [runs], spacing: { before: o.before || 0, after: o.after ?? 40 }, alignment: o.align });
const border = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const borders = { top: border, bottom: border, left: border, right: border };
const cell = (children, w, o = {}) => new TableCell({
  children, width: { size: w, type: WidthType.DXA }, borders, verticalAlign: o.v || VerticalAlign.TOP,
  shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
  margins: { top: 70, bottom: 70, left: 90, right: 90 }, columnSpan: o.span
});

/* ── header fields ─────────────────────────────────────────────────────── */
const fieldRow = (pairs) => new TableRow({ children: pairs.map(([k, v, w]) =>
  cell([para([run(k + '  ', { bold: true, size: 17 }), run(v, { size: 17, color: QUIET })], { after: 0 })], w)) });
const header = new Table({
  layout: TableLayoutType.FIXED, width: { size: CONTENT, type: WidthType.DXA }, columnWidths: [5000, 4000, 3778, 2700],
  rows: [
    fieldRow([['Module', 'Screen Design · 1L4Z0045 · Level 4 · 30 credits', 5000], ['Assessment', 'Portfolio · 100%', 4000],
              ['Year', '2026–27', 3778], ['Overall mark', '', 2700]]),
    fieldRow([['Student ID', '', 5000], ['First marker', '', 4000], ['Second marker', '', 3778], ['Date', '', 2700]])
  ]
});

/* ── the grid: criteria × bands, every descriptor verbatim ─────────────── */
const head = new TableRow({ tableHeader: true, children: [
  cell([para(run('Criterion', { bold: true, size: 16 }), { after: 0 })], COLS[0], { fill: HEAD }),
  ...BANDS.map((b, i) => cell([para(run(b.label, { bold: true, size: 16 }), { after: 0 }), para(run(b.range, { size: 14, color: QUIET }), { after: 0 })], COLS[i + 1], { fill: HEAD })),
  cell([para(run('Mark', { bold: true, size: 16 }), { after: 0, align: AlignmentType.CENTER })], COLS[6], { fill: HEAD })
]});
const rows = RUBRIC.map(r => new TableRow({ cantSplit: true, children: [
  cell([para(run(`${r.n}. ${r.name}`, { bold: true, size: 17 }), { after: 30 }), para(run(r.what, { size: 14, color: QUIET }), { after: 0 })], COLS[0]),
  ...r.b.map((d, i) => cell([para(run(d, { size: 14 }), { after: 0 })], COLS[i + 1])),
  cell([para(run('', { size: 16 }), { after: 0 })], COLS[6], { v: VerticalAlign.CENTER })
]}));
const grid = new Table({ layout: TableLayoutType.FIXED, width: { size: CONTENT, type: WidthType.DXA }, columnWidths: COLS, rows: [head, ...rows] });

const steps = MARK_STEPS.map(b => b.marks.join(' ')).join('  ·  ');

/* ── page 2: the written feedback ─────────────────────────────────────── */
const box = (title, hint, height) => new Table({
  layout: TableLayoutType.FIXED, width: { size: CONTENT, type: WidthType.DXA }, columnWidths: [CONTENT],
  rows: [
    new TableRow({ children: [cell([para([run(title, { bold: true, size: 20 }), run('   ' + hint, { size: 15, color: QUIET })], { after: 0 })], CONTENT, { fill: HEAD })] }),
    new TableRow({ height: { value: height, rule: HeightRule.ATLEAST }, children: [cell([para(run(''), { after: 0 })], CONTENT)] })
  ]
});

const doc = new Document({
  creator: 'Screen Design module team',
  title: 'Screen Design — marking and feedback sheet',
  styles: { default: { document: { run: { font: FONT, size: 16 } } } },
  sections: [{
    properties: { page: {
      size: { width: 11906, height: 16838, orientation: PageOrientation.LANDSCAPE },
      margin: { top: 600, bottom: 560, left: 680, right: 680 } } },
    children: [
      para([run('Screen Design — marking and feedback sheet', { bold: true, size: 28 })], { after: 30 }),
      para([run('Mark against the four criteria from the assessment brief. Highlight the descriptor that fits best in each row, and give each criterion a mark from the scale below. ', { size: 16, color: QUIET }),
            run('One overall mark is awarded for the portfolio as a whole; the criteria are not weighted separately.', { size: 16, bold: true })], { after: 100 }),
      header,
      para(run(''), { after: 60 }),
      grid,
      para([run('Marks are given on the university’s stepped scale only:  ', { size: 15, bold: true }), run(steps, { size: 15, color: QUIET })], { before: 90, after: 30 }),
      para([run('The overall mark is a judgement the criteria inform, not their sum. If it falls outside the range of the criteria marks, say why under “The overall mark” overleaf.', { size: 15, color: QUIET })], { after: 0 }),
      new Paragraph({ children: [new PageBreak()] }),
      para([run('Feedback', { bold: true, size: 28 })], { after: 120 }),
      box('What was done well', 'two or three specific strengths, each pointing at a section or a screen', 1900),
      para(run(''), { after: 80 }),
      box('What would have raised the mark', 'the changes that would have moved this portfolio into the next band', 1900),
      para(run(''), { after: 80 }),
      box('For your next module', 'one habit to keep and one to build — feedforward, not a list of faults', 1300),
      para(run(''), { after: 80 }),
      box('The overall mark', 'one sentence, required only if it sits outside the range of the criteria marks', 700)
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  const out = process.argv[2];
  fs.writeFileSync(out, buf);
  console.log('written', out, buf.length, 'bytes');
});
