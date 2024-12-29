const Payment = require('../models/Payment');

const paymentController = {
    createPayment: async (req, res) => {
        const { reservationID, paymentDate, amount, paymentMethod } = req.body;
        try {
            const paymentID = await Payment.create(reservationID, paymentDate, amount, paymentMethod);
            res.status(201).json({ paymentID });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllPayments: async (req, res) => {
        try {
            const payments = await Payment.getAll();
            res.json(payments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getPaymentById: async (req, res) => {
        const { id } = req.params;
        try {
            const payment = await Payment.getById(id);
            if (payment) {
                res.json(payment);
            } else {
                res.status(404).json({ message: 'Payment not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updatePayment: async (req, res) => {
        const { id } = req.params;
        const { reservationID, paymentDate, amount, paymentMethod } = req.body;
        try {
            await Payment.update(id, reservationID, paymentDate, amount, paymentMethod);
            res.status(200).json({ message: 'Payment updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deletePayment: async (req, res) => {
        const { id } = req.params;
        try {
            await Payment.delete(id);
            res.status(200).json({ message: 'Payment deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = paymentController;