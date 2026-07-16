gsap.registerPlugin(ScrollTrigger);

// ── NAV ──
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── FLIP WORDS ──
(function () {
  const el = document.querySelector('.flip-word');
  if (!el) return;
  const words = ['durer', 'vivre', 'profiter', 'habiter', 'respirer'];
  let current = 0;

  function next() {
    current = (current + 1) % words.length;
    gsap.timeline()
      .to(el, { opacity: 0, y: -18, filter: 'blur(5px)', duration: 0.55, ease: 'power2.in',
        onComplete: () => { el.textContent = words[current]; }
      })
      .fromTo(el,
        { opacity: 0, y: 20, filter: 'blur(5px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65, ease: 'power2.out' }
      );
  }

  setInterval(next, 3800);
})();

// ── HERO ANIMATION (load) ──
const heroTl = gsap.timeline({ delay: 0.1 });
heroTl
  .from('.hero-tag span', { opacity: 0, y: 12, stagger: 0.1, duration: 0.6, ease: 'power2.out' })
  .from('.hero-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.3')
  .from('.hero-desc', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
  .from('.hero-bottom .btn-primary', { opacity: 0, y: 16, duration: 0.5, ease: 'power2.out' }, '-=0.3')
  .from('.hero-image', { opacity: 0, scale: 1.04, duration: 1, ease: 'power2.out' }, 0.2);

// ── HERO PARALLAX ──
const heroImg = document.querySelector('.hero-image img');
if (heroImg) {
  gsap.to(heroImg, {
    yPercent: 10, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
}

// ── INTRO ──
gsap.from('.intro-right p', {
  opacity: 0, y: 30, duration: 0.9, ease: 'power2.out',
  scrollTrigger: { trigger: '.intro', start: 'top 80%', once: true }
});

// ── STICKY GRID ──
class StickyGridScroll {
  constructor() {
    this.getElements();
    if (!this.block) return;
    this.groupItemsByColumn();
    this.initItems();
    this.animateGridOnScroll();
    this.animateTitleOnScroll();
  }

  getElements() {
    this.block   = document.querySelector('.sticky-section');
    this.content = this.block?.querySelector('.sticky-content');
    this.title   = this.block?.querySelector('.js-sticky-title');
    this.bottom  = this.block?.querySelector('.js-sticky-bottom');
    this.grid    = this.block?.querySelector('.js-grid');
    this.items   = this.block?.querySelectorAll('.js-item') ?? [];
  }

  groupItemsByColumn() {
    this.columns = [[], [], []];
    this.items.forEach((item, i) => this.columns[i % 3].push(item));
  }

  initItems() {
    const wh = window.innerHeight;
    const dy = wh / 2 + this.grid.offsetHeight / 2;
    this._dy = dy;
    this.columns.forEach((col, ci) => {
      gsap.set(col, { y: dy * (ci % 2 === 0 ? -1 : 1) });
    });
    gsap.set(this.bottom, { opacity: 0, pointerEvents: 'none' });
  }

  gridRevealTimeline() {
    const tl = gsap.timeline();
    this.columns.forEach((col, ci) => {
      const fromTop = ci % 2 === 0;
      tl.to(col, {
        y: 0,
        stagger: { each: 0.06, from: fromTop ? 'end' : 'start' },
        ease: 'power1.inOut',
      }, 'reveal');
    });
    return tl;
  }

  gridZoomTimeline() {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.inOut' } });
    tl.to(this.grid, { scale: 2.05 });
    tl.to(this.columns[0], { xPercent: -40 }, '<');
    tl.to(this.columns[2], { xPercent:  40 }, '<');
    tl.to(this.columns[1], {
      yPercent: (i) => (i < 2 ? -1 : 1) * 40,
      duration: 0.5, ease: 'power1.inOut',
    }, '-=0.5');
    return tl;
  }

  animateGridOnScroll() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.block,
        start: 'top 25%', end: 'bottom bottom', scrub: 1,
        onLeave:     () => this.showContent(false),
        onLeaveBack: () => this.showContent(false),
        onUpdate: (self) => {
          // apparaît seulement dans les 15% finaux de l'animation
          if (self.progress >= 0.85) {
            this.showContent(true);
          } else {
            this.showContent(false);
          }
        },
      },
    });
    tl.add(this.gridRevealTimeline()).add(this.gridZoomTimeline(), '-=0.6');
  }

  animateTitleOnScroll() {
    if (!this.title) return;
    gsap.from(this.title, {
      opacity: 0, duration: 0.7, ease: 'power1.out',
      scrollTrigger: { trigger: this.block, start: 'top 57%', toggleActions: 'play none none reset' },
    });
  }

  showContent(show) {
    if (!this.bottom) return;
    gsap.to(this.bottom, {
      opacity: show ? 1 : 0,
      pointerEvents: show ? 'all' : 'none',
      duration: 0.5, overwrite: true,
    });
  }
}

new StickyGridScroll();

// ── SERVICES ──
gsap.from('.services-header', {
  opacity: 0, y: 24, duration: 0.7, ease: 'power2.out',
  scrollTrigger: { trigger: '.services', start: 'top 80%', once: true }
});
document.querySelectorAll('.service-item').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0, x: -30, duration: 0.6, ease: 'power2.out', delay: i * 0.08,
    scrollTrigger: { trigger: el, start: 'top 88%', once: true }
  });
});

// ── PROJETS ──
gsap.from('.projects-header', {
  opacity: 0, y: 20, duration: 0.6, ease: 'power2.out',
  scrollTrigger: { trigger: '.projects', start: 'top 80%', once: true }
});
document.querySelectorAll('.proj').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0, y: 40, duration: 0.7, ease: 'power2.out', delay: i * 0.1,
    scrollTrigger: { trigger: '.projects-grid', start: 'top 80%', once: true }
  });
});

// ── STATS ──
document.querySelectorAll('.stat-item').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0, y: 20, duration: 0.5, ease: 'power2.out', delay: i * 0.1,
    scrollTrigger: { trigger: '.stats', start: 'top 85%', once: true }
  });
});

// ── JOURNAL ──
gsap.from('.journal-header', {
  opacity: 0, y: 20, duration: 0.6, ease: 'power2.out',
  scrollTrigger: { trigger: '.journal', start: 'top 80%', once: true }
});
document.querySelectorAll('.journal-item').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0, y: 40, duration: 0.7, ease: 'power2.out', delay: i * 0.12,
    scrollTrigger: { trigger: '.journal-grid', start: 'top 80%', once: true }
  });
});

// ── CTA ──
gsap.from('.cta-inner', {
  opacity: 0, x: -30, duration: 0.8, ease: 'power2.out',
  scrollTrigger: { trigger: '.cta', start: 'top 80%', once: true }
});

ScrollTrigger.refresh();
