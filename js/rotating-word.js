/* ── Rotating headline word ─────────────────────── */
const words = [
    'Discord bots',
    'Telegram bots',
    'APIs',
    'Databases',
    'Static sites'
];
let idx = 0;
const wordEl      = document.getElementById('rotating-word');
const underlineEl = document.getElementById('dyn-underline');

function triggerUnderline() {
    if (!underlineEl) return;
    underlineEl.classList.remove('animate');
    void underlineEl.offsetWidth;
    underlineEl.classList.add('animate');
}

function cycleWord() {
    if (!wordEl) return;
    wordEl.classList.add('fade-out');
    setTimeout(() => {
        idx = (idx + 1) % words.length;
        wordEl.textContent = words[idx];
        wordEl.style.transition = 'none';
        wordEl.style.opacity = '0';
        wordEl.style.transform = 'translateY(5px)';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                wordEl.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
                wordEl.style.opacity = '1';
                wordEl.style.transform = 'translateY(0)';
                wordEl.classList.remove('fade-out');
                triggerUnderline();
            });
        });
    }, 180);
}
setInterval(cycleWord, 2400);
setTimeout(triggerUnderline, 500);

/* Task 3: Mockup heading word-switching animation removed.
   The heading "Powerful hosting without the complexity." is now static. */
