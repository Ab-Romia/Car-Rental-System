const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { isAuthenticated } = require('../middleware/auth');

// Route to create a new payment
router.post('/create', isAuthenticated, paymentController.createPayment);

// Route to get all payments
router.get('/all', isAuthenticated, paymentController.getAllPayments);

// Route to get a payment by ID
router.get('/:id', isAuthenticated, paymentController.getPaymentById);

// Route to update a payment
router.put('/:id', isAuthenticated, paymentController.updatePayment);

// Route to delete a payment
router.delete('/:id', isAuthenticated, paymentController.deletePayment);

module.exports = router;