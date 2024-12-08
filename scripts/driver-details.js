async function fetchDriverDetails(driverNumber, sessionKey) {
    try {
        const response = await fetch(`https://api.openf1.org/v1/drivers?driver_number=${driverNumber}&session_key=${sessionKey}`);
        
        if (!response.ok) {
            throw new Error(`Error fetching driver details: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data || !data[0]) {
            throw new Error('No driver data found');
        }

        return data[0]; // Return the first driver
    } catch (error) {
        console.error('Fetch driver details failed', error);
        return null; // Return null on failure
    }
}

async function getDriverDetails() {
    // Show loading message while fetching data
    const driverInfoContainer = document.getElementById('driverInfo');
    driverInfoContainer.innerHTML = '<p>Loading driver details...</p>';

    // Get the driver number and session key from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const driverNumber = urlParams.get('driver_number');
    const sessionKey = 9158;

    if (!driverNumber || !sessionKey) {
        driverInfoContainer.innerHTML = 'Driver details not found.';
        return;
    }
    
    // Fetch driver details using the driver number and session key
    const driver = await fetchDriverDetails(driverNumber, sessionKey);

    if (!driver) {
        driverInfoContainer.innerHTML = 'Driver details not available.';
        return;
    }

    // Populate driver details on the page
    driverInfoContainer.innerHTML = `
        <div class="driver-detail-card">
            <img src="${driver.headshot_url || 'default-avatar.png'}" alt="${driver.first_name} ${driver.last_name}'s headshot">
            <h3>${driver.first_name} ${driver.last_name}</h3>
            <p><strong>Full Name:</strong> ${driver.full_name || 'N/A'}</p>
            <p><strong>Driver Number:</strong> ${driver.driver_number}</p>
            <p><strong>Country Code:</strong> ${driver.country_code || 'N/A'}</p>
            <p><strong>Team:</strong> ${driver.team_name || 'N/A'}</p>
            <p><strong>Team Colour:</strong> 
                <span style="background-color:${driver.team_colour ? '#' + driver.team_colour : '#ccc'}; padding: 5px 10px; color: white;">
                    ${driver.team_name || 'N/A'}
                </span>
            </p>            
            <p><strong>Broadcast Name:</strong> ${driver.broadcast_name || 'N/A'}</p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', getDriverDetails);
