const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Render add reservation page
router.get("/add", (req, res) => {
    res.render("addReservation");
});

// Create a new reservation
router.post("/add", async (req, res) => {
    const result = await reservationController.createReservation(req, res);
    if (result.statusCode === 201) {
        res.redirect('/');
    } else {
        res.status(result.statusCode).json(result.body);
    }
});

// Render all reservations page
router.get("/all", reservationController.getAllReservations);

// Render reservation details page
router.get("/:id", reservationController.getReservationById);

// Render update reservation page
router.get("/:id/edit", (req, res) => {
    res.render("updateReservation", { reservation: req.reservation });
});

// Update a reservation
router.put("/:id", reservationController.updateReservation);

// Add POST route for updating a reservation
router.post("/update", async (req, res) => {
    const { reservationID, customerID, carID, startDate, endDate } = req.body;
    const result = await reservationController.updateReservation({ params: { id: reservationID }, body: { customerID, carID, startDate, endDate } });
    if (result.statusCode === 201) {
        res.redirect('/');
    } else {
        res.status(result.statusCode).json(result.body);
    }
});

// Render delete reservation page
router.get("/:id/delete", (req, res) => {
    res.render("deleteReservation", { reservation: req.reservation });
});

// Delete a reservation
router.delete("/:id", reservationController.deleteReservation);

// Add POST route for deleting a reservation
router.post("/delete", async (req, res) => {
    const { reservationID } = req.body;
    const result = await reservationController.deleteReservation({ params: { id: reservationID } });
    if (result.statusCode === 201) {
        res.redirect('/');
    } else {
        res.status(result.statusCode).json(result.body);
    }
});

module.exports = router;