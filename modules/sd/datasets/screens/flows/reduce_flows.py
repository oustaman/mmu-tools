#!/usr/bin/env python3
"""Reduce the captured walks to the screens they actually contain.

A capture is a state, not a screen. Walking Register to Vote produced 32 PNGs,
but eight of those are a form before and after it was filled in — the same
screen, twice. This script collapses the captures to distinct screens and emits
flow-census.json, which is the only part of this dataset that may be published:
the screenshots stay here, because fair dealing for instruction covers showing
them to a class and does not cover a public webroot.

Three things are measured from the files and cannot be typed wrong:
page height (off the full-page PNG, halved for DPR 2), the capture count per
screen, and the totals. Three things are judgements and are written out by hand
below: which captures are one screen, that screen's job, and the door it offers
that the walk did not take. Every judgement is checkable against the PNG named
in the row, which is why the row names it.

The screen name is the page's own H1, quoted verbatim off the capture. Where a
service reuses one H1 across two different questions this undercounts, and the
limits note on the collection page says so.

Run:  python3 reduce_flows.py            (writes flow-census.json)
      python3 reduce_flows.py --check    (verifies, writes nothing)
"""
import json, sys, struct
from pathlib import Path

HERE = Path(__file__).parent
DIRS = {'sd-flow-001': 'gov-rtv', 'sd-flow-002': 'nhs-gp',
        'sd-flow-003': 'news-bbc', 'sd-flow-004': 'shop-screwfix'}

# The reduction. steps = the capture numbers that are this one screen.
# door = a control visible in the capture that leads somewhere the walk did not
#        go, quoted verbatim. None where the only way on is Continue.
SCREENS = [
 # ---- Register to vote -------------------------------------------------
 ('sd-flow-001', [1, 2], 'Register to vote', 'guide',
  'Explain the service and start it.',
  'Register to vote - apply by post'),
 ('sd-flow-001', [3, 4, 5], 'Where do you live?', 'question',
  'Route the applicant to the right nation.',
  'British citizen living in another country'),
 ('sd-flow-001', [6, 7], 'What is your nationality?', 'question',
  'Establish eligibility to vote.',
  'I cannot provide my nationality'),
 ('sd-flow-001', [8, 9], 'What is your date of birth?', 'question',
  'Establish age eligibility.',
  'I cannot provide my date of birth'),
 ('sd-flow-001', [10, 11], 'What is your full name?', 'question',
  'Take the name that goes on the register.',
  None),
 ('sd-flow-001', [12, 13], 'Have you ever changed your name?', 'question',
  'Find the applicant under a previous name.',
  'Yes'),
 ('sd-flow-001', [14, 15, 16], 'What is your National Insurance number?', 'question',
  'Verify identity against existing government records.',
  'I cannot provide my National Insurance number'),
 ('sd-flow-001', [17, 18], 'What is your UK postcode?', 'question',
  'Narrow the address to one list.',
  'I do not know which postcode to use'),
 ('sd-flow-001', [19, 20], 'What is your address?', 'question',
  'Pick the exact property from that list.',
  'I cannot find my address on the list'),
 ('sd-flow-001', [21, 22], 'Do you also live at a second address?', 'question',
  'Catch students and second homes.',
  'Yes, I live at 2 addresses'),
 ('sd-flow-001', [23, 24],
  'Have you permanently moved out of another address in the last 12 months?', 'question',
  'Remove the old entry from the register.',
  'Yes, from a UK address'),
 ('sd-flow-001', [25, 26],
  'Decide if you want your details to appear on the ‘open register’', 'question',
  'Explain two registers, then take a choice.',
  'register to vote anonymously'),
 ('sd-flow-001', [27], 'Choose how you would like to be contacted', 'question',
  'Ask which contact details are worth collecting.',
  'You can email me'),
 ('sd-flow-001', [28, 29], 'What is your email address?', 'question',
  'Take an email address.', None),
 ('sd-flow-001', [30, 31], 'What is your phone number?', 'question',
  'Take a phone number.', None),
 ('sd-flow-001', [32], 'Check your answers before sending your application', 'confirm',
  'Show everything given, let any of it change.',
  'Change'),
 # ---- Find a GP --------------------------------------------------------
 ('sd-flow-002', [1, 2, 3], 'Find a GP', 'question',
  'Take a postcode.', 'Use your location'),
 ('sd-flow-002', [4], 'GP surgeries near E9 7HQ', 'list',
  'List every surgery, nearest first.', 'Filter by availability'),
 ('sd-flow-002', [5], 'LONDON FIELDS MEDICAL CENTRE', 'detail',
  'Show one surgery, and whether it is open.',
  'go to NHS 111 online or call 111, for urgent care'),
 ('sd-flow-002', [6], 'How to register with this GP surgery', 'guide',
  'Check catchment, then explain how to register.',
  'Check that you live in this GP surgery’s catchment area'),
 ('sd-flow-002', [7], 'Contact details and opening times', 'detail',
  'Give the address, the phone number, the hours.', None),
 # ---- News -------------------------------------------------------------
 ('sd-flow-003', [1], 'News front page', 'list',
  'Rank today, and show the ranking.', 'every headline below the lead'),
 ('sd-flow-003', [2], 'Lead story', 'detail',
  'Give one story in full.', 'related stories at the foot'),
 # ---- Retail -----------------------------------------------------------
 ('sd-flow-004', [1, 2], 'Product page', 'detail',
  'Describe one product and let it be bought.',
  'Check stock in your local store'),
]

