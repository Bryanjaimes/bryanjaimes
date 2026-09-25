// Dependency-free review server. Uses the exact markup, CSS, and browser script
// used by the Next.js routes. It does not replace a production Next.js build.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, sep, extname } from 'node:path';
import { homeHtml, projectHtml, escapeHtml } from '../src/lib/hub-render.mjs';
import { projects } from '../src/lib/portfolio.mjs';

const publicRoot = fileURLToPath(new URL('../public/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = { '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.html': 'text/html' };
const document = (body, title, description = 'Projects, career work, and experiments by Bryan Jaimes.') => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"><link rel="icon" href="/icon.svg"><link rel="stylesheet" href="/hub/hub.css"><style>body{margin:0;background:#030a1b}html{scroll-behavior:smooth}button,input{margin:0}button{background:none}svg{display:block}h1,h2,h3{font-weight:inherit}a{color:inherit}*{box-sizing:border-box}</style><script src="/hub/hub.js" defer></script></head><body>${body}</body></html>`;

createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
    const url = new URL(request.url, `http://127.0.0.1:${port}`);
    let body;
    let type = 'text/html';
    if (url.pathname === '/') body = document(homeHtml(), 'Bryan Jaimes | Engineer & Builder');
    else if (url.pathname === '/opendeploy') { response.writeHead(308, { Location: '/projects/opendeploy' }); response.end(); return; }
    else if (url.pathname === '/travel') { response.writeHead(302, { Location: 'https://bryanjaimes.com/travel' }); response.end(); return; }
    else if (url.pathname.startsWith('/projects/')) {
      const project = projects.find(project => `/projects/${project.slug}` === url.pathname.replace(/\/$/, ''));
      if (!project) { response.writeHead(404); response.end('Project not found'); return; }
      body = document(projectHtml(project), `${project.title} | Bryan Jaimes`, project.description);
    } else if (url.pathname === '/icon.svg') {
      body = await readFile(new URL('../src/app/icon.svg', import.meta.url)); type = 'image/svg+xml';
    } else {
      const path = resolve(publicRoot, `.${decodeURIComponent(url.pathname)}`);
      if (!path.startsWith(resolve(publicRoot) + sep)) { response.writeHead(403); response.end(); return; }
      body = await readFile(path); type = mime[extname(path)] || 'application/octet-stream';
    }
    response.writeHead(200, { 'Content-Type': `${type}; charset=utf-8`, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 500);
    response.end(error.code === 'ENOENT' ? 'Not found' : 'Unable to render preview');
    if (error.code !== 'ENOENT') console.error(error);
  }
}).listen(port, '127.0.0.1', () => console.log(`Hub preview: http://127.0.0.1:${port}`));
