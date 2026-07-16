document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-loaded');

  // ── PAGE TRANSITIONS ──
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('http') ||
      link.target === '_blank'
    ) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.remove('page-loaded');
      setTimeout(() => { window.location.href = href; }, 350);
    });
  });

  // ── MENU MOBILE ──
  const burger = document.querySelector('.nav-burger');
  if (!burger) return;

  // Construire le drawer
  const drawer = document.createElement('div');
  drawer.className = 'nav-mobile';

  // Détecter la profondeur du chemin pour les liens relatifs
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const prefix = depth >= 2 ? '../../' : depth === 1 ? '../' : '';

  const navLinks = [
    { href: prefix + 'index.html', label: 'Accueil' },
    { href: prefix + 'projets.html', label: 'Projets' },
    { href: prefix + 'prestations.html', label: 'Prestations' },
    { href: prefix + 'actualites.html', label: 'Actualités' },
    { href: prefix + 'contact.html', label: 'Contact' },
  ];

  // Marquer le lien actif
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(({ href, label }) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    const target = href.split('/').pop();
    if (target === currentPage) a.classList.add('nav-active');
    drawer.appendChild(a);
  });

  const closeBtn = document.createElement('button');
  closeBtn.className = 'nav-mobile-close';
  closeBtn.innerHTML = '✕';
  closeBtn.setAttribute('aria-label', 'Fermer le menu');
  drawer.appendChild(closeBtn);

  document.body.appendChild(drawer);

  const open = () => {
    drawer.classList.add('open');
    burger.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    drawer.classList.remove('open');
    burger.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => drawer.classList.contains('open') ? close() : open());
  closeBtn.addEventListener('click', close);

  // Fermer sur clic lien (avec transition)
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      close();
      const href = link.getAttribute('href');
      document.body.classList.remove('page-loaded');
      setTimeout(() => { window.location.href = href; }, 350);
    });
  });

  // Fermer sur Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});
