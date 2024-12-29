// controllers/carController.js
const Car = require("../models/Car");
// Add a new car
async function addCar(req, res) {
    const { model, year, plateID, status, officeID } = req.body;

    if (!model || !year || !plateID || !status || !officeID) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const newCarId = await Car.create(model, year, plateID, status, officeID);
        return res.status(201).json({ message: "Car added successfully.", carId: newCarId });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// Get all cars
async function getAllCars(req, res) {
    try {
        const cars = await Car.getAll();
        return res.status(200).json(cars);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// Get car by ID
async function getCarById(req, res) {
    const { id } = req.params;

    try {
        const car = await Car.getById(id);
        if (car) {
            return res.status(200).json(car);
        } else {
            return res.status(404).json({ error: "Car not found." });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// Update car details
async function updateCar(req, res) {
    const { id } = req.params;
    const { model, year, plateID, status, officeID } = req.body;

    if (!model || !year || !plateID || !status || !officeID) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const updatedCar = await Car.update(id, model, year, plateID, status, officeID);
        if (updatedCar) {
            return res.status(200).json({ message: "Car updated successfully.", car: updatedCar });
        } else {
            return res.status(404).json({ error: "Car not found or update failed." });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// Update car status
async function updateCarStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: "Status is required." });
    }

    try {
        const updatedCar = await Car.updateStatus(id, status);
        if (updatedCar) {
            return res.status(200).json({ message: "Car status updated successfully.", car: updatedCar });
        } else {
            return res.status(404).json({ error: "Car not found or update failed." });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// Delete car
async function deleteCar(req, res) {
    const { id } = req.params;

    try {
        const result = await Car.delete(id);
        if (result) {
            return res.status(200).json({ message: "Car deleted successfully." });
        } else {
            return res.status(404).json({ error: "Car not found." });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    addCar,
    getAllCars,
    getCarById,
    updateCar,
    updateCarStatus,
    deleteCar,
};