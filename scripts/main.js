// script.js

document.addEventListener('DOMContentLoaded', () => {
    const driverRows = document.querySelector('tbody');
    const filterInput = document.getElementById('filterInput');
    const modal = document.getElementById('driverModal');
    const modalDriverName = document.getElementById('modalDriverName');
    const modalDriverStats = document.getElementById('modalDriverStats');
    const closeModal = document.querySelector('.close');

    // Static driver data
    const drivers = [
        { name: "Max Verstappen", cnr: 96, brk: 96, rct: 89, ctr: 90, smt: 89, adp: 89, ovt: 92, def: 98, acc: 86, ovr: 92 },
        { name: "Lewis Hamilton", cnr: 93, brk: 95, rct: 86, ctr: 92, smt: 86, adp: 87, ovt: 90, def: 94, acc: 83, ovr: 90 },
        { name: "Charles Leclerc", cnr: 91, brk: 92, rct: 85, ctr: 88, smt: 87, adp: 84, ovt: 89, def: 90, acc: 88, ovr: 89 },
        { name: "Fernando Alonso", cnr: 90, brk: 91, rct: 84, ctr: 87, smt: 85, adp: 86, ovt: 88, def: 89, acc: 87, ovr: 88 },
        // Add more drivers as needed
    ];

    // Populate the table with static data
    drivers.forEach(driver => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${driver.name}</td>
            <td>${driver.cnr}</td>
            <td>${driver.brk}</td>
            <td>${driver.rct}</td>
            <td>${driver.ctr}</td>
            <td>${driver.smt}</td>
            <td>${driver.adp}</td>
            <td>${driver.ovt}</td>
            <td>${driver.def}</td>
            <td>${driver.acc}</td>
            <td>${driver.ovr}</td>
        `;
        driverRows.appendChild(row);
        
        // Add fade-in effect for each row
        setTimeout(() => {
            row.classList.add('visible');
        }, 100 * (drivers.indexOf(driver) + 1)); // Staggered effect
    });

    // Filter drivers
    filterInput.addEventListener('input', () => {
        const filterValue = filterInput.value.toLowerCase();
        driverRows.querySelectorAll('tr').forEach(row => {
            const driverName = row.cells[0].innerText.toLowerCase();
            row.style.display = driverName.includes(filterValue) ? '' : 'none';
        });
    });

    // Show modal on driver click
    function addDriverClickListeners() {
        driverRows.querySelectorAll('tr').forEach(row => {
            row.addEventListener('click', () => {
                const driverName = row.cells[0].innerText;
                const stats = Array.from(row.cells).slice(1).map(cell => cell.innerText).join(', ');
                modalDriverName.innerText = driverName;
                modalDriverStats.innerText = `Stats: ${stats}`;
                modal.style.display = 'block';
                modal.style.opacity = 1; // Fade in
            });
        });
    }

    addDriverClickListeners();

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.opacity = 0; // Fade out
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500); // Match the transition duration
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.opacity = 0; // Fade out
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500); // Match the transition duration
        }
    });
});
