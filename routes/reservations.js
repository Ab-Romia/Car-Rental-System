const express = require('express');
const router = express.Router();

// GET all reservations
router.get('/', (req, res) => {
    res.send('Get all reservations');
});

// GET a specific reservation by ID
router.get('/:id', (req, res) => {
    const reservationId = req.params.id;
    res.send(`Get reservation with ID: ${reservationId}`);
});

// CREATE a new reservation (link car and customer)
router.post('/', (req, res) => {
    const reservationData = req.body;
    res.send('Reservation added');
});

// UPDATE reservation details
router.put('/:id', (req, res) => {
    const reservationId = req.params.id;
    const updatedData = req.body;
    res.send(`Reservation with ID: ${reservationId} updated`);
});

// DELETE a reservation
router.delete('/:id', (req, res) => {
    const reservationId = req.params.id;
    res.send(`Reservation with ID: ${reservationId} deleted`);
});

module.exports = router;