import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(process.env.PREVIEW_DIRECTORY || 'out');
const basePath = (process.env.PREVIEW_BASE_PATH || '').replace(/\/$/, '');
const port = Number(process.env.PORT || 4174);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const rawPath = decodeURIComponent(url.pathname);
    const requested =
      basePath && rawPath.startsWith(basePath + '/') ? rawPath.slice(basePath.length) : rawPath;
    const legacy = requested.match(/^\/(en\/|zh-hant\/)?home-preview\/?$/);
    if (legacy) {
      res.writeHead(308, {
        Location: `${basePath}/${legacy[1] || ''}${url.search}`,
        'Cache-Control': 'no-store',
      });
      res.end();
      return;
    }
    let file = path.resolve(root, '.' + requested);
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    let status = 200;
    try {
      if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
      await fs.access(file);
    } catch {
      status = 404;
      const locale = requested.startsWith('/en/')
        ? 'en/'
        : requested.startsWith('/zh-hant/')
        ? 'zh-hant/'
        : '';
      file = path.join(root, locale, 'not-found/index.html');
    }
    const bytes = await fs.readFile(file);
    res.writeHead(status, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(req.method === 'HEAD' ? undefined : bytes);
  } catch {
    res.writeHead(500);
    res.end('Preview error');
  }
});
server.listen(port, '127.0.0.1', () =>
  console.log(`DataHarbor preview: http://127.0.0.1:${port}/`)
);
