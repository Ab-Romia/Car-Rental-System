// controllers/carController.js
const Car = require("../models/Car");

// Add new car
async function addCar(req, res) {
    const { model, year, plateID, status, officeID } = req.body;
    try {
        const newCarId = await Car.createCar(model, year, plateID, status, officeID);
        res.status(201).json({ message: 'Car added successfully', carId: newCarId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get all cars
async function getAllCars(req, res) {
    try {
        const cars = await Car.getAllCars();
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get car by ID
async function getCarById(req, res) {
    const { id } = req.params;
    try {
        const car = await Car.getCarById(id);
        if (car) {
            res.status(200).json(car);
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Update car
async function updateCar(req, res) {
    const { id } = req.params;
    const { model, year, plateID, status, officeID } = req.body;
    try {
        const updatedCar = await Car.updateCar(id, model, year, plateID, status, officeID);
        if (updatedCar) {
            res.status(200).json({ message: 'Car updated successfully', car: updatedCar });
        } else {
            res.status(404).json({ message: 'Car not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Delete car
async function deleteCar(req, res) {
    const { id } = req.params;
    try {
        const result = await Car.deleteCar(id);
        if (result) {
            res.status(200).json({ message: 'Car deleted successfully' });
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    addCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
};
