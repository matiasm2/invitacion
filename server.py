#!/usr/bin/env python3
import http.server
import socketserver
import os
from pathlib import Path

PORT = 8000
os.chdir(Path(__file__).parent)

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        return super().end_headers()

    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

try:
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"✅ Servidor ejecutándose en http://localhost:{PORT}")
        print(f"📱 Abre en tu navegador: http://localhost:{PORT}")
        print(f"\n✋ Presiona Ctrl+C para detener el servidor")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n\n👋 Servidor detenido")
except OSError as e:
    print(f"❌ Error: {e}")
    print(f"El puerto {PORT} puede estar en uso. Intenta cambiar el puerto.")
