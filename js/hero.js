/* ── Hero background reveal ───────────────────────── */
// Task 1 bug fix: hero-bg is now visible by default via CSS
// (opacity: 1), so the wave is never hidden if this script is
// delayed or GSAP fails to load. This block only adds a quick,
// optional polish fade-in on top of that guaranteed-visible base —
// it is decorative, not load-bearing.
document.addEventListener('DOMContentLoaded', function () {
    const heroBg = document.getElementById('hero-bg');
    if (!heroBg) return;

    if (typeof gsap === 'undefined') {
        return; // CSS already shows the background; nothing more to do.
    }

    gsap.fromTo(heroBg,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
});

/* ── Hero content slide-up on load ────────────────
 * Extracted from the shared initScrollAnimations() function in
 * the original js/index.js, where a single guard at the top of
 * that function covered every block inside it. Split out on its
 * own here, so it needs its own copy of that same guard to behave
 * identically while waiting for GSAP to load. The code below this
 * guard is verbatim from the original. */
document.addEventListener('DOMContentLoaded', function () {
    function initHeroContentReveal() {
        if (typeof gsap === 'undefined') {
            setTimeout(initHeroContentReveal, 50);
            return;
        }

            /* ══ HERO — content slides up + fades in on load ══ */
            var heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                gsap.fromTo(heroContent,
                    { opacity: 0, y: 36 },
                    { opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: 'power3.out' }
                );
            }
    }
    initHeroContentReveal();
});

/* ── Parallax — extracted from initScrollAnimations() ─────
 * Same reasoning as above: this needs its own GSAP-ready guard
 * now that it's standalone. Code below the guard is verbatim. */
document.addEventListener('DOMContentLoaded', function () {
    function initHeroParallax() {
        if (typeof gsap === 'undefined') {
            setTimeout(initHeroParallax, 50);
            return;
        }

            /* ══ SUBTLE PARALLAX on hero background ══
               Only on devices that likely have a mouse / no reduced-motion pref */
            var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            var isTouchOnly    = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

            if (!prefersReduced && !isTouchOnly) {
                var heroBgEl = document.getElementById('hero-bg');
                if (heroBgEl) {
                    window.addEventListener('scroll', function () {
                        var scrollY = window.scrollY || window.pageYOffset;
                        gsap.set(heroBgEl, { y: scrollY * 0.28 });
                    }, { passive: true });
                }
            }
    }
    initHeroParallax();
});
