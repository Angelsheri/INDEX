/* ── shared/header/template.js ────────────────────────────────────
 * Header HTML template. Moved verbatim from the original
 * shared/header.js (the NAV_LINKS array, desktopLinks(), and the
 * html template literal are unchanged). Wrapped in one exported
 * function so shared/header/index.js (the bootstrap) can call it —
 * this wrapper is the minimal glue needed to split the template
 * into its own file without duplicating the DOM-injection logic
 * that lives only in index.js.
 * ────────────────────────────────────────────────────────────── */
window.buildStratumHeaderHTML = function (active) {
    const NAV_LINKS = [
        { key: 'features', label: 'Features', href: '#features' },
        { key: 'pricing',  label: 'Pricing',  href: 'pricing.html'        },
        { key: 'docs',     label: 'Docs',      href: 'docs.html'     },
        { key: 'contact',  label: 'Contact',   href: 'contact.html'  },
    ];

    function desktopLinks() {
        return NAV_LINKS.map(function (l) {
            const cls = l.key === active ? ' class="active"' : '';
            return '<a href="' + l.href + '"' + cls + '>' + l.label + '</a>';
        }).join('\n        ');
    }

    const html = `<header>
    <a href="index.html" class="logo">
        <img src="images/logo.PNG" alt="Stratum Hosting Logo">
        Stratum Hosting
    </a>

    <!-- Desktop navigation -->
    <nav class="desktop-nav" id="nav-menu">
        ${desktopLinks()}
        <div class="nav-divider"></div>
        <div class="nav-auth-guest" style="display:none;">
            <a href="login.html" class="cssbuttons-io-button">
                <span>Log in</span>
            </a>
            <a href="signup.html" class="cssbuttons-io-button">
                <span>Get Started</span>
            </a>
        </div>
        <div class="nav-auth-user" style="display:none;">
            <a href="dashboard.html" class="cssbuttons-io-button">
                <span>Dashboard</span>
            </a>
            <button type="button" class="cssbuttons-io-button nav-logout-btn">
                <span>Log out</span>
            </button>
        </div>
    </nav>

    <!-- Mobile hamburger button -->
    <button
        class="mobile-menu-btn"
        aria-label="Toggle Menu"
        id="menu-btn"
        onclick="toggleMenu()"
        aria-expanded="false"
    >
        <span class="bar bar-top"></span>
        <span class="bar bar-mid"></span>
        <span class="bar bar-bot"></span>
    </button>

    <!-- Backdrop behind the sliding sidebar -->
    <div class="mnav-overlay" id="mnav-overlay"></div>

    <!-- Sidebar navigation (slides in from the left) -->
    <nav class="mobile-nav" id="mobile-nav-menu">

        <div class="mnav-brand">
            <img src="images/logo.PNG" alt="Stratum Hosting Logo">
            <span>Stratum Hosting</span>
        </div>

        <div class="mnav-section-label">Product</div>

        <a href="index.html#features" class="mnav-item" onclick="toggleMenu()">
            <div class="mnav-icon">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="6" height="6" rx="1.5"/>
                    <rect x="11" y="3" width="6" height="6" rx="1.5"/>
                    <rect x="3" y="11" width="6" height="6" rx="1.5"/>
                    <rect x="11" y="11" width="6" height="6" rx="1.5"/>
                </svg>
            </div>
            <span class="mnav-item-title">Features</span>
        </a>

        <a href="pricing.html" class="mnav-item" onclick="toggleMenu()">
            <div class="mnav-icon">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="10" cy="10" r="7.5"/>
                    <path d="M10 6v8M7.5 8.5c0-1.1.9-2 2.5-2s2.5.9 2.5 2c0 2.5-5 2.5-5 5 0 1.1.9 2 2.5 2s2.5-.9 2.5-2"/>
                </svg>
            </div>
            <span class="mnav-item-title">Pricing</span>
        </a>

        <div class="mnav-divider"></div>
        <div class="mnav-section-label">Resources</div>

        <a href="index.html#docs" class="mnav-item" onclick="toggleMenu()">
            <div class="mnav-icon">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 3h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/>
                    <path d="M7 7h6M7 10h6M7 13h4"/>
                </svg>
            </div>
            <span class="mnav-item-title">Documentation</span>
        </a>

        <a href="index.html#status" class="mnav-item" onclick="toggleMenu()">
            <div class="mnav-icon">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="10" cy="10" r="7.5"/>
                    <path d="M10 6v4l2.5 2.5"/>
                </svg>
            </div>
            <span class="mnav-item-title">Status</span>
        </a>

        <a href="index.html#contact" class="mnav-item" onclick="toggleMenu()">
            <div class="mnav-icon">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2.5 5.5A2 2 0 014.5 3.5h11a2 2 0 012 2v9a2 2 0 01-2 2h-11a2 2 0 01-2-2v-9z"/>
                    <path d="M2.5 6l7.5 5.5L17.5 6"/>
                </svg>
            </div>
            <span class="mnav-item-title">Contact</span>
        </a>

        <div class="mnav-divider"></div>

        <div class="mnav-actions nav-auth-guest" style="display:none;">
            <a href="login.html" class="cssbuttons-io-button" onclick="toggleMenu()">
                <span>Log in</span>
            </a>
            <a href="signup.html" class="cssbuttons-io-button" onclick="toggleMenu()">
                <span>Get Started</span>
            </a>
        </div>
        <div class="mnav-actions nav-auth-user" style="display:none;">
            <a href="dashboard.html" class="cssbuttons-io-button" onclick="toggleMenu()">
                <span>Dashboard</span>
            </a>
            <button type="button" class="cssbuttons-io-button nav-logout-btn" onclick="toggleMenu()">
                <span>Log out</span>
            </button>
        </div>

    </nav>
</header>`;

    return html;
};

