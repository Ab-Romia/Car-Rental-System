// routes/carRoutes.js
const express = require("express");
const router = express.Router();
const Car = require("../models/Car"); 

router.post("/add", async (req, res) => {
    const { model, year, plateID, status, officeID } = req.body;

    // Basic validation
    if (!model || !year || !plateID || !status || !officeID) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
       
        const newCar = await Car.createCar(model, year, plateID, status, officeID);

     
        return res.status(201).json(newCar);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.get("/all", async (req, res) => {
    try {
        const cars = await Car.getAllCars();
        return res.status(200).json(cars);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const car = await Car.getCarById(id);

        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }

        return res.status(200).json(car);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { model, year, plateID, status, officeID } = req.body;

    try {
        const updatedCar = await Car.updateCar(id, model, year, plateID, status, officeID);

        if (!updatedCar) {
            return res.status(404).json({ error: "Car not found or update failed" });
        }

        return res.status(200).json(updatedCar);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCar = await Car.deleteCar(id);

        if (!deletedCar) {
            return res.status(404).json({ error: "Car not found" });
        }

        return res.status(200).json({ message: "Car deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Update Car Status
router.put("/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: "Status is required" });
    }

    try {
        const updatedCar = await Car.updateCarStatus(id, status);

        if (!updatedCar) {
            return res.status(404).json({ error: "Car not found or update failed" });
        }

        return res.status(200).json(updatedCar);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
