"""Run: python3 tools/navfix.py   (rewrites the bar on every page; safe to re-run)

One bar for every Screen Design page: the same markup, the same styles,
the same names. Pages had drifted into two heights because each carried its
own copy of the header CSS; this writes one copy into each and lets it win."""
import re, sys, os
D = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
ITEMS = [('start.html', 'Start here'), ('weeks.html', 'Week by week'), ('assessment.html', 'Checklist'), ('examples.html', 'Examples'),
         ('toolkit.html', 'Toolkit'), ('assessment-materials.html', 'Marking'), ('all.html', 'All pages')]
# Overview is the brand ('Screen Design', top left); Theme ideas is linked from the Overview, weeks 2–3,
# the Toolkit and Marking's questions rather than from the bar (Mike, 24 Oct 2026).
ACTIVE = {'start': 'start.html', 'confused': '', 'inclusive': 'toolkit.html', 'all': 'all.html', 'index': 'index.html', 'weeks': 'weeks.html', 'workshop': 'weeks.html', 'lecture': 'weeks.html', 'teardowns': 'weeks.html', 'passready': 'weeks.html', 'assessment': 'assessment.html', 'assessment-materials': 'assessment-materials.html', 'rubric': 'assessment-materials.html', 'example': 'examples.html', 'example-marked': 'examples.html', 'example-feedback': 'examples.html', 'example-council': 'examples.html', 'example-council-marked': 'examples.html', 'example-council-feedback': 'examples.html', 'example-sheet': 'examples.html', 'example-council-sheet': 'examples.html', 'toolkit': 'toolkit.html', 'ideas': 'ideas.html', 'grid-numbers': 'weeks.html', 'type-colour': 'weeks.html', 'flow-grammar': 'weeks.html', 'wireframes': 'weeks.html', 'wireframes-2': 'weeks.html', 'case-missed-bin': 'examples.html', 'case-bakery': 'examples.html', 'case-railcard': 'examples.html', 'case-short-course': 'examples.html', 'style-kit': 'toolkit.html', 'gallery': 'toolkit.html', 'organisms': 'toolkit.html', 'flow-guide': 'toolkit.html', 'examples': 'examples.html'}
HREF = {'teardowns': {'weeks.html': 'weeks.html?w=1'}, 'grid-numbers': {'weeks.html': 'weeks.html?w=3'}, 'type-colour': {'weeks.html': 'weeks.html?w=4'}, 'flow-grammar': {'weeks.html': 'weeks.html?w=5'}, 'wireframes': {'weeks.html': 'weeks.html?w=5'}, 'wireframes-2': {'weeks.html': 'weeks.html?w=7'}, 'passready': {'weeks.html': 'weeks.html?w=7'}}
# The bar's "Feedback form" link: the week 7 form in weeks 7–8, the week 9 form in weeks 9–10, the same
# rule as SD.feedback(). Baked in from sd-common.js because half the pages never load it.
import datetime
_C = open(os.path.join(D, 'sd-common.js')).read()
_W1 = datetime.date.fromisoformat(re.search(r"WEEK1:\s*'([\d-]+)'", _C).group(1))
_MON = lambda w: (_W1 - datetime.timedelta(days=_W1.weekday()) + datetime.timedelta(weeks=w - 1)).isoformat()
_FF = dict(re.findall(r"(w[79]):\s*'([^']*)'", re.search(r"const FEEDBACK_FORM = \{(.*?)\};", _C).group(1)))
FB = [[_MON(7), _MON(9), _FF.get('w7', '')], [_MON(9), _MON(11), _FF.get('w9', '')]]
FBJS = ('var d=new Date(),a=document.getElementById("fbl");' + repr(FB).replace("'", '"') +
        '.forEach(function(f){if(f[2]&&d>=new Date(f[0]+"T00:00")&&d<new Date(f[1]+"T00:00")){a.href=f[2];a.hidden=false;}});')
