const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'car_rental_system'
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the car_rental_system database');
});

// GET all payments
router.get('/', (req, res) => {
    db.query('SELECT * FROM Payment', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving payments');
            return;
        }
        res.json(results);
    });
});

// GET a specific payment by ID
router.get('/:id', (req, res) => {
    const paymentId = req.params.id;
    db.query('SELECT * FROM Payment WHERE id = ?', [paymentId], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving payment');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Payment not found');
            return;
        }
        res.json(results[0]);
    });
});

// CREATE a new payment
router.post('/', (req, res) => {
    const { reservation_id, payment_date, amount, payment_method } = req.body;
    db.query('INSERT INTO Payment (ReservationID, PaymentDate, Amount, PaymentMethod) VALUES (?, ?, ?, ?)',
        [reservation_id, payment_date, amount, payment_method], (err, results) => {
            if (err) {
                res.status(500).send('Error adding payment');
                return;
            }
            res.status(201).send('Payment added');
        });
});

// UPDATE payment details
router.put('/:id', (req, res) => {
    const paymentId = req.params.id;
    const { reservation_id, payment_date, amount, payment_method } = req.body;
    db.query('UPDATE Payment SET ReservationID = ?, PaymentDate = ?, Amount = ?, PaymentMethod = ? WHERE id = ?',
        [reservation_id, payment_date, amount, payment_method, paymentId], (err, results) => {
            if (err) {
                res.status(500).send('Error updating payment');
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send('Payment not found');
                return;
            }
            res.send('Payment updated');
        });
});

// DELETE a payment
router.delete('/:id', (req, res) => {
    const paymentId = req.params.id;
    db.query('DELETE FROM Payment WHERE id = ?', [paymentId], (err, results) => {
        if (err) {
            res.status(500).send('Error deleting payment');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Payment not found');
            return;
        }
        res.send('Payment deleted');
    });
});

module.exports = router;