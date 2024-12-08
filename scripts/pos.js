document.addEventListener('DOMContentLoaded', function () {
    ConstructorCurrentStandings();
    DriverCurrentStandings();

    /* ******************************** Tab Switching ************************************* */
    // JavaScript to handle tab switching
    document.getElementById('driverTab').addEventListener('click', function () {
        document.getElementById('driverTab').classList.add('active');
        document.getElementById('constructorTab').classList.remove('active');
        document.getElementById('driverStandingContent').classList.add('active');
        document.getElementById('constructorStandingContent').classList.remove('active');
    });

    document.getElementById('constructorTab').addEventListener('click', function () {
        document.getElementById('constructorTab').classList.add('active');
        document.getElementById('driverTab').classList.remove('active');
        document.getElementById('constructorStandingContent').classList.add('active');
        document.getElementById('driverStandingContent').classList.remove('active');
    });
});

/* ****************************************** Driver Standing using AJAX Method ************************************ */
async function DriverCurrentStandings(season = "current") {
    const contentDiv = document.getElementById('driverStandingContent');
    contentDiv.innerHTML = '<p>Loading...</p>'; // To disply loading message

    try {

        // Fetching data from URL
        const response = await fetch(`https://ergast.com/api/f1/${season}/driverStandings.json`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        // Using await - to convert Promise response into JSON
        const data = await response.json();

        const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        let tableHtml = `
                <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Driver Code</th>
                        <th>Total Points</th>
                    </tr>
                </thead>
                <tbody>
                `;

        standings.forEach(driver => {
            // console.log(driver);
            tableHtml += `
                    <tr data-driver-code="${driver.Driver.code}" 
                        data-driver-name="${driver.Driver.givenName} ${driver.Driver.familyName}">
                        <td>${driver.position}</td>
                        <td>${driver.Driver.givenName} ${driver.Driver.familyName}</td>
                        <td>${driver.Constructors[0].name}</td>
                        <td>${driver.Driver.code}</td>
                        <td>${driver.points}</td>
                    </tr>
                    `;
        });

        tableHtml += `</tbody></table>`;
        contentDiv.innerHTML = tableHtml; // To update content

        // Add click event listener to each row
        const rows = contentDiv.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('click', () => {
                const driverCode = row.dataset.driverCode; // Access the data-driver-code
                const driverName = encodeURIComponent(row.dataset.driverName); // URL encode driver name for safety
                const driverNumber = row.querySelector('td:first-child').textContent; // Assuming position is the driver number
                console.log(driverCode, driverName, driverNumber);
                window.location.href = `driver-details.html?name_acronym=${driverCode}`;
            });
        });
    } catch (error) {
        contentDiv.innerHTML = `<p>Error loading data: ${error.message}</p>`;
    }
}

/* ************************************** Constructor Standing using AJAX Method ********************************** */
async function ConstructorCurrentStandings(season = "current") {
    const contentDiv = document.getElementById('constructorStandingContent');
    contentDiv.innerHTML = '<p>Loading...</p>'; // To disply loading message

    try {

        // Fetching data from URL
        const response = await fetch(`https://ergast.com/api/f1/${season}/constructorStandings.json`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        // Using await - to convert Promise response into JSON
        const data = await response.json();

        const standings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        let tableHtml = `
            <table>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Constructor</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

        standings.forEach(constructor => {
            tableHtml += `
                <tr>
                        <td>${constructor.position}</td>
                        <td>${constructor.Constructor.name}</td>
                        <td>${constructor.points}</td>
                    </tr>
                `;
        });

        tableHtml += `</tbody></table>`;
        contentDiv.innerHTML = tableHtml; //  To update content
    } catch (error) {
        contentDiv.innerHTML = `<p>Error loading data: ${error.message}</p>`;
    }
}

/****************************************** Load the season to the navigation bar *********************************** */
function loadSeasonData(season, element) {

    // Remove the 'active-season' class from all season links
    const seasonLinks = document.querySelectorAll('.season-link');
    seasonLinks.forEach(link => link.classList.remove('active-season'));

    // Adding 'active-season' class to the clicked season link
    element.classList.add('active-season');

    element.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'nearest',  // Ensure it aligns vertically in case of a long list
        inline: 'center'   // Center the clicked link horizontally in the navigation bar
    });

    DriverCurrentStandings(season); // Fetching driver standings for selected season
    ConstructorCurrentStandings(season); // Fetching constructor standings for selected season
}

/* ************************************ season list *********************************************** */
document.addEventListener("DOMContentLoaded", () => {
    const seasonList = document.getElementById("seasonList");
    const currentYear = new Date().getFullYear();

    // Generate season links dynamically
    for (let year = currentYear; year >= 1950; year--) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = "javascript:void(0);";
        link.textContent = `${year} Season`;
        link.className = "season-link";
        link.onclick = () => loadSeasonData(year, link);

        listItem.appendChild(link);
        seasonList.appendChild(listItem);
    }
});
