/* ── Newsletter signup ───────────────────────────── */
(function () {
    const form     = document.getElementById('newsletter-form');
    const emailEl  = document.getElementById('newsletter-email');
    const feedback = document.getElementById('newsletter-feedback');
    const btn      = form ? form.querySelector('.newsletter-btn') : null;

    if (!form) return;

    const RATE_LIMIT_MS   = 60000;
    const MAX_PER_SESSION = 3;
    let lastSubmit        = 0;
    let submitCount       = 0;

    function isValidEmail(val) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
    }

    function setFeedback(msg, type) {
        feedback.textContent = msg;
        feedback.className   = 'newsletter-feedback' + (type ? ' ' + type : '');
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = emailEl.value.trim();

        if (!email) {
            setFeedback('Please enter your email address.', 'error');
            emailEl.focus();
            return;
        }
        if (!isValidEmail(email)) {
            setFeedback('Please enter a valid email address.', 'error');
            emailEl.focus();
            return;
        }

        if (submitCount >= MAX_PER_SESSION) {
            setFeedback('You\'ve already subscribed. Thank you!', 'success');
            return;
        }

        const now = Date.now();
        if (now - lastSubmit < RATE_LIMIT_MS) {
            const secsLeft = Math.ceil((RATE_LIMIT_MS - (now - lastSubmit)) / 1000);
            setFeedback('Please wait ' + secsLeft + 's before trying again.', 'error');
            return;
        }

        btn.disabled = true;
        btn.textContent = 'Subscribing...';
        setFeedback('', '');

        setTimeout(function () {
            lastSubmit = Date.now();
            submitCount++;
            btn.disabled = false;
            btn.textContent = 'Subscribe';
            emailEl.value = '';
            setFeedback('You\'re in! We\'ll keep you updated.', 'success');
        }, 900);
    });

    emailEl.addEventListener('input', function () {
        if (feedback.classList.contains('error')) {
            setFeedback('', '');
        }
    });
})();
