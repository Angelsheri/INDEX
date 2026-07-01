/* ── FAQ accordion (GSAP) ────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
    function initFaq() {
        if (typeof gsap === 'undefined') {
            setTimeout(initFaq, 50);
            return;
        }

        document.querySelectorAll('.faq-item').forEach(function (item) {
            const btn     = item.querySelector('.faq-question');
            const answer  = item.querySelector('.faq-answer');
            const chevron = item.querySelector('.faq-chevron');
            let open      = false;
            let animating = false;

            if (!btn || !answer) return;

            btn.addEventListener('click', function () {
                if (animating) return;
                animating = true;

                if (!open) {
                    gsap.set(answer, { height: 'auto', opacity: 1 });
                    const targetH = answer.offsetHeight;
                    gsap.set(answer, { height: 0, opacity: 0 });

                    btn.setAttribute('aria-expanded', 'true');
                    item.classList.add('open');
                    open = true;

                    gsap.fromTo(answer,
                        { height: 0, opacity: 0 },
                        {
                            height: targetH,
                            opacity: 1,
                            duration: 0.5,
                            ease: 'expo.out',
                            onComplete: function () {
                                gsap.set(answer, { height: 'auto' });
                                animating = false;
                            }
                        }
                    );
                    gsap.to(chevron, {
                        rotation: 180,
                        duration: 0.45,
                        ease: 'expo.out',
                        transformOrigin: '50% 50%'
                    });

                } else {
                    gsap.set(answer, { height: answer.offsetHeight });
                    btn.setAttribute('aria-expanded', 'false');
                    item.classList.remove('open');
                    open = false;

                    gsap.to(answer, {
                        height: 0,
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power3.inOut',
                        onComplete: function () {
                            animating = false;
                        }
                    });
                    gsap.to(chevron, {
                        rotation: 0,
                        duration: 0.38,
                        ease: 'power3.inOut',
                        transformOrigin: '50% 50%'
                    });
                }
            });
        });
    }

    initFaq();
});
