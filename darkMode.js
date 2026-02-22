document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('darkModeBtn');
    const themeIcon = themeBtn.querySelector('i');

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme); 

        if (theme === 'dark') {
            themeIcon.className = 'bi bi-sun-fill';
            themeBtn.classList.replace('btn-primary', 'btn-warning');
        } else {
            themeIcon.className = 'bi bi-moon-stars-fill';
            themeBtn.classList.replace('btn-warning', 'btn-primary');
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
});