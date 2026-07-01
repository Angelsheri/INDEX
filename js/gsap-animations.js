/* ── GSAP scroll & UI animations (polished) ────────────────────
 * Requires: gsap, ScrollTrigger (loaded via CDN in index.html)
 * ─────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  function init() {
    if (typeof gsap === 'undefined') { setTimeout(init, 40); return; }
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.defaults({ ease: 'power3.out' });

    // Always show underlines eventually
    const underlines = document.querySelectorAll('.anim-underline');
    if (reduce) { underlines.forEach(el => el.classList.add('in-view')); return; }

    /* ── Hero entrance — word-by-word stagger for the h1 ── */
    const heroH1 = document.querySelector('.hero h1');
    if (heroH1 && !heroH1.dataset.split) {
      // Split direct text nodes into word-spans while preserving the .hero-dynamic-wrap intact.
      const frag = document.createDocumentFragment();
      heroH1.childNodes.forEach(node => {
        if (node.nodeType === 3) {
          node.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const s = document.createElement('span');
            s.className = 'hero-word';
            s.style.display = 'inline-block';
            s.style.willChange = 'transform,opacity';
            s.textContent = part;
            frag.appendChild(s);
          });
        } else {
          const clone = node.cloneNode(true);
          if (clone.classList) clone.classList.add('hero-word');
          if (clone.style) { clone.style.display = 'inline-block'; }
          frag.appendChild(clone);
        }
      });
      heroH1.innerHTML = '';
      heroH1.appendChild(frag);
      heroH1.dataset.split = '1';
    }

    const heroTl = gsap.timeline({ delay: 0.05 });
    heroTl
      .from('.hero .hero-word', { y: 24, opacity: 0, duration: 0.7, stagger: 0.045, ease: 'power3.out' })
      .from('.hero-content > p',        { y: 18, opacity: 0, duration: 0.6 }, '-=0.45')
      .from('.hero .mockup-points li',  { y: 14, opacity: 0, duration: 0.5, stagger: 0.07 }, '-=0.35')
      .from('.hero .cta > *',           { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.3')
      .add(() => document.querySelectorAll('.hero .hero-word').forEach(w => w.style.willChange = 'auto'));

    if (!window.ScrollTrigger) {
      underlines.forEach(el => el.classList.add('in-view'));
      return;
    }

    /* ── Batched section reveals — smoother, less code ── */
    const revealTargets = [
      '.mockup-section .mockup-text > *', '.mockup-wrap',
      '.services-header > *', '.services-grid .card',
      '.framework-title', '.framework-carousel',
      '.features-header > *', '.features-grid .card',
      '.why-header > *', '.why-grid .card',
      '.about-text > *', '.about-stats .about-stat',
      '.security-header > *', '.security-layers .security-layer',
      '.faq-header > *', '.faq-list .faq-item',
      '.community-inner > *',
      '.final-cta-card > *',
      '.footer-body > *'
    ].join(', ');

    gsap.set(revealTargets, { opacity: 0, y: 28 });

    ScrollTrigger.batch(revealTargets, {
      start: 'top 88%',
      once: true,
      onEnter: batch => gsap.to(batch, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
        stagger: { amount: 0.35, from: 'start' },
        overwrite: 'auto'
      })
    });

    // Safety net — anything still hidden after 1.6s
    setTimeout(() => {
      document.querySelectorAll(revealTargets).forEach(el => {
        if (parseFloat(getComputedStyle(el).opacity) < 0.05) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.5 });
        }
      });
    }, 1600);

    /* ── Animated underline on section titles ── */
    gsap.utils.toArray('.anim-underline').forEach(el => {
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => el.classList.add('in-view')
      });
    });

    /* ── Subtle parallax on hero backdrop ── */
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      gsap.to(heroBg, {
        yPercent: 10, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    /* ── Card hover micro-interaction (desktop only) ── */
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.querySelectorAll('.card').forEach(card => {
        const enter = () => gsap.to(card, { y: -4, duration: 0.3, ease: 'power2.out' });
        const leave = () => gsap.to(card, { y: 0,  duration: 0.4, ease: 'power2.out' });
        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', leave);
      });
    }

    /* ── Refresh triggers after fonts/images settle ── */
    window.addEventListener('load', () => ScrollTrigger.refresh());
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  init();
});
