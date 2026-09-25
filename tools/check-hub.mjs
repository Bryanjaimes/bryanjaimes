import assert from 'node:assert/strict';
import { projects } from '../src/lib/portfolio.mjs';
import { homeHtml, projectHtml } from '../src/lib/hub-render.mjs';

const slugs = new Set();
const home = homeHtml();
assert.equal((home.match(/<h1\b/g) || []).length, 1, 'Home must have one primary heading');
for (const project of projects) {
  assert.match(project.slug, /^[a-z0-9-]+$/);
  assert(!slugs.has(project.slug), `Duplicate slug: ${project.slug}`);
  slugs.add(project.slug);
  const html = projectHtml(project);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert(!html.includes('localhost'), 'Public project pages must not launch localhost');
  for (const value of [project.source, project.demo, project.attribution?.url].filter(Boolean)) {
    assert(value.startsWith('https://') || value.startsWith('/demos/'), `Unexpected link: ${value}`);
  }
}
const untrustedTitle = '<img src=x onerror=alert(1)>';
assert(!projectHtml({ ...projects[0], title: untrustedTitle }).includes(untrustedTitle), 'Project content must be escaped');
assert(home.includes('/demos/') === false, 'Demo entry should go through project context');
assert(!home.includes('resume.pdf'), 'Missing resume must not be linked');
console.log(`Passed content and rendering checks for ${projects.length} projects.`);

if (process.argv.includes('--http')) {
  const base = 'http://127.0.0.1:4173';
  const pages = ['/', ...projects.map(project => `/projects/${project.slug}`), '/hub/hub.css', '/hub/hub.js', '/demos/pupuseria/index.html', '/demos/pupuseria/styles.css', '/demos/pupuseria/app.js'];
  for (const path of pages) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, `${path} must load`);
  }
  const legacy = await fetch(base + '/opendeploy', { redirect: 'manual' });
  assert.equal(legacy.status, 308);
  assert.equal(legacy.headers.get('location'), '/projects/opendeploy');
  assert.equal((await fetch(base + '/projects/not-a-project')).status, 404);
  console.log(`Passed ${pages.length} HTTP route checks, the legacy redirect, and the missing-project check.`);
}
