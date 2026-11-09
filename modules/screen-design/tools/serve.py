#!/usr/bin/env python3
"""The site, on this computer, for checking work. Says "no-store" on everything, so the browser
never shows an old copy of a page after an edit (plain http.server lets it guess, and it guesses wrong).
    python3 tools/serve.py [port]"""
import functools, http.server, os, sys

class NoStore(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8297
http.server.ThreadingHTTPServer(('127.0.0.1', port), functools.partial(NoStore, directory=root)).serve_forever()
