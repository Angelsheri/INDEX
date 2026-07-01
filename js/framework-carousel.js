/* ── Framework carousel (GSAP-driven slide, aria-selected pagination) ── */
document.addEventListener('DOMContentLoaded', function () {
  function init() {
    if (typeof gsap === 'undefined') { setTimeout(init, 50); return; }

    const track      = document.getElementById('framework-track');
    const pagination = document.getElementById('framework-pagination');
    const prevBtn    = document.querySelector('.framework-nav-prev');
    const nextBtn    = document.querySelector('.framework-nav-next');
    if (!track || !pagination) return;

    const pages = Array.from(track.querySelectorAll('.framework-page'));
    if (!pages.length) return;

    let current = 0;
    let timer   = null;
    const AUTO_MS = 5000;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Ensure track spans all pages horizontally (each page is flex 0 0 100%)
    track.style.width = (pages.length * 100) + '%';
    pages.forEach(p => { p.style.width = (100 / pages.length) + '%'; p.style.flex = '0 0 ' + (100 / pages.length) + '%'; });

    // Build dots
    pagination.innerHTML = '';
    pages.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Framework page ' + (i + 1));
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', function () { goTo(i); restart(); });
      pagination.appendChild(dot);
    });
    const dots = Array.from(pagination.children);

    function setActive(i) {
      dots.forEach((d, idx) => d.setAttribute('aria-selected', idx === i ? 'true' : 'false'));
    }

    function goTo(index) {
      const total = pages.length;
      const next  = ((index % total) + total) % total;
      current = next;
      const pct = -(100 / pages.length) * next;
      if (prefersReduce) {
        track.style.transform = 'translateX(' + pct + '%)';
      } else {
        gsap.to(track, { xPercent: pct, duration: 0.7, ease: 'power3.out' });
      }
      setActive(next);
    }

    function start() { if (!prefersReduce) timer = setInterval(function () { goTo(current + 1); }, AUTO_MS); }
    function stop()  { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); restart(); });

    const wrap = document.querySelector('.framework-carousel');
    if (wrap) {
      wrap.addEventListener('mouseenter', stop);
      wrap.addEventListener('mouseleave', start);
      wrap.tabIndex = 0;
      wrap.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft')  { goTo(current - 1); restart(); }
        if (e.key === 'ArrowRight') { goTo(current + 1); restart(); }
      });
    }

    // Reset transforms on resize (xPercent stays consistent w/ new track width)
    goTo(0);
    start();
  }
  init();
});
