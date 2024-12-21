// public/scripts.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Car Rental System UI loaded');
});

// public/scripts.js
// public/scripts.js

// Function to get all cars
async function getAllCars() {
    const response = await fetch('/api/cars');
    const cars = await response.json();
    document.getElementById('all-cars').innerText = JSON.stringify(cars, null, 2);
}

// Function to get a car by ID
async function getCarById() {
    const carId = document.getElementById('car-id').value;
    const response = await fetch(`/api/cars/${carId}`);
    const car = await response.json();
    document.getElementById('car-details').innerText = JSON.stringify(car, null, 2);
}

// Function to add a new car
async function addCar() {
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const plateId = document.getElementById('plate-id').value;
    const status = document.getElementById('status').value;
    const officeLocation = document.getElementById('office-location').value;

    const response = await fetch('/api/cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ model, year, plate_id: plateId, status, office_location: officeLocation })
    });

    if (response.ok) {
        alert('Car added successfully');
    } else {
        alert('Error adding car');
    }
}

// Function to delete a car
async function deleteCar() {
    const carId = document.getElementById('delete-car-id').value;

    const response = await fetch(`/api/cars/${carId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Car deleted successfully');
    } else {
        alert('Error deleting car');
    }
}