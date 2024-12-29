const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Create a new reservation
router.post("/add", reservationController.createReservation);

// Get all reservations
router.get("/all", reservationController.getAllReservations);

// Get a specific reservation by ID
router.get("/:id", reservationController.getReservationById);

// Update a reservation
router.put("/:id", reservationController.updateReservation);

// Delete a reservation
router.delete("/:id", reservationController.deleteReservation);

module.exports = router;
