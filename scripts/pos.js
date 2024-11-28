document.addEventListener('DOMContentLoaded', function () {
    ConstructorCurrentStandings();
    DriverCurrentStandings();

    /* ******************************** Tab Switching ************************************* */
    // JavaScript to handle tab switching
    document.getElementById('driverTab').addEventListener('click', function() {
        document.getElementById('driverTab').classList.add('active');
        document.getElementById('constructorTab').classList.remove('active');
        document.getElementById('driverStandingContent').classList.add('active');
        document.getElementById('constructorStandingContent').classList.remove('active');
    });
    
    document.getElementById('constructorTab').addEventListener('click', function() {
        document.getElementById('constructorTab').classList.add('active');
        document.getElementById('driverTab').classList.remove('active');
        document.getElementById('constructorStandingContent').classList.add('active');
        document.getElementById('driverStandingContent').classList.remove('active');
    });

    /* ********************************** Search Function *************************************** */
// Function to filter positions based on input
    document.getElementById('positionFilterInput').addEventListener('input', function() {
        
        const filterValue = this.value.toLowerCase(); // Get the input value and convert to lowercase
        const tableBody = document.getElementById('tableBody'); // Get the table body
        const rows = tableBody.getElementsByTagName('tr'); // Get all rows in the table body

        // Loop through all rows and filter based on the input
        Array.from(rows).forEach(function(row) {
            const cells = row.getElementsByTagName('td'); // Get all cells in the row
            let rowText = ''; // Variable to hold the text content of the row
            
            // Loop through each cell in the row and append its text to rowText
            Array.from(cells).forEach(function(cell) {
                rowText += cell.textContent.toLowerCase() + ' '; // Concatenate the cell's text
            });

            // If any part of the rowText matches the filterValue, show the row; otherwise, hide it
            if (rowText.includes(filterValue)) {
                row.style.display = ''; // Show row
            } else {
                row.style.display = 'none'; // Hide row
            }
        });
    });


    document.getElementById('constructorFilterInput').addEventListener('input', function() {
        const filterValue = this.value.toLowerCase(); // Get the input value and convert to lowercase
        const tableBody = document.getElementById('constructorTableBody'); // Get the table body
        const rows = tableBody.getElementsByTagName('tr'); // Get all rows in the table body

        // Loop through all rows and filter based on the input
        Array.from(rows).forEach(function(row) {
            const cells = row.getElementsByTagName('td'); // Get all cells in the row
            let rowText = ''; // Variable to hold the text content of the row
            
            // Loop through each cell in the row and append its text to rowText
            Array.from(cells).forEach(function(cell) {
                rowText += cell.textContent.toLowerCase() + ' '; // Concatenate the cell's text
            });

            // If any part of the rowText matches the filterValue, show the row; otherwise, hide it
            if (rowText.includes(filterValue)) {
                row.style.display = ''; // Show row
            } else {
                row.style.display = 'none'; // Hide row
            }
        });
    });
});

/* ************************************************** Driver Standing ******************************************* */
async function  DriverCurrentStandings(season = "current") {
    const tbody = document.querySelector("#tableBody");
    try {

        tbody.innerHTML = '';
        const response = await fetch(`https://ergast.com/api/f1/${season}/driverStandings.json`); //https://ergast.com/api/f1/current/driverStandings

        // const res = await fetch("https://ergast.com/mrd/feed/"); //https://ergast.com/mrd/feed/
        // console.log(res.text());
        if(!response.ok) {
            throw new Error(`Network Error: ${response.status}`);
        }

        const xmlDoc = await response.json();
        // console.log(xmlDoc);

        const standings = xmlDoc.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        console.log(standings);

        standings.forEach(standing => {
            const driver = standing.Driver.givenName + " " + standing.Driver.familyName;
                const pos = standing.position;
                const team = standing.Constructors[0].name;
                const pts = standing.points;
                const code = standing.Driver.code;
                // console.log(`Driver: ${driver}, Pos: ${pos}, Team: ${team}, Points: ${pts}`);

                const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${pos}</td>
                        <td>${driver}</td>
                        <td>${team}</td>
                        <td>${code}</td>
                        <td>${pts}</td>
                    `;
                    tbody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
    }
}

/* ************************************************** Constructor Standing ******************************************* */
async function  ConstructorCurrentStandings(season = "current") {
    const tbody = document.querySelector("#constructorTableBody");
    try {

        tbody.innerHTML = '';
        const response = await fetch(`https://ergast.com/api/f1/${season}/constructorStandings.json`); // https://ergast.com/api/f1/2008/constructorStandings

        // const res = await fetch("https://ergast.com/mrd/feed/"); //https://ergast.com/mrd/feed/
        // console.log(res.text());
        if(!response.ok) {
            throw new Error(`Network Error: ${response.status}`);
        }

        const xmlDoc = await response.json();
        console.log(xmlDoc);

        const standings = xmlDoc.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        console.log(standings);

        standings.forEach(standing => {
            const constructor = standing.Constructor.name;
                const pos = standing.position;
                // const team = standing.Constructors[0].name;
                const pts = standing.points;
                const nation = standing.Constructor.nationality;
                // console.log(`Driver: ${driver}, Pos: ${pos}, Team: ${team}, Points: ${pts}`);

                const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${pos}</td>
                        <td>${constructor}</td>
                        <td>${pts}</td>
                    `;
                    // <td>${team}</td>
                    // <td>${nation}</td>
                    tbody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
    }
}

function loadSeasonData(season, element) {
    // Remove the 'active-season' class from all season links
    const seasonLinks = document.querySelectorAll('.season-link');
    seasonLinks.forEach(link => {
        link.classList.remove('active-season');
    });

    // Add the 'active-season' class to the clicked season link
    element.classList.add('active-season');

    // Load the driver and constructor standings for the selected season
    DriverCurrentStandings(season); // Fetch driver standings for selected season
    ConstructorCurrentStandings(season); // Fetch constructor standings for selected season
}