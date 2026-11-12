// Local test server only. Cloudflare serves the assets; this is not an app backend.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const target = process.argv[2] ?? 'app';
if (!['app', 'lab'].includes(target)) throw new Error('Unknown target');
const root = resolve(`dist/${target}`), port = Number(process.argv[3] ?? 4173);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff': 'font/woff', '.woff2': 'font/woff2' };
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', 'http://localhost');
    let file = resolve(root, '.' + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    try { const entry = await stat(file); if (entry.isDirectory()) file = resolve(file, 'index.html'); await stat(file); }
    catch {
      if (extname(url.pathname) || !request.headers.accept?.includes('text/html')) { response.writeHead(404).end('Not found'); return; }
      file = resolve(root, 'index.html');
    }
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex,nofollow' });
    response.end(body);
  } catch { response.writeHead(400).end('Invalid request'); }
});
server.listen(port, '127.0.0.1', () => console.log(`${target} preview at http://127.0.0.1:${port}`));
