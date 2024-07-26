document.addEventListener('DOMContentLoaded', function() {
    function updateDateTime() {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        document.getElementById('datetime-text').textContent = now.toLocaleTimeString([], options);
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
});


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const problemList = document.getElementById('problem-list');
    const rows = problemList.getElementsByTagName('tr');

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();

        for (const row of rows) {
            const cells = row.getElementsByTagName('td');
            let match = false;

            for (const cell of cells) {
                if (cell.textContent.toLowerCase().includes(searchTerm)) {
                    match = true;
                    break;
                }
            }

            row.style.display = match ? '' : 'none';
        }
    });
});


function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); // initial call to display clock immediately


document.addEventListener('DOMContentLoaded', function() {
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('digital-clock').textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateClock(); // Initial call
    setInterval(updateClock, 1000); // Update every second
});
