import { projects, career, profile } from './portfolio.mjs';

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const e = escapeHtml;
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
const external = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>';
const github = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.3-2-1-2 4-.5 6-2 6-6 0-1-.4-2-1-3 .2-1 0-3 0-3-2 0-3 1-3 1-3-1-5-1-8 0 0 0-1-1-3-1 0 0-.2 2 0 3-1 1-1 2-1 3 0 4 2 5.5 6 6-.7.5-1 1-1 2v4"/></svg>';

function art(type, large = false) {
  const body = {
    deploy: `<g stroke="currentColor" fill="none" stroke-width="1.2"><rect x="43" y="87" width="84" height="68" rx="9"/><path d="m72 107-9 14 9 14m26-28 9 14-9 14m-17-1 7-26"/><path class="diagram-flow" d="M127 121h47q12 0 12-12V68q0-12 12-12h45M186 121h57M186 121v53q0 12 12 12h45"/><rect x="243" y="35" width="73" height="42" rx="7"/><rect x="243" y="100" width="73" height="42" rx="7"/><rect x="243" y="165" width="73" height="42" rx="7"/><path d="M259 55h12m7 0h20m-39 65h12m7 0h20m-39 65h12m7 0h20"/><circle cx="186" cy="121" r="6" fill="currentColor"/></g><text x="85" y="179" text-anchor="middle">YOUR MODEL</text><text x="279" y="228" text-anchor="middle">ANY CLOUD</text>`,
    property: `<g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M18 190q61-103 118-45t111-12 98 2M18 209q75-74 133-39t105-6 90 0" opacity=".4"/><rect x="73" y="39" width="222" height="139" rx="9" fill="var(--art-bg)"/><path d="M73 62h222M187 63v115"/><circle cx="86" cy="51" r="2"/><circle cx="94" cy="51" r="2"/><circle cx="102" cy="51" r="2"/><path d="m101 116 29-24 29 24v37h-58v-37m21 37v-21h15v21"/><rect x="204" y="81" width="72" height="34" rx="4"/><path d="M204 129h59m-59 10h42m-42 11h63"/><circle cx="277" cy="174" r="23" fill="var(--art-bg)"/><path d="m267 174 7 7 12-15"/></g>`,
    permit: `<g fill="none" stroke="currentColor" stroke-width="1.2"><rect x="58" y="49" width="102" height="139" rx="7" transform="rotate(-9 109 118)" opacity=".3"/><rect x="72" y="46" width="102" height="139" rx="7" fill="var(--art-bg)"/><path d="M91 70h40m-40 17h64M91 97h64M91 107h46M91 123h64m-64 10h64m-64 10h35"/><path d="M174 114h30m-6-6 7 6-7 6"/><rect x="222" y="60" width="94" height="32" rx="5"/><rect x="222" y="106" width="94" height="32" rx="5"/><rect x="222" y="152" width="94" height="32" rx="5"/><path d="m232 77 4 4 8-9m-12 52 4 4 8-9m-12 51 4 4 8-9M253 77h46m-46 45h46m-46 46h46"/></g>`,
    vision: `<g fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="183" cy="123" r="74" opacity=".25"/><circle cx="183" cy="123" r="58" opacity=".4"/><path d="M60 123s49-61 123-61 123 61 123 61-49 61-123 61S60 123 60 123Z"/><circle cx="183" cy="123" r="32"/><circle cx="183" cy="123" r="11"/><path d="M72 50H50v22m244-22h22v22M50 174v22h22m244-22v22h-22M183 32v22m0 138v22M41 123h22m240 0h22"/><path d="M120 87h126v72H120z" stroke-dasharray="3 5" opacity=".4"/></g>`,
    signal: `<g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M35 121h33l8-22 12 51 12-72 14 85 12-64 10 22h23"/><rect x="170" y="56" width="143" height="133" rx="8"/><path d="M186 79h70m-70 15h107M186 108h76m-76 23h107m-107 14h91"/><circle cx="280" cy="177" r="23" fill="var(--art-bg)"/><path d="m270 176 8 8 12-16"/></g>`,
    assistant: `<g fill="none" stroke="currentColor" stroke-width="1.2"><rect x="73" y="58" width="210" height="124" rx="15"/><path d="m98 182-8 24 42-24M159 92h40m-20-20v40M116 141h125m-125 13h87"/><circle cx="275" cy="65" r="26" fill="var(--art-bg)"/><path d="M264 65h22m-11-11v22"/></g>`,
    archive: `<g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M70 85V66a8 8 0 0 1 8-8h75l17 21h111a8 8 0 0 1 8 8v98H70Z"/><path d="M70 95h219M145 124l-15 15 15 15m69-30 15 15-15 15m-46 9 20-47"/></g>`,
  }[type] || '';
  return `<div class="project-art art-${e(type)}${large ? ' art-large' : ''}" aria-hidden="true"><span class="art-cross cross-a">+</span><span class="art-cross cross-b">+</span><svg viewBox="0 0 366 244">${body}</svg><span class="art-caption">${({deploy:'MODEL → INFRASTRUCTURE',property:'INTENT → INTERFACE',permit:'LANGUAGE → STRUCTURE',vision:'PIXELS → PATTERNS',signal:'CLAIMS → CONTEXT',assistant:'IDEAS → INTERACTION',archive:'LEARN → BUILD → REPEAT'})[type]}</span></div>`;
}