/* header bootstrap (self-inits at DOM ready) */
(function () {
  function inject() {
    if (document.querySelector('header .logo')) return;
    const script = document.currentScript || document.querySelector('script[data-active]');
    const active = script ? (script.getAttribute('data-active') || 'home') : 'home';
    const html = window.buildStratumHeaderHTML(active);
    const temp = document.createElement('div');
    temp.innerHTML = html.trim();
    const headerEl = temp.firstElementChild;
    document.body.insertBefore(headerEl, document.body.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();

/* ── shared/header/behavior.js ─────────────────────────────────────
 * Header interactions: sidebar menu toggle, outside-click close,
 * and Escape-key close. Moved verbatim from the original
 * shared/header.js, then upgraded for the left sidebar nav.
 * ────────────────────────────────────────────────────────────── */

/* ── Sidebar menu toggle (shared across all pages) ──
 * Classes (.open / .is-open / .mnav-locked) are toggled first so the
 * sidebar still works correctly even if the GSAP CDN hasn't loaded —
 * the CSS transition on .mobile-nav is the fallback for that case.
 * When GSAP is available it takes over the actual slide animation
 * via inline transforms, which is smoother and interruptible (e.g.
 * rapid open/close clicks don't queue up janky animations). */
window.toggleMenu = function () {
    const nav = document.getElementById('mobile-nav-menu');
    const btn = document.getElementById('menu-btn');
    const overlay = document.getElementById('mnav-overlay');
    if (!nav || !btn) return;

    const opening = !nav.classList.contains('open');

    nav.classList.toggle('open', opening);
    if (overlay) overlay.classList.toggle('open', opening);
    document.body.classList.toggle('mnav-locked', opening);
    btn.classList.toggle('is-open', opening);
    btn.setAttribute('aria-expanded', opening);

    if (typeof gsap !== 'undefined') {
        gsap.killTweensOf(nav);
        if (overlay) gsap.killTweensOf(overlay);

        if (opening) {
            gsap.fromTo(nav, { x: '-100%' }, { x: '0%', duration: 0.32, ease: 'power3.out' });
            if (overlay) gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28, ease: 'power1.out' });
        } else {
            gsap.to(nav, { x: '-100%', duration: 0.26, ease: 'power2.in' });
            if (overlay) gsap.to(overlay, { autoAlpha: 0, duration: 0.22, ease: 'power1.in' });
        }
    }
};

/* ── Outside-click close ── */
document.addEventListener('click', function (e) {
    const nav = document.getElementById('mobile-nav-menu');
    const btn = document.getElementById('menu-btn');
    if (nav && btn && nav.classList.contains('open') &&
        !nav.contains(e.target) && !btn.contains(e.target)) {
        window.toggleMenu();
    }
});

/* ── Escape-key close ── */
document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    const nav = document.getElementById('mobile-nav-menu');
    if (nav && nav.classList.contains('open')) {
        window.toggleMenu();
    }
});
