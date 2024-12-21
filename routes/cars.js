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

// GET all cars
router.get('/', (req, res) => {
    db.query('SELECT * FROM Cars', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving cars');
            return;
        }
        res.json(results);
    });
});

// GET a specific car by ID
router.get('/:id', (req, res) => {
    const carId = req.params.id;
    db.query('SELECT * FROM Cars WHERE id = ?', [carId], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving car');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Car not found');
            return;
        }
        res.json(results[0]);
    });
});

// CREATE a new car
router.post('/', (req, res) => {
    const { model, year, plate_id, status, office_location } = req.body;
    db.query('INSERT INTO Cars (model, year, plate_id, status, office_location) VALUES (?, ?, ?, ?, ?)',
        [model, year, plate_id, status, office_location], (err, results) => {
            if (err) {
                res.status(500).send('Error adding car');
                return;
            }
            res.status(201).send('Car added');
        });
});

// DELETE a car
router.delete('/:id', (req, res) => {
    const carId = req.params.id;
    db.query('DELETE FROM Cars WHERE id = ?', [carId], (err, results) => {
        if (err) {
            res.status(500).send('Error deleting car');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Car not found');
            return;
        }
        res.send('Car deleted');
    });
});

module.exports = router;