function spaceScene() {
  return `<div class="space-scene" aria-hidden="true"><div class="space-nebula"></div><div class="space-stars"></div><div class="space-planet"></div><div class="space-orbit"></div></div>`;
}

export function header() {
  return `<a class="hub-skip" href="#main-content">Skip to content</a>
  <header class="hub-header">
    <div class="header-inner">
      <a class="hub-brand" href="/" aria-label="Bryan Jaimes home"><span class="brand-mark">bj.</span><span>Bryan Jaimes</span></a>
      <nav class="hub-nav" aria-label="Main navigation"><a href="/#projects">Projects</a><a href="/?category=Vibe%20lab#projects" data-category-link="Vibe lab">Playground</a><a href="/#career">Career</a></nav>
      <a class="header-contact" href="mailto:${profile.email}">Contact ${external}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-navigation" aria-label="Open navigation"><span></span><span></span></button>
    </div>
    <nav id="mobile-navigation" class="mobile-navigation" aria-label="Mobile navigation" hidden><a href="/#projects">Projects</a><a href="/?category=Vibe%20lab#projects" data-category-link="Vibe lab">Playground</a><a href="/#career">Career</a><a href="mailto:${profile.email}">Contact ↗</a></nav>
  </header>`;
}

export function footer() {
  return `<footer class="hub-footer hub-container"><span class="footer-note">© ${new Date().getFullYear()} Bryan Jaimes</span><div><a href="${profile.github}">GitHub ${external}</a><a href="${profile.linkedin}">LinkedIn ${external}</a><a href="/travel">Travel ${external}</a></div><a class="back-top" href="#main-content" aria-label="Back to top">↑</a></footer>`;
}

function card(project, index) {
  return `<article class="project-card" data-project-card data-category="${e(project.category)}" data-search="${e([project.title, project.description, project.category, ...project.tags].join(' ').toLowerCase())}"${project.category === 'Archive' ? ' hidden' : ''}>
    <a class="card-main" href="/projects/${e(project.slug)}" aria-label="Explore ${e(project.title)}">
      <div class="card-visual">${art(project.visual)}<span class="card-kind">${e(project.kind)}</span></div>
      <div class="card-body"><div class="card-title"><h3>${e(project.title)}</h3><span class="card-arrow">${external}</span></div><p>${e(project.description)}</p></div>
    </a>
    <div class="card-bottom"><span>${e(project.tags.slice(0, 3).join(' · '))}</span><span class="card-number">${String(index + 1).padStart(2, '0')}</span></div>
  </article>`;
}

