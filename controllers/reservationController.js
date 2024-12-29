const Reservation = require("../models/Reservation");

// Create a new reservation
async function createReservation(req, res) {
    const { carID, customerID, reservationDate, pickupDate, returnDate, totalPayment } = req.body;

    if (!carID || !customerID || !reservationDate || !pickupDate || !returnDate || !totalPayment) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const reservationId = await Reservation.create(carID, customerID, reservationDate, pickupDate, returnDate, totalPayment);
        res.status(201).json({ message: "Reservation created successfully", reservationId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all reservations
async function getAllReservations(req, res) {
    try {
        const reservations = await Reservation.getAll();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a specific reservation by ID
async function getReservationById(req, res) {
    const { id } = req.params;
    try {
        const reservation = await Reservation.getById(id);
        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a reservation
async function updateReservation(req, res) {
    const { id } = req.params;
    const { carID, customerID, reservationDate, pickupDate, returnDate, totalPayment } = req.body;

    try {
        const updatedReservation = await Reservation.update(id, carID, customerID, reservationDate, pickupDate, returnDate, totalPayment);
        if (!updatedReservation) {
            return res.status(404).json({ error: "Reservation not found or no changes made" });
        }
        res.status(200).json({ message: "Reservation updated successfully", reservation: updatedReservation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a reservation
async function deleteReservation(req, res) {
    const { id } = req.params;
    try {
        const isDeleted = await Reservation.delete(id);
        if (!isDeleted) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation
};
