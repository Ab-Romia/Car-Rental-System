// routes/index.js
const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");
const carController = require("../controllers/carController");
const reservationController = require("../controllers/reservationController");

router.post("/register", customerController.register);
router.post("/login", customerController.login);
router.get("/logout", customerController.logout);

router.post("/cars", carController.addCar);
router.get("/cars", carController.getAllCars);
router.get("/cars/:id", carController.getCarById);
router.put("/cars/:id", carController.updateCar);
router.delete("/cars/:id", carController.deleteCar);

router.post("/reservations", reservationController.createReservation);
router.get("/reservations", reservationController.getAllReservations);
router.get("/reservations/:id", reservationController.getReservationById);
router.put("/reservations/:id", reservationController.updateReservation);
router.delete("/reservations/:id", reservationController.deleteReservation);

module.exports = router;
