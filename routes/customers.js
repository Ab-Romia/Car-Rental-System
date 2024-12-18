const express = require('express');
const router = express.Router();

// GET all customers
router.get('/', (req, res) => {
    res.send('Get all customers');
});

// GET a specific customer by ID
router.get('/:id', (req, res) => {
    const customerId = req.params.id;
    res.send(`Get customer with ID: ${customerId}`);
});

// CREATE a new customer
router.post('/', (req, res) => {
    const customerData = req.body;
    res.send('Customer added');
});

// UPDATE customer details
router.put('/:id', (req, res) => {
    const customerId = req.params.id;
    const updatedData = req.body;
    res.send(`Customer with ID: ${customerId} updated`);
});

// DELETE a customer
router.delete('/:id', (req, res) => {
    const customerId = req.params.id;
    res.send(`Customer with ID: ${customerId} deleted`);
});

module.exports = router;