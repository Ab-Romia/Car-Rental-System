// routes/carRoutes.js
const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

// Render add car page
router.get("/add", (req, res) => {
    res.render("addCar");
});

// Add a new car
router.post("/add", async (req, res) => {
    const result = await carController.addCar(req, res);
    if (result.statusCode === 201) {
        res.redirect('/');
    } else {
        res.status(result.statusCode).json(result.body);
    }
});

// Render all cars page
router.get("/all", carController.getAllCars);

// Render car details page
router.get("/:id", carController.getCarById);

// Render update car page
router.get("/:id/edit", (req, res) => {
    res.render("updateCar", { car: req.car });
});

// Update a car
router.put("/:id", carController.updateCar);

// Add POST route for updating a car
router.post("/update", async (req, res) => {
    const { carID, model, year, plateID, status, officeID } = req.body;
    const result = await carController.updateCar({ params: { id: carID }, body: { model, year, plateID, status, officeID } });
    if (result.statusCode === 201) {
        res.redirect('/');
    } else {
        res.status(result.statusCode).json(result.body);
    }
});

// Render update car status page
router.get("/:id/status", (req, res) => {
    res.render("updateCarStatus", { car: req.car });
});

// Update car status
router.put("/:id/status", carController.updateCarStatus);

// Add POST route for updating car status
router.post("/updateStatus", async (req, res) => {
    const { carID, status } = req.body;
    const result = await carController.updateCarStatus({ params: { id: carID }, body: { status } });
    if (result.statusCode === 201) {
        res.redirect('/');
    } else {
        res.status(result.statusCode).json(result.body);
    }
});

// Render delete car page
router.get("/:id/delete", (req, res) => {
    res.render("deleteCar", { car: req.car });
});

// Delete a car
router.delete("/:id", carController.deleteCar);

// Add POST route for deleting a car
router.post("/delete", async (req, res) => {
    const { carID } = req.body;
    const result = await carController.deleteCar({ params: { id: carID } });
    if (result.statusCode === 201) {
        res.redirect('/');
    } else {
        res.status(result.statusCode).json(result.body);
    }
});

module.exports = router;