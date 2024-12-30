const Reservation = require("../models/Reservation");

// Create a new reservation
async function createReservation(req, res) {
    const { carID, customerID, reservationDate, pickupDate, returnDate, totalPayment } = req.body;

    if (!carID || !customerID || !reservationDate || !pickupDate || !returnDate || !totalPayment) {
        return { statusCode: 400, body: { error: "All fields are required." } };
    }

    try {
        const reservationId = await Reservation.create(carID, customerID, reservationDate, pickupDate, returnDate, totalPayment);
        return { statusCode: 201, body: { message: "res added successfully.", carId: reservationId } };
    } catch (err) {
        return { statusCode: 500, body: { error: err.message } };
    }
}

// Get all reservations
async function getAllReservations(req, res) {
    try {
        const reservations = await Reservation.getAll();
        res.render("allRes", { reservations });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a specific reservation by ID
async function getReservationById(req, res) {
    const { id } = req.params;
    try {
        const reservations = await Reservation.getById(id);
        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        res.render("allRes", { reservations });
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
        if (updatedReservation) {
            return { statusCode: 200, body: { message: "reservation updated successfully." } };
        } else {
            return { statusCode: 404, body: { error: "reservation not found." } };
        }
    } catch (err) {
        return { statusCode: 500, body: { error: err.message } };
    }
}

// Delete a reservation
async function deleteReservation(req, res) {
    const { id } = req.params;
    try {
        const isDeleted = await Reservation.delete(id);
        if (isDeleted) {
            return { statusCode: 200, body: { message: "resr deleted successfully." } };
        } else {
            return { statusCode: 404, body: { error: "resr not found." } };
        }
    } catch (err) {
        return { statusCode: 500, body: { error: err.message } };
    }
}

module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation
};
