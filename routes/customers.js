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

// GET all customers
router.get('/', (req, res) => {
    db.query('SELECT * FROM Customers', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving customers');
            return;
        }
        res.json(results);
    });
});

// GET a specific customer by ID
router.get('/:id', (req, res) => {
    const customerId = req.params.id;
    db.query('SELECT * FROM Customers WHERE id = ?', [customerId], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving customer');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Customer not found');
            return;
        }
        res.json(results[0]);
    });
});

// CREATE a new customer
router.post('/', (req, res) => {
    const { first_name, last_name, email, phone, address } = req.body;
    db.query('INSERT INTO Customers (first_name, last_name, email, phone, address) VALUES (?, ?, ?, ?, ?)',
        [first_name, last_name, email, phone, address], (err, results) => {
            if (err) {
                res.status(500).send('Error adding customer');
                return;
            }
            res.status(201).send('Customer added');
        });
});

// UPDATE customer details
router.put('/:id', (req, res) => {
    const customerId = req.params.id;
    const { first_name, last_name, email, phone, address } = req.body;
    db.query('UPDATE Customers SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
        [first_name, last_name, email, phone, address, customerId], (err, results) => {
            if (err) {
                res.status(500).send('Error updating customer');
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send('Customer not found');
                return;
            }
            res.send('Customer updated');
        });
});

// DELETE a customer
router.delete('/:id', (req, res) => {
    const customerId = req.params.id;
    db.query('DELETE FROM Customers WHERE id = ?', [customerId], (err, results) => {
        if (err) {
            res.status(500).send('Error deleting customer');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Customer not found');
            return;
        }
        res.send('Customer deleted');
    });
});

module.exports = router;