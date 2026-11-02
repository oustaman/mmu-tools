#!/usr/bin/env python3
"""Stamp a version on the site's own stylesheets and scripts, so a browser that kept an old copy
fetches the new one: deck-kit.css?v=202611021030. Without it, a page can arrive with an old stylesheet and
show its words with none of its drawing. Run before looking at changes; publish_sd.sh runs it too.
  tools/stamp_assets.py [folder]   (default: the module folder)"""
import glob, os, re, sys, time
root = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
v = time.strftime('%Y%m%d%H%M')
ASSETS = r'(?:deck-kit\.(?:css|js)|tool-shell\.css|tool-canvas\.js|tool-tour\.js|flow-draw\.js|weeks-data\.js|sd-common\.js|rubric-data\.js|paper/(?:paper\.css|paper-kit\.js|organisms\.js|journeys\.js)|paper\.css|paper-kit\.js|organisms\.js|journeys\.js)'
pat = re.compile(r'((?:href|src)=")(' + ASSETS + r')(?:\?v=\d+)?(")')
n = 0
for f in glob.glob(os.path.join(root, '*.html')) + glob.glob(os.path.join(root, 'paper', '*.html')):
    s = open(f).read(); t = pat.sub(lambda m: f'{m[1]}{m[2]}?v={v}{m[3]}', s)
    if t != s: open(f, 'w').write(t); n += 1
print(f'stamped {n} pages with v={v}')
