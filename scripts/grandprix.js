async function fetchRaceData(year) {
    try {
        // Show loading message while fetching
        const raceContainer = document.getElementById('race-container');
        raceContainer.innerHTML = '<p>Loading race data...</p>';

        const response = await fetch(`https://ergast.com/api/f1/${year}.json`);
        const jsonData = await response.json();
        
        // Clear previous content
        raceContainer.innerHTML = ''; 

        const races = jsonData.MRData.RaceTable.Races;

        // Check if there are races for the selected year
        if (races.length === 0) {
            raceContainer.innerHTML = '<p>No races available for this year.</p>';
            return;
        }

        // Render each race in the container
        races.forEach(race => {
            const raceDiv = document.createElement('div');
            raceDiv.className = 'race';

            // Construct HTML for each race
            raceDiv.innerHTML = `
                <h2>${race.raceName} <a href="${race.url}" target="_blank">(More Info)</a></h2>
                <p class="circuit">Circuit: <a href="${race.Circuit.url}" target="_blank">${race.Circuit.circuitName}</a></p>
                <p class="date-time">Date: ${new Date(race.date + 'T' + race.time).toLocaleString()}</p>
                <p>Location: ${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</p>
            `;

            raceContainer.appendChild(raceDiv);
        });
    } catch (error) {
        // Handle errors
        console.error('Error fetching race data:', error);
        document.getElementById('race-container').innerHTML = '<p>Failed to load race data. Please try again later.</p>';
    }
}

// Fetch data for the default selected year (2024)
fetchRaceData('2024');

// Add event listener for the year select and button
document.getElementById('fetch-button').addEventListener('click', () => {
    const selectedYear = document.getElementById('year-select').value;
    fetchRaceData(selectedYear);
});
