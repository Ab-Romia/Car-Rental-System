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

// GET all offices
router.get('/', (req, res) => {
    db.query('SELECT * FROM Offices', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving offices');
            return;
        }
        res.json(results);
    });
});

// GET a specific office by ID
router.get('/:id', (req, res) => {
    const officeId = req.params.id;
    db.query('SELECT * FROM Offices WHERE id = ?', [officeId], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving office');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Office not found');
            return;
        }
        res.json(results[0]);
    });
});

// CREATE a new office
router.post('/', (req, res) => {
    const { name, location, phone } = req.body;
    db.query('INSERT INTO Offices (name, location, phone) VALUES (?, ?, ?)',
        [name, location, phone], (err, results) => {
            if (err) {
                res.status(500).send('Error adding office');
                return;
            }
            res.status(201).send('Office added');
        });
});

// UPDATE office details
router.put('/:id', (req, res) => {
    const officeId = req.params.id;
    const { name, location, phone } = req.body;
    db.query('UPDATE Offices SET name = ?, location = ?, phone = ? WHERE id = ?',
        [name, location, phone, officeId], (err, results) => {
            if (err) {
                res.status(500).send('Error updating office');
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send('Office not found');
                return;
            }
            res.send('Office updated');
        });
});

// DELETE an office
router.delete('/:id', (req, res) => {
    const officeId = req.params.id;
    db.query('DELETE FROM Offices WHERE id = ?', [officeId], (err, results) => {
        if (err) {
            res.status(500).send('Error deleting office');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Office not found');
            return;
        }
        res.send('Office deleted');
    });
});

module.exports = router;