# What the walk itself did not reach, recorded so the gap is not read as a
# finding about the service.
NOT_REACHED = {
 'sd-flow-001': 'The walk stopped at the summary. Sending the application, the confirmation '
                'and every error state are uncaptured — submitting a real registration for a '
                'person who does not exist is an offence, and the service says so on the screen.',
 'sd-flow-002': None,
 'sd-flow-003': 'Two screens only: front page and lead story. Section fronts, search and video '
                'are uncaptured.',
 'sd-flow-004': 'Incomplete. The walk stopped at the product page; no basket, delivery or '
                'payment screen was captured.',
}


def image_size(p: Path):
    """Width and height out of the file header, without decoding 155 megapixels.

    Both formats, because the corpus is WebP apart from one capture 54,056
    pixels tall — past WebP's 16,383 limit — which stays PNG. Kept
    dependency-free rather than reaching for Pillow: this script's only job is
    to be runnable next to the captures.
    """
    with p.open('rb') as fh:
        head = fh.read(30)
    if head[:8] == b'\x89PNG\r\n\x1a\n':
        return struct.unpack('>II', head[16:24])
    if head[:4] == b'RIFF' and head[8:12] == b'WEBP':
        assert head[12:16] == b'VP8L', f'{p}: only lossless WebP is expected here, got {head[12:16]!r}'
        # VP8L: one signature byte, then 14 bits of width-1 and 14 of height-1
        bits = struct.unpack('<I', head[21:25])[0]
        return ((bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1)
    raise AssertionError(f'{p}: not a PNG or a lossless WebP')


def main():
    check = '--check' in sys.argv
    src = json.loads((HERE / 'flows.json').read_text())
    flows = {f['id']: f for f in src['flows']}
    rows, per_flow = [], {}

    for fid, steps, name, kind, job, door in SCREENS:
        f = flows[fid]
        by_n = {s['n']: s for s in f['steps']}
        heights, files = [], []
        for n in steps:
            assert n in by_n, f'{fid} has no step {n}'
            full = HERE / DIRS[fid] / Path(by_n[n]['fullpage_image']).name
            w, h = image_size(full)
            assert w == 2880, f'{full} is {w}px wide, not the captured 1440 at DPR 2'
            heights.append(h // 2)
            files.append(full.name)
        # A screen captured twice can change height between captures — a revealed
        # detail, a validation message. The row keeps the range, not an average.
        rows.append({
            'flow': fid, 'flow_name': f['name'].split(' — ')[0],
            'screen': name, 'kind': kind, 'job': job, 'job_words': len(job.split()),
            'door_not_taken': door,
            'captures': len(steps), 'steps': steps, 'files': files,
            'height_css': min(heights) if min(heights) == max(heights)
                          else [min(heights), max(heights)],
        })
        per_flow.setdefault(fid, []).append(rows[-1])

    problems = []
    # Every capture is accounted for exactly once, or the reduction is a guess.
    for fid, f in flows.items():
        want = {s['n'] for s in f['steps']}
        got = [n for r in per_flow.get(fid, []) for n in r['steps']]
        if sorted(got) != sorted(want):
            problems.append(f'{fid}: captures {sorted(want)} but reduction covers {sorted(got)}')
    # The rule the collection states about itself.
    for r in rows:
        if r['job_words'] >= 10:
            problems.append(f'{r["screen"]!r}: job is {r["job_words"]} words, and the rule is under ten')
    if problems:
        print('\n'.join('  ! ' + p for p in problems)); sys.exit(1)

    caps = sum(r['captures'] for r in rows)
    doors = [r for r in rows if r['door_not_taken']]
    qs = [r for r in rows if r['kind'] == 'question']
    tall = max(rows, key=lambda r: r['height_css'] if isinstance(r['height_css'], int)
               else r['height_css'][1])

    out = {
        'schema_version': 1,
        'dataset_name': 'flow-census',
        'note': 'Screens, not captures. Derived from the walks in flows.json by reduce_flows.py. '
                'Screen names are the page H1 quoted off the capture; heights are measured from '
                'the full-page PNG at 1440 CSS px wide. No screenshots are published.',
        'derived_from': src['dataset_name'],
        'extraction_date': src['extraction_date'],
        'generated_by': 'reduce_flows.py',
        'flows': [{'id': fid, 'name': flows[fid]['name'], 'entry_url': flows[fid]['entry_url'],
                   'service_host': flows[fid]['service_host'],
                   'captured_date': flows[fid]['captured_date'],
                   'viewport': flows[fid]['viewport'],
                   'captures': sum(r['captures'] for r in per_flow[fid]),
                   'screens': len(per_flow[fid]),
                   'not_reached': NOT_REACHED[fid]} for fid in DIRS if fid in per_flow],
        'counts': {
            'flows': len(per_flow), 'captures': caps, 'screens': len(rows),
            'collapse_ratio': round(caps / len(rows), 2),
            'with_door_not_taken': len(doors),
            'without': len(rows) - len(doors),
            'questions': len(qs),
            'question_height_min': min(r['height_css'] if isinstance(r['height_css'], int)
                                       else r['height_css'][0] for r in qs),
            'question_height_max': max(r['height_css'] if isinstance(r['height_css'], int)
                                       else r['height_css'][1] for r in qs),
            'tallest_screen': tall['screen'],
            'tallest_height': tall['height_css'] if isinstance(tall['height_css'], int)
                              else tall['height_css'][1],
        },
        'screens': rows,
    }
    if check:
        print('  ok ·', len(rows), 'screens from', caps, 'captures ·',
              len(doors), 'carry a door not taken')
        return
    (HERE / 'flow-census.json').write_text(json.dumps(out, indent=1, ensure_ascii=False) + '\n')
    c = out['counts']
    print(f"  {c['screens']} screens from {c['captures']} captures  (×{c['collapse_ratio']})")
    print(f"  {c['with_door_not_taken']} carry a door the walk did not take, {c['without']} do not")
    print(f"  questions run {c['question_height_min']}–{c['question_height_max']} CSS px; "
          f"tallest screen is {c['tallest_screen']} at {c['tallest_height']}")


main()
