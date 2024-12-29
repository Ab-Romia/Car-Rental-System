const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Route for getting reservations within a specified period
router.get('/res', reportController.getReservationsWithinPeriod);

// Route for getting reservations by car within a specified period
router.get('/res/by-car', reportController.getReservationsByCar);

// Route for getting the status of all cars on a specific day
router.get('/res/car-status-day', reportController.getCarStatusOnSpecificDay);

// Route for getting all reservations of a specific customer
router.get('/res/by-customer', reportController.getCustomerReservations);

// Route for getting daily payments within a specific period
router.get('/payments/daily', reportController.getDailyPayments);

module.exports = router;