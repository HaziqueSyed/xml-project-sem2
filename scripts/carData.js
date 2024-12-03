async function fetchCars() {
    const response = await fetch('https://api.openf1.org/v1/car_data');
    const cars = await response.json();
    const tbody = document.querySelector('#cars tbody');  
    
    // cars.forEach(car => {
    //     const row = document.createElement('tr');
    //     row.innerHTML = `
    //         <td>${car.name}</td>
    //         <td>${car.constructor}</td>
    //         <td>${car.year}</td>
    //         <td>${car.engine}</td>
    //         <td>${car.power}</td>
    //         <td>${car.weight}</td>
    //         <td>${car.top_speed}</td>
    //     `;
    //     tbody.appendChild(row);
    // });

    for(let i=0; i<10; i++)
    {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cars[i].name}</td>
            <td>${cars[i].constructor}</td>
            <td>${cars[i].year}</td>
            <td>${cars[i].engine}</td>
            <td>${cars[i].power}</td>
            <td>${cars[i].weight}</td>
            <td>${cars[i].top_speed}</td>
        `;
        tbody.appendChild(row);
    }
}

fetchCars();
