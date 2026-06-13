function scorePassword(password) {
    let score = 0;
    if (!password) return score;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++; // extra for longer
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0..6
}

function strengthLabel(score) {
    if (score <= 2) return {text: 'Weak Password', color: 'red'};
    if (score <= 4) return {text: 'Medium Password', color: 'orange'};
    return {text: 'Strong Password', color: 'green'};
}

function updateUI(password) {
    const meter = document.getElementById('meter');
    const bar = meter.querySelector('.bar');
    const strength = document.getElementById('strength');
    const score = scorePassword(password);
    const pct = Math.min(Math.round((score / 6) * 100), 100);
    const label = strengthLabel(score);

    if (bar) {
        bar.style.width = pct + '%';
        bar.style.background = label.color;
        bar.style.transition = 'width 160ms ease';
    }
    strength.textContent = label.text;
    strength.style.color = label.color;
}

function checkPassword() {
    const pw = document.getElementById('password').value;
    updateUI(pw);
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('password');
    const checkBtn = document.getElementById('check');
    const toggle = document.getElementById('toggle');

    input.addEventListener('input', () => updateUI(input.value));
    checkBtn.addEventListener('click', () => checkPassword());
    toggle.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text';
            toggle.textContent = 'Hide';
        } else {
            input.type = 'password';
            toggle.textContent = 'Show';
        }
    });

    // initialize
    updateUI(input.value);
});
