const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve HTML files for each route
app.get('/cars', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cars.html'));
});

app.get('/customers', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'customers.html'));
});

app.get('/payments', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'payments.html'));
});

app.get('/reservations', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reservations.html'));
});

app.get('/offices', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'offices.html'));
});

// Import route files
const carRoutes = require('./routes/cars');
const customerRoutes = require('./routes/customers');
const paymentRoutes = require('./routes/payments');
const reservationRoutes = require('./routes/reservations');
const officesRoutes = require('./routes/offices');

// Use the routes
app.use('/api/cars', carRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/offices', officesRoutes);

// Route to terminate the server
app.get('/shutdown', (req, res) => {
    res.send('Shutting down the server...');
    process.exit();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});