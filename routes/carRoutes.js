const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

// Add a new car
router.post("/add", carController.addCar);

// Get all cars
router.get("/all", carController.getAllCars);

// Get a car by ID
router.get("/:id", carController.getCarById);

// Update a car
router.put("/:id", carController.updateCar);

// Update car status
router.put("/:id/status", carController.updateCarStatus);

// Delete a car
router.delete("/:id", carController.deleteCar);

module.exports = router;
