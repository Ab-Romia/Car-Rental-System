// controllers/carController.js
const Car = require("../models/Car");
// Add a new car
async function addCar(req, res) {
    const { model, year, plateID, status, officeID } = req.body;

    if (!model || !year || !plateID || !status || !officeID) {
        return { statusCode: 400, body: { error: "All fields are required." } };
    }

    try {
        const newCarId = await Car.create(model, year, plateID, status, parseInt(officeID, 10));
        return { statusCode: 201, body: { message: "Car added successfully.", carId: newCarId } };
    } catch (err) {
        return { statusCode: 500, body: { error: err.message } };
    }
}

// Get all cars
async function getAllCars(req, res) {
    try {
        const cars = await Car.getAll();
        res.render("allCars", { cars });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// Get car by ID
async function getCarById(req, res) {
    const { id } = req.params;

    try {
        const cars = await Car.getById(id);
        if (!cars) {
            return res.status(404).json({ error: "car not found" });
        }
        res.render("allCars", { cars });
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
        const result = await Car.update(id, model, year, plateID, status, officeID);
        if (result) {
            return { statusCode: 200, body: { message: "Car updated successfully." } };
        } else {
            return { statusCode: 404, body: { error: "Car not found." } };
        }
    } catch (err) {
        return { statusCode: 500, body: { error: err.message } };
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
            return { statusCode: 200, body: { message: "Car status updated successfully." } };
        } else {
            return { statusCode: 404, body: { message: "Car not found" } };
        }
    } catch (err) {
        return { statusCode: 500, body: { error: err.message } };
    }
}

// Delete car
async function deleteCar(req, res) {
    const { id } = req.params;

    try {
        const result = await Car.delete(id);
        if (result) {
            return { statusCode: 200, body: { message: "Car deleted successfully." } };
        } else {
            return { statusCode: 404, body: { error: "Car not found." } };
        }
    } catch (err) {
        return { statusCode: 500, body: { error: err.message } };
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