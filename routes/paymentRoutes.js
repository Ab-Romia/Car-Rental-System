const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to create a new payment
router.post('/create', paymentController.createPayment);

// Route to get all payments
router.get('/all', paymentController.getAllPayments);

// Route to get a payment by ID
router.get('/:id', paymentController.getPaymentById);

// Route to update a payment
router.put('/:id', paymentController.updatePayment);

// Route to delete a payment
router.delete('/:id', paymentController.deletePayment);

module.exports = router;