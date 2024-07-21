document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const datetimeButton = document.getElementById('datetime');
    const searchInput = document.getElementById('search-input');
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

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchValue = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('table tbody tr');

        rows.forEach(row => {
            const problemText = row.cells[0].textContent.toLowerCase();
            const descriptionText = row.cells[1].textContent.toLowerCase();
            const patternText = row.cells[2].textContent.toLowerCase(); // Adjusted column index for Pattern

            if (problemText.includes(searchValue) || descriptionText.includes(searchValue) || patternText.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Pagination functionality
    const rowsPerPage = 10;
    const rows = document.querySelectorAll('table tbody tr');
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    let currentPage = 1;

    function showPage(page) {
        rows.forEach((row, index) => {
            if (index >= (page - 1) * rowsPerPage && index < page * rowsPerPage) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        document.getElementById('page-number').textContent = `Page ${page}`;
        document.getElementById('prev-page').disabled = page === 1;
        document.getElementById('next-page').disabled = page === totalPages;
    }

    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    showPage(currentPage);

    // Sort and revert functionality
    const filterIcon = document.getElementById('filter-icon');
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const toast = document.getElementById('toast');

    let isSorted = false;
    const originalRows = Array.from(tbody.querySelectorAll('tr'));

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000); // Toast message visible for 2 seconds
    }

    filterIcon.addEventListener('click', function() {
        if (isSorted) {
            // Revert to original order
            originalRows.forEach(row => tbody.appendChild(row));
            showToast('Order reverted');
        } else {
            const rows = Array.from(tbody.querySelectorAll('tr'));

            // Sort rows based on pattern column
            rows.sort((a, b) => {
                const patternA = a.cells[2].textContent.trim().toLowerCase();
                const patternB = b.cells[2].textContent.trim().toLowerCase();
                return patternA.localeCompare(patternB);
            });

            // Append sorted rows
            rows.forEach(row => tbody.appendChild(row));
            showToast('Patterns sorted alphabetically');
        }

        // Toggle sorting state
        isSorted = !isSorted;
    });
});