# "Switch to the old version", at the foot of every page: the old site sends everyone here unless ?old=1.
OLD_HOME = {'start', 'all', 'inclusive', 'confused'}  # pages the old site never had
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
  header.sdnav .fbl{order:0;display:inline-flex;align-items:center;min-height:36px;padding:6px 14px;border-radius:999px;background:var(--lec);
    color:#fff;font-size:0.86rem;font-weight:700;text-decoration:none;white-space:nowrap;margin-left:6px}
  header.sdnav .fbl[hidden]{display:none}
  header.sdnav .fbl:hover{filter:brightness(1.1)}
  html[data-theme="dark"] header.sdnav .fbl{color:#151314}
  .oldsw{text-align:center;font-size:0.82rem;color:var(--ink-3);margin:28px auto 32px;padding:0 16px}
  .oldsw a{color:var(--ink-2)}
  html.present .oldsw{display:none}
  header.sdnav .ctl button{font-family:var(--mono);font-size:0.7rem;background:none;color:var(--ink-3);
    border:1px solid var(--line-2);border-radius:6px;padding:0 9px;cursor:pointer;line-height:1;
    height:34px;min-height:34px;min-width:34px;display:inline-flex;align-items:center;justify-content:center}
  header.sdnav .ctl button:hover{border-color:var(--lec);color:var(--lec)}
  @media(max-width:960px){
    header.sdnav .bar{flex-wrap:wrap;row-gap:0;padding-block:6px 0;min-height:0}
    header.sdnav .ctl{order:1;margin-left:auto}
    header.sdnav .fbl{order:1;margin-left:auto;min-height:34px;padding:5px 12px}
    header.sdnav .fbl:not([hidden]) ~ .ctl{margin-left:6px}
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
    m = re.search(r'<header\b[^>]*>.*?</header>(\n<script>\(function\(\)\{(?:var d=new Date\(\),a=document.getElementById\("fbl"\).*?)?var n=document.querySelector\(".sdlinks".*?</script>)?', s, re.S)
    assert m and 'class="brand"' in m.group(0), f
    had_theme = 'id="theme"' in m.group(0)
    on = ACTIVE[k]
    links = ''.join(
        f'<a class="navl{" on" if h == on else ""}" href="{HREF.get(k, {}).get(h, h)}"{" aria-current=\"page\"" if h == f else ""}>{t}</a>'
        for h, t in ITEMS)
    hdr = ('<header class="sdnav">\n  <div class="wrap bar">\n    <a class="brand" href="index.html">Screen Design</a>\n'
           '    <span class="sp"></span>\n    <nav class="sdlinks" aria-label="Screen Design">' + links + '</nav>\n'
           + '    <a class="fbl" id="fbl" href="#" target="_blank" rel="noopener" hidden>Feedback form</a>\n'
           + ('    <span class="ctl"><button id="theme" aria-label="Dark mode">◐</button></span>\n' if had_theme else '')
           + '  </div>\n</header>\n'
           + '<script>(function(){' + FBJS + 'var n=document.querySelector(".sdlinks"),o=n&&n.querySelector(".on");if(o&&n.scrollWidth>n.clientWidth)n.scrollLeft=o.offsetLeft-n.offsetLeft-16;})();</script>')
    s = s[:m.start()] + hdr + s[m.end():]
    s = re.sub(r'\n  /\* THE BAR — one definition.*?\n  }\n', '\n', s, flags=re.S)  # idempotent
    i = s.index('</style>')
    s = s[:i].rstrip() + '\n' + CSS + s[i:]  # rstrip: re-running adds nothing
    s = re.sub(r'\n?<!-- old-switch.*?<!-- /old-switch -->', '', s, flags=re.S)  # idempotent
    tgt = 'index.html' if k in OLD_HOME else f
    sw = ('\n<!-- old-switch (navfix) --><p class="oldsw"><a id="oldsw" href="../sd/' + tgt + '?old=1">Switch to the old version</a></p>'
          + ('<script>(function(){var a=document.getElementById("oldsw"),q=location.search;a.href="../sd/' + tgt
             + '"+(q?q+"&":"?")+"old=1"+location.hash;})();</script>' if tgt == f else '') + '<!-- /old-switch -->')
    i = s.rindex('</body>')
    s = s[:i].rstrip('\n') + sw + '\n' + s[i:]
    open(os.path.join(D, f), 'w').write(s)
    print(f, 'theme' if had_theme else '')
