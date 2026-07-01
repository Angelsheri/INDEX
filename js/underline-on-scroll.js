/* ── Section header underline animation ─────────── */
document.addEventListener('DOMContentLoaded', function () {
    const headers = document.querySelectorAll('.anim-underline');
    if (!headers.length) return;

    if (!('IntersectionObserver' in window)) {
        headers.forEach(function (el) { el.classList.add('animate'); });
        return;
    }

    const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    headers.forEach(function (el) { io.observe(el); });
});
