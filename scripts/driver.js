async function fetchData() {
    const response = await fetch('https://api.openf1.org/v1/drivers');
    const data = await response.json();
    return data; // Assuming data is an array of drivers
}

async function getData() {
    const data = await fetchData();
    const uniqueDrivers = new Map(); // Use a Map to store unique drivers by driver_number
    const driverCards = document.getElementById('driverCards');

    // Loop through the array of driver data
    data.forEach(driver => {
        // Only process drivers with valid (non-null, non-undefined) driver_number
        if (driver.driver_number && driver.first_name && driver.last_name && driver.headshot_url && driver.country_code) {
            if (!uniqueDrivers.has(driver.driver_number)) {
                uniqueDrivers.set(driver.driver_number, driver); // Store unique driver
            }
        }
    });

    // Convert Map values to an array and build driver cards
    uniqueDrivers.forEach(driver => {
        const driverCard = document.createElement('div');
        driverCard.classList.add('driver-card');
        driverCard.setAttribute('data-driver-number', driver.driver_number);

        // Ensure the driver fields are not null before displaying them
        driverCard.innerHTML = `
            <img src="${driver.headshot_url || ''}" alt="${driver.full_name || 'Driver'} headshot">
            <h3>${driver.first_name || 'Unknown'} ${driver.last_name || 'Driver'}</h3>

        `;
        
        driverCard.addEventListener('click', () => {
            // Redirect to a new page with the driver number as a query parameter
            window.location.href = `driver-details.html?driver_number=${driver.driver_number}`;
        });
        
        driverCards.appendChild(driverCard);
    });
}

// Run getData when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', getData);

// Filter functionality
const filterInput = document.getElementById('filterInput');
filterInput.addEventListener('input', () => {
    const filterValue = filterInput.value.toLowerCase();
    const driverCards = document.querySelectorAll('.driver-card');
    driverCards.forEach(card => {
        const driverFirstName = card.querySelector('h3').textContent.toLowerCase();
        const driverLastName = card.querySelector('h3').textContent.toLowerCase();
        const driverPosition = card.querySelector('p:nth-child(3)').textContent.toLowerCase();
        const driverPoints = card.querySelector('p:nth-child(4)').textContent.toLowerCase();
        
        // Check if any of the cells contain the filter value
        if (driverFirstName.includes(filterValue) || driverLastName.includes(filterValue) || driverPosition.includes(filterValue) || driverPoints.includes(filterValue)) {
            card.style.display = '';  // Show the card
        } else {
            card.style.display = 'none';  // Hide the card
        }
    });
});
