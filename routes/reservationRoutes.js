const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { isAuthenticated } = require("../middleware/auth");

// Render add reservation page
router.get("/add", isAuthenticated, (req, res) => {
    res.render("addReservation");
});

// Create a new reservation
router.post("/add", isAuthenticated, async (req, res) => {
    const result = await reservationController.createReservation(req, res);
    if (result.statusCode === 201) {
        res.redirect('/');
    } else {
        res.status(result.statusCode).json(result.body);
    }
});

// Render all reservations page
router.get("/all", isAuthenticated, reservationController.getAllReservations);

// Render reservation details page
router.get("/:id", isAuthenticated, reservationController.getReservationById);

// Render update reservation page
router.get("/:id/edit", isAuthenticated, (req, res) => {
    res.render("updateReservation", { reservation: req.reservation });
});

// Update a reservation
router.put("/:id", isAuthenticated, reservationController.updateReservation);

// Add POST route for updating a reservation
router.post("/update", isAuthenticated, async (req, res) => {
    const { reservationID, customerID, carID, startDate, endDate } = req.body;
    const result = await reservationController.updateReservation({ params: { id: reservationID }, body: { customerID, carID, startDate, endDate } });
    if (result.statusCode === 200) {
        res.redirect('/');
    } else {
        res.status(result.statusCode).json(result.body);
    }
});

// Render delete reservation page
router.get("/:id/delete", isAuthenticated, (req, res) => {
    res.render("deleteReservation", { reservation: req.reservation });
});

// Delete a reservation
router.delete("/:id", isAuthenticated, reservationController.deleteReservation);

// Add POST route for deleting a reservation
router.post("/delete", isAuthenticated, async (req, res) => {
    const { reservationID } = req.body;
    const result = await reservationController.deleteReservation({ params: { id: reservationID } });
    if (result.statusCode === 200) {
        res.redirect('/');
    } else {
        res.status(result.statusCode).json(result.body);
    }
});

module.exports = router;