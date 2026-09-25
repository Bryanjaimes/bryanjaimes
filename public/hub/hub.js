(() => {
  const root = document.querySelector('.hub');
  if (!root || root.dataset.enhanced) return;
  root.dataset.enhanced = 'true';
  const menu = root.querySelector('#mobile-navigation');
  const toggle = root.querySelector('.menu-toggle');
  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  };
  toggle.addEventListener('click', () => {
    const opening = menu.hidden;
    menu.hidden = !opening;
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
  });
  menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.hub-header')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) { closeMenu(); toggle.focus(); }
  });

  const search = root.querySelector('#project-search');
  if (search) {
    const buttons = [...root.querySelectorAll('[data-filter]')];
    const cards = [...root.querySelectorAll('[data-project-card]')];
    const validCategories = buttons.map(button => button.dataset.filter);
    const params = new URLSearchParams(location.search);
    let category = validCategories.includes(params.get('category')) ? params.get('category') : 'Selected';
    search.value = (params.get('q') || '').slice(0, 120);
    const apply = (updateUrl = true) => {
      const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      let visible = 0;
      cards.forEach(card => {
        const matchesCategory = category === 'All projects' || (category === 'Selected' ? card.dataset.category !== 'Archive' : card.dataset.category === category);
        const matches = matchesCategory && words.every(word => card.dataset.search.includes(word));
        card.hidden = !matches;
        if (matches) visible++;
      });
      buttons.forEach(button => {
        const active = button.dataset.filter === category;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      root.querySelector('#project-result-count').textContent = `${visible} project${visible === 1 ? '' : 's'}${search.value.trim() ? ` matching “${search.value.trim()}”` : ''}`;
      root.querySelector('#project-empty').hidden = visible !== 0;
      if (updateUrl) {
        const url = new URL(location.href);
        if (category === 'Selected') url.searchParams.delete('category');
        else url.searchParams.set('category', category);
        if (search.value.trim()) url.searchParams.set('q', search.value.trim());
        else url.searchParams.delete('q');
        history.replaceState(null, '', url);
      }
    };
    buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; apply(); }));
    search.addEventListener('input', () => { if (search.value && category === 'Selected') category = 'All projects'; apply(); });
    search.form.addEventListener('submit', event => event.preventDefault());
    root.querySelector('[data-reset-filters]').addEventListener('click', () => { category = 'All projects'; search.value = ''; apply(); search.focus(); });
    root.querySelectorAll('[data-category-link]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault(); category = link.dataset.categoryLink; search.value = ''; apply();
      const destination = new URL(location.href); destination.hash = 'projects';
      history.replaceState(null, '', destination);
      root.querySelector('#projects').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      closeMenu(); search.focus({ preventScroll: true });
    }));
    window.addEventListener('popstate', () => {
      const restored = new URLSearchParams(location.search);
      category = validCategories.includes(restored.get('category')) ? restored.get('category') : 'Selected';
      search.value = (restored.get('q') || '').slice(0, 120); apply(false);
    });
    document.addEventListener('keydown', event => {
      if ((event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) && !event.target.closest('input, textarea, [contenteditable="true"]')) {
        event.preventDefault(); search.focus(); search.scrollIntoView({ block: 'center' });
      }
    });
    apply(false);
  }

  const copy = root.querySelector('[data-copy-email]');
  if (copy) copy.addEventListener('click', async () => {
    const status = root.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(copy.dataset.copyEmail);
      status.textContent = 'Email copied';
    } catch {
      status.textContent = copy.dataset.copyEmail;
    }
  });
})();
