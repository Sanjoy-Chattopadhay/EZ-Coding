document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const datetimeButton = document.getElementById('datetime');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', function() {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    function updateDateTime() {
        const now = new Date();
        const formattedDateTime = now.toLocaleString();
        datetimeButton.textContent = formattedDateTime;
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();
});