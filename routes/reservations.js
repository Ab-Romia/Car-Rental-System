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

// GET all reservations
router.get('/', (req, res) => {
    db.query('SELECT * FROM Reservation', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving reservations');
            return;
        }
        res.json(results);
    });
});

// GET a specific reservation by ID
router.get('/:id', (req, res) => {
    const reservationId = req.params.id;
    db.query('SELECT * FROM Reservation WHERE id = ?', [reservationId], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving reservation');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Reservation not found');
            return;
        }
        res.json(results[0]);
    });
});

// CREATE a new reservation
router.post('/', (req, res) => {
    const { car_id, customer_id, reservation_date, pickup_date, return_date, total_payment } = req.body;
    db.query('INSERT INTO Reservation (CarID, CustomerID, ReservationDate, PickupDate, ReturnDate, TotalPayment) VALUES (?, ?, ?, ?, ?, ?)',
        [car_id, customer_id, reservation_date, pickup_date, return_date, total_payment], (err, results) => {
            if (err) {
                res.status(500).send('Error adding reservation');
                return;
            }
            res.status(201).send('Reservation added');
        });
});

// UPDATE reservation details
router.put('/:id', (req, res) => {
    const reservationId = req.params.id;
    const { car_id, customer_id, reservation_date, pickup_date, return_date, total_payment } = req.body;
    db.query('UPDATE Reservation SET CarID = ?, CustomerID = ?, ReservationDate = ?, PickupDate = ?, ReturnDate = ?, TotalPayment = ? WHERE id = ?',
        [car_id, customer_id, reservation_date, pickup_date, return_date, total_payment, reservationId], (err, results) => {
            if (err) {
                res.status(500).send('Error updating reservation');
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send('Reservation not found');
                return;
            }
            res.send('Reservation updated');
        });
});

// DELETE a reservation
router.delete('/:id', (req, res) => {
    const reservationId = req.params.id;
    db.query('DELETE FROM Reservation WHERE id = ?', [reservationId], (err, results) => {
        if (err) {
            res.status(500).send('Error deleting reservation');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Reservation not found');
            return;
        }
        res.send('Reservation deleted');
    });
});

module.exports = router;