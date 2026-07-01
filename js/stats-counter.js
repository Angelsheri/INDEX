/* ── About stats counting animation ─────────────── */
document.addEventListener('DOMContentLoaded', function () {
    var statDefs = [
        { suffix: '%',    end: 99.9, decimals: 1, prefix: '' },
        { suffix: ' Gbps', end: 10,  decimals: 0, prefix: '' },
        { suffix: '/7',   end: 24,   decimals: 0, prefix: '' },
        { suffix: '+',    end: 5,    decimals: 0, prefix: '' }
    ];

    var statNumbers = document.querySelectorAll('.about-stat-number');
    if (!statNumbers.length) return;

    function runCount(el, def) {
        var start     = 0;
        var duration  = 1400;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased    = 1 - Math.pow(1 - progress, 3);
            var current  = start + (def.end - start) * eased;
            var display  = def.decimals > 0
                ? current.toFixed(def.decimals)
                : Math.floor(current).toString();
            el.textContent = def.prefix + display + def.suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = def.prefix
                    + def.end.toFixed(def.decimals > 0 ? def.decimals : 0).replace(/\.0$/, '')
                    + def.suffix;
            }
        }
        requestAnimationFrame(step);
    }

    function initStatsCounter() {
        if (!('IntersectionObserver' in window)) return;

        var aboutStats = document.querySelector('.about-stats');
        if (!aboutStats) return;

        var triggered = false;
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !triggered) {
                    triggered = true;
                    statNumbers.forEach(function (el, i) {
                        if (statDefs[i]) runCount(el, statDefs[i]);
                    });
                    counterObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });

        counterObserver.observe(aboutStats);
    }

    initStatsCounter();
});
