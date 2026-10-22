"""Run: python3 tools/navfix.py   (rewrites the bar on every page; safe to re-run)

One bar for every Screen Design page: the same markup, the same styles,
the same names. Pages had drifted into two heights because each carried its
own copy of the header CSS; this writes one copy into each and lets it win."""
import re, sys, os
D = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
ITEMS = [('index.html', 'Overview'), ('weeks.html', 'Week by week'), ('brief.html', 'The brief'),
         ('assessment.html', 'Checklist'), ('assessment-materials.html', 'Marking and examples'),
         ('toolkit.html', 'Toolkit'), ('ideas.html', 'Theme ideas')]
ACTIVE = {'index': 'index.html', 'weeks': 'weeks.html', 'teardowns': 'weeks.html', 'passready': 'weeks.html',
  'brief': 'brief.html', 'assessment': 'assessment.html', 'assessment-materials': 'assessment-materials.html',
  'rubric': 'assessment-materials.html', 'example': 'assessment-materials.html', 'example-marked': 'assessment-materials.html',
  'example-feedback': 'assessment-materials.html', 'example-council': 'assessment-materials.html',
  'example-council-marked': 'assessment-materials.html', 'example-council-feedback': 'assessment-materials.html',
  'example-sheet': 'assessment-materials.html', 'example-council-sheet': 'assessment-materials.html',
  'toolkit': 'toolkit.html', 'ideas': 'ideas.html', 'grid-numbers': 'weeks.html'}
HREF = {'teardowns': {'weeks.html': 'weeks.html?w=1'}, 'grid-numbers': {'weeks.html': 'weeks.html?w=3'}, 'passready': {'weeks.html': 'weeks.html?w=7'}}
CSS = '''
  /* THE BAR — one definition, identical on every page (written by navfix; change it
     everywhere or nowhere). It used to be copied per page and drifted into two heights. */
  header.sdnav{position:sticky;top:0;z-index:40;background:var(--surface);border-bottom:1px solid var(--line)}
  header.sdnav .bar{display:flex;align-items:center;gap:10px;min-height:56px;padding-block:8px;flex-wrap:nowrap}
  header.sdnav .brand{font-weight:680;font-size:1rem;letter-spacing:-0.015em;white-space:nowrap;color:inherit;
    text-decoration:none;padding:5px 8px;margin-left:-8px;border-radius:6px;order:0}
  header.sdnav .brand:hover{background:var(--surface-2,var(--bg))}
  header.sdnav .sp{flex:1;display:block;height:auto;flex-basis:auto;order:0}
  header.sdnav .sdlinks{display:flex;align-items:center;gap:2px;order:0}
  header.sdnav .navl{display:inline-block;font-size:0.85rem;line-height:1.3;color:var(--ink-2);text-decoration:none;
    padding:6px 10px;border-radius:6px;white-space:nowrap;order:0}
  header.sdnav .navl:hover{background:var(--surface-2,var(--bg));color:var(--ink)}
  header.sdnav .navl.on{background:var(--lec);color:#fff}
  html[data-theme="dark"] header.sdnav .navl.on{color:#151314}
  header.sdnav a:focus-visible,header.sdnav button:focus-visible{outline:2px solid var(--lec);outline-offset:1px}
  header.sdnav .ctl{order:0;margin-left:4px}
  header.sdnav .ctl button{font-family:var(--mono);font-size:0.7rem;background:none;color:var(--ink-3);
    border:1px solid var(--line-2);border-radius:6px;padding:0 9px;cursor:pointer;line-height:1;
    height:34px;min-height:34px;min-width:34px;display:inline-flex;align-items:center;justify-content:center}
  header.sdnav .ctl button:hover{border-color:var(--lec);color:var(--lec)}
  @media(max-width:960px){
    header.sdnav .bar{flex-wrap:wrap;row-gap:0;padding-block:6px 0;min-height:0}
    header.sdnav .ctl{order:1;margin-left:auto}
    header.sdnav .sp{display:none}
    header.sdnav .sdlinks{order:2;flex-basis:100%;overflow-x:auto;scrollbar-width:none;padding:4px 28px 8px 0;min-height:44px;
      -webkit-mask-image:linear-gradient(to right,#000 calc(100% - 28px),transparent);mask-image:linear-gradient(to right,#000 calc(100% - 28px),transparent)}
    header.sdnav .sdlinks::-webkit-scrollbar{display:none}
    header.sdnav .navl{font-size:0.82rem;padding:6px 9px}
  }
'''
for f in sorted(os.listdir(D)):
    if not f.endswith('.html'): continue
    k = f[:-5]
    if k not in ACTIVE: continue
    s = open(os.path.join(D, f)).read()
    m = re.search(r'<header\b[^>]*>.*?</header>(\n<script>\(function\(\)\{var n=document.querySelector\(".sdlinks".*?</script>)?', s, re.S)
    assert m and 'class="brand"' in m.group(0), f
    had_theme = 'id="theme"' in m.group(0)
    on = ACTIVE[k]
    links = ''.join(
        f'<a class="navl{" on" if h == on else ""}" href="{HREF.get(k, {}).get(h, h)}"{" aria-current=\"page\"" if h == f else ""}>{t}</a>'
        for h, t in ITEMS)
    hdr = ('<header class="sdnav">\n  <div class="wrap bar">\n    <a class="brand" href="index.html">Screen Design</a>\n'
           '    <span class="sp"></span>\n    <nav class="sdlinks" aria-label="Screen Design">' + links + '</nav>\n'
           + ('    <span class="ctl"><button id="theme" aria-label="Dark mode">◐</button></span>\n' if had_theme else '')
           + '  </div>\n</header>\n'
           + '<script>(function(){var n=document.querySelector(".sdlinks"),o=n&&n.querySelector(".on");if(o&&n.scrollWidth>n.clientWidth)n.scrollLeft=o.offsetLeft-n.offsetLeft-16;})();</script>')
    s = s[:m.start()] + hdr + s[m.end():]
    s = re.sub(r'\n  /\* THE BAR — one definition.*?\n  }\n', '\n', s, flags=re.S)  # idempotent
    i = s.index('</style>')
    s = s[:i].rstrip() + '\n' + CSS + s[i:]  # rstrip: re-running adds nothing
    open(os.path.join(D, f), 'w').write(s)
    print(f, 'theme' if had_theme else '')