export function homeHtml() {
  const categories = ['Selected', 'All projects', 'AI & ML', 'Platforms', 'Vibe lab', 'Archive'];
  const count = category => projects.filter(p => category === 'All projects' || (category === 'Selected' ? p.category !== 'Archive' : p.category === category)).length;
  return `<div class="hub">${spaceScene()}${header()}<main id="main-content">
    <section class="hub-container hero-section" aria-labelledby="intro-title">
      <div class="hero-copy"><div class="eyebrow"><span class="status-dot"></span> SOFTWARE ENGINEER & BUILDER</div><h1 id="intro-title">Bryan<br><span>Jaimes.</span></h1><p class="hero-description">Software. AI. Experiments.</p><div class="hero-actions"><a class="hub-button button-primary" href="#projects">Explore projects ${arrow}</a><a class="hub-button button-secondary" href="${profile.github}">${github} GitHub ${external}</a></div></div>
      <div class="hero-stage"><div class="orbital-ring ring-one" aria-hidden="true"></div><div class="orbital-ring ring-two" aria-hidden="true"></div><a class="hero-feature" href="/projects/opendeploy"><div class="feature-top"><span><span class="status-dot"></span> FEATURED PROJECT</span>${external}</div>${art('deploy', true)}<div class="feature-bottom"><div><h2>OpenDeploy</h2><p>Multi-cloud ML deployment.</p></div><span class="feature-arrow">${arrow}</span></div></a><a class="orbit-chip" href="/?category=Vibe%20lab#projects" data-category-link="Vibe lab"><span class="chip-spark" aria-hidden="true">✧</span> Vibe lab <span>${count('Vibe lab')} experiments</span>${external}</a></div>
    </section>
    <section id="projects" class="hub-container projects-section" aria-labelledby="projects-title">
      <div class="section-heading"><h2 id="projects-title">Projects<span class="heading-count">${projects.length}</span></h2><a class="text-link" href="${profile.github}">All repositories ${external}</a></div>
      <form class="project-toolbar" role="search" aria-label="Project search"><div class="project-filters" role="group" aria-label="Filter projects">${categories.map(category => `<button type="button" class="filter-button${category === 'Selected' ? ' active' : ''}" data-filter="${e(category)}" aria-pressed="${category === 'Selected'}">${e(category)}<span>${count(category)}</span></button>`).join('')}</div><label class="project-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span class="sr-only">Search projects</span><input id="project-search" type="search" placeholder="Search projects" autocomplete="off" maxlength="120"><kbd aria-hidden="true">/</kbd></label></form>
      <div class="results-bar"><p id="project-result-count" role="status" aria-live="polite">${count('Selected')} projects</p></div>
      <div class="project-grid">${projects.map(card).join('')}</div>
      <div id="project-empty" class="empty-state" hidden><h3>No projects found.</h3><button type="button" class="hub-button button-secondary" data-reset-filters>Reset filters ${arrow}</button></div>
      <noscript><style>.hub [data-project-card][hidden]{display:flex}.hub .project-toolbar,.hub .results-bar{display:none}</style></noscript>
    </section>
    <section id="career" class="career-section hub-container" aria-labelledby="career-title">
      <div class="section-heading"><h2 id="career-title">Career</h2><a class="text-link" href="mailto:${profile.email}?subject=Resume%20request">Request résumé ${external}</a></div>
      <div class="career-timeline">${career.map((job, index) => `<article class="career-entry"><div class="career-emblem" aria-hidden="true">${['LM', 'B', 'BU'][index]}</div><div class="career-content"><div class="career-date">${e(job.dates)}${index === 0 ? '<span class="current-badge">Current</span>' : ''}</div><h3>${e(job.company)}</h3><p class="career-role">${e(job.role)}</p><ul>${job.bullets.map(bullet => `<li>${e(bullet)}</li>`).join('')}</ul><div class="tag-list">${job.tags.map(tag => `<span>${e(tag)}</span>`).join('')}</div></div></article>`).join('')}</div>
    </section>
    <section id="contact" class="contact-section hub-container"><div><div class="eyebrow">CONTACT</div><h2>Let’s build something.</h2></div><div class="contact-actions"><a class="hub-button button-primary" href="mailto:${profile.email}">Email me ${external}</a><button class="copy-email" type="button" data-copy-email="${profile.email}" aria-label="Copy email address"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="3"/><path d="M15 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/></svg></button><span class="copy-status" role="status" aria-live="polite"></span></div></section>
  </main>${footer()}</div>`;
}

export function projectHtml(project) {
  const related = projects.filter(p => p.slug !== project.slug && p.category !== 'Archive').slice(0, 3);
  return `<div class="hub">${spaceScene()}${header()}<main id="main-content" class="project-detail hub-container">
    <a class="back-link text-link" href="/#projects">← Projects</a>
    <div class="detail-heading"><div><div class="eyebrow">${e(project.category)} / ${e(project.kind)}</div><h1>${e(project.title)}</h1><p>${e(project.description)}</p></div><div class="detail-actions">${project.demo ? `<a class="hub-button button-primary" href="${e(project.demo)}">Open demo ${external}</a>` : ''}${project.source ? `<a class="hub-button button-secondary" href="${e(project.source)}">${github} Source ${external}</a>` : `<a class="hub-button button-secondary" href="mailto:${profile.email}?subject=${encodeURIComponent(project.title)}">Ask about this project ${external}</a>`}</div></div>
    <div class="detail-art">${art(project.visual, true)}<div class="detail-caption">${e(project.tags.join(' / '))}</div></div>
    <div class="detail-content"><aside><dl><dt>Area</dt><dd>${e(project.category)}</dd><dt>Format</dt><dd>${e(project.kind)}</dd><dt>Stack</dt><dd>${project.tags.map(tag => `<span>${e(tag)}</span>`).join('')}</dd></dl>${project.attribution ? `<p class="attribution">Fork of <a href="${e(project.attribution.url)}">${e(project.attribution.name)} ↗</a></p>` : ''}</aside><div class="detail-story"><section><h2>Overview</h2><p>${e(project.overview)}</p></section>${project.category !== 'Archive' ? `<section><h2>Build notes</h2><ul>${project.approach.map(item => `<li>${e(item)}</li>`).join('')}</ul></section>` : ''}<section class="scope-note"><h2>Project status</h2><p>${e(project.scope)}</p></section></div></div>
    <div class="section-heading related-heading"><h2>More projects</h2></div><div class="project-grid related-projects">${related.map(card).join('')}</div>
  </main>${footer()}</div>`;
}
