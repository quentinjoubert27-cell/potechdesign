// Animations communes à toutes les pages secondaires
gsap.registerPlugin(ScrollTrigger);

// ── HERO PAGE (h1 + p + label) ──
const heroEl = document.querySelector(
  '.contact-hero, .prest-hero, .actu-hero, .article-hero'
);
if (heroEl) {
  const tl = gsap.timeline({ delay: 0.1 });
  const label = heroEl.querySelector('.label, .article-cat');
  const title = heroEl.querySelector('h1, h2');
  const desc  = heroEl.querySelector('p:not(.label)');

  if (label) tl.from(label, { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out' });
  if (title) tl.from(title, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.2');
  if (desc)  tl.from(desc,  { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.3');
}

// ── IMAGE COVER (articles) ──
const cover = document.querySelector('.article-cover img');
if (cover) {
  gsap.from(cover, { scale: 1.06, duration: 1.2, ease: 'power2.out', delay: 0.2 });
}

// ── SCROLL : fade-up générique ──
const fadeEls = document.querySelectorAll(
  '.article-body h2, .article-body p, .article-body ul, .article-pull, .tip-box, .stat-card, .article-cta,' +
  '.prest-block, .contact-info-block, .contact-hours-row,' +
  '.actu-featured, .actu-card'
);
fadeEls.forEach((el, i) => {
  gsap.from(el, {
    opacity: 0, y: 28, duration: 0.65, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 88%', once: true }
  });
});

// ── PRESTATIONS : blocs gauche/droite ──
document.querySelectorAll('.prest-block').forEach((block, i) => {
  const left  = block.querySelector('.prest-block-left');
  const right = block.querySelector('.prest-block-right');
  if (left) gsap.from(left,  { opacity: 0, x: -30, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: block, start: 'top 82%', once: true } });
  if (right) gsap.from(right, { opacity: 0, x:  30, duration: 0.7, ease: 'power2.out', delay: 0.1, scrollTrigger: { trigger: block, start: 'top 82%', once: true } });
});

// ── CTA bas de page ──
const ctaEl = document.querySelector('.prest-cta, .actu-cta, .contact-location');
if (ctaEl) {
  gsap.from(ctaEl, {
    opacity: 0, y: 24, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: ctaEl, start: 'top 88%', once: true }
  });
}

ScrollTrigger.refresh();
