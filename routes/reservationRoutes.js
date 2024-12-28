// reservationRoutes.js
const express = require('express');
const router = express.Router();
const Reservation = require('../models');

// Create a new reservation
router.post('/add', async (req, res) => {
    const { carID, customerID, reservationDate, pickupDate, returnDate, totalPayment } = req.body;

   
    if (!carID || !customerID || !reservationDate || !pickupDate || !returnDate || !totalPayment) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newReservation = await Reservation.createReservation(carID, customerID, reservationDate, pickupDate, returnDate, totalPayment);
        return res.status(201).json(newReservation);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Get all reservations
router.get('/all', async (req, res) => {
    try {
        const reservations = await Reservation.getAllReservations();
        return res.status(200).json(reservations);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Get a specific reservation by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const reservation = await Reservation.getReservationById(id);

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        return res.status(200).json(reservation);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Update a reservation
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { carID, customerID, reservationDate, pickupDate, returnDate, totalPayment } = req.body;

    try {
        const updatedReservation = await Reservation.updateReservation(id, carID, customerID, reservationDate, pickupDate, returnDate, totalPayment);

        if (!updatedReservation) {
            return res.status(404).json({ error: 'Reservation not found or update failed' });
        }

        return res.status(200).json(updatedReservation);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Delete a reservation
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedReservation = await Reservation.deleteReservation(id);

        if (!deletedReservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        return res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Search reservations
router.get('/search', async (req, res) => {
    const { carID, customerID, reservationDateFrom, reservationDateTo, pickupDateFrom, pickupDateTo } = req.query;

    const searchConditions = {};
    if (carID) searchConditions.carID = carID;
    if (customerID) searchConditions.customerID = customerID;
    if (reservationDateFrom || reservationDateTo) {
        searchConditions.reservationDate = {};
        if (reservationDateFrom) searchConditions.reservationDate.$gte = new Date(reservationDateFrom);
        if (reservationDateTo) searchConditions.reservationDate.$lte = new Date(reservationDateTo);
    }
    if (pickupDateFrom || pickupDateTo) {
        searchConditions.pickupDate = {};
        if (pickupDateFrom) searchConditions.pickupDate.$gte = new Date(pickupDateFrom);
        if (pickupDateTo) searchConditions.pickupDate.$lte = new Date(pickupDateTo);
    }

    try {
        const reservations = await Reservation.searchReservations(searchConditions);
        return res.status(200).json(reservations);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
