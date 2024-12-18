const express = require('express');
const router = express.Router();

// GET all cars
router.get('/', (req, res) => {
    res.send('Get all cars');
});

// GET a specific car by ID
router.get('/:id', (req, res) => {
    const carId = req.params.id;
    res.send(`Get car with ID: ${carId}`);
});

// CREATE a new car
router.post('/', (req, res) => {
    const carData = req.body;
    res.send('Car added');
});

// UPDATE car details
router.put('/:id', (req, res) => {
    const carId = req.params.id;
    const updatedData = req.body;
    res.send(`Car with ID: ${carId} updated`);
});

// DELETE a car
router.delete('/:id', (req, res) => {
    const carId = req.params.id;
    res.send(`Car with ID: ${carId} deleted`);
});

module.exports = router;