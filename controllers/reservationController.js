// controllers/reservationController.js
const Reservation = require("../models/Reservation");

// Create new reservation
async function createReservation(req, res) {
    const { carID, customerID, reservationDate, pickupDate, returnDate, totalPayment } = req.body;

    if (!carID || !customerID || !reservationDate || !pickupDate || !returnDate || !totalPayment) {
        return res.status(403).json({ error: "All fields are required" });
    }

    try {
        const newReservationId = await Reservation.createReservation(carID, customerID, reservationDate, pickupDate, returnDate, totalPayment);
        res.status(201).json({ message: "Reservation created successfully", reservationId: newReservationId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get all reservations
async function getAllReservations(req, res) {
    try {
        const reservations = await Reservation.getAllReservations();
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get reservation by ID
async function getReservationById(req, res) {
    const { id } = req.params;
    try {
        const reservation = await Reservation.getReservationById(id);
        if (reservation) {
            res.status(200).json(reservation);
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Update reservation
async function updateReservation(req, res) {
    const { id } = req.params;
    const { carID, customerID, reservationDate, pickupDate, returnDate, totalPayment } = req.body;

    try {
        const updatedReservation = await Reservation.updateReservation(id, carID, customerID, reservationDate, pickupDate, returnDate, totalPayment);
        if (updatedReservation) {
            res.status(200).json({ message: "Reservation updated successfully", reservation: updatedReservation });
        } else {
            res.status(404).json({ message: "Reservation not found or no changes made" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Delete reservation
async function deleteReservation(req, res) {
    const { id } = req.params;
    try {
        const result = await Reservation.deleteReservation(id);
        if (result) {
            res.status(200).json({ message: "Reservation deleted successfully" });
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation
};
