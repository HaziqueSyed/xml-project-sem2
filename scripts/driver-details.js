async function fetchDriverDetails(driverNumber, sessionKey) {
    const response = await fetch(`https://api.openf1.org/v1/drivers?driver_number=${driverNumber}&session_key=${sessionKey}`);
    const data = await response.json();
    return data[0]; // Since the API returns an array, we take the first driver in the list
}

async function getDriverDetails() {
    // Get the driver number and session key from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const driverNumber = urlParams.get('driver_number');
    const sessionKey = 9158;

    if (!driverNumber || !sessionKey) {
        document.getElementById('driverInfo').innerHTML = 'Driver details not found.';
        return;
    }
    
    // Fetch driver details using the driver number and session key
    const driver = await fetchDriverDetails(driverNumber, sessionKey);

    if (!driver) {
        document.getElementById('driverInfo').innerHTML = 'Driver details not available.';
        return;
    }

    // Populate driver details on the page
    const driverInfoContainer = document.getElementById('driverInfo');
    
    driverInfoContainer.innerHTML = `
        <div class="driver-detail-card">
            <img src="${driver.headshot_url || ''}" alt="${driver.first_name} ${driver.last_name}'s headshot">
            <h3>${driver.first_name} ${driver.last_name}</h3>
            <p><strong>Full Name:</strong> ${driver.full_name}</p>
            <p><strong>Driver Number:</strong> ${driver.driver_number}</p>
            <p><strong>Country Code:</strong> ${driver.country_code}</p>
            <p><strong>Team:</strong> ${driver.team_name || 'N/A'}</p>
            <p><strong>Team Colour:</strong> 
            <span style="background-color:${driver.team_colour ? '#' + driver.team_colour : '#ccc'}; padding: 5px 10px; color: white;">
              ${driver.team_name || 'N/A'}
            </span>
          </p>            <p><strong>Broadcast Name:</strong> ${driver.broadcast_name}</p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', getDriverDetails);
