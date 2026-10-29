"""Render the paper kit: report whether each page's content fits A4, screenshot two pages each,
and print both to PDF as a browser would. Usage: render.py <out dir>"""
import asyncio, sys, re
from playwright.async_api import async_playwright
OUT = sys.argv[1]
async def m():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs = []
        for name in (sys.argv[2].split(',') if len(sys.argv) > 2 else ['screens', 'components']):
            pg = await b.new_page(viewport={'width': 1100, 'height': 1400}); pg.on('pageerror', lambda e: errs.append((name, str(e)[:160])))
            await pg.goto(f'http://localhost:8297/paper/{name}.html'); await pg.wait_for_timeout(700)
            info = await pg.evaluate("""[...document.querySelectorAll('.page')].map((pg,i)=>{const r=pg.getBoundingClientRect();
                const land=pg.classList.contains('land'), mm=r.width/(land?297:210);
                const content=[...pg.querySelectorAll(':scope > :not(.foot)')].reduce((a,c)=>Math.max(a,c.getBoundingClientRect().bottom-r.top),0);
                return (i+1)+':'+(content/mm).toFixed(0)+'/'+(land?'200':'287')+(content/mm>(land?200:287)?' OVER':'') })""")
            print(name, len(info), 'pages |', ' '.join(info))
            for i in ([1, 2, 10, 11] if name == 'screens' else [0, 1, 2, 3, 4, 5]):
                if i < len(info): await pg.locator('.page').nth(i).screenshot(path=f'{OUT}/{name}-{i+1}.png')
            await pg.emulate_media(media='print')
            await pg.pdf(path=f'{OUT}/{name}.pdf', prefer_css_page_size=True, print_background=True)
            d = open(f'{OUT}/{name}.pdf', 'rb').read()
            print('  pdf:', len(re.findall(rb'/Type\s*/Page[^s]', d)), 'pages,', round(len(d) / 1024), 'KB')
        print('errors', errs or 'none'); await b.close()
asyncio.run(m())
