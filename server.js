// server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the Car Rental System API');
});
// Import route files (we'll create it later)
const carRoutes = require('./routes/cars');
const customerRoutes = require('./routes/customers');
const paymentRoutes = require('./routes/payments');
const reservationRoutes = require('./routes/reservations')

// Use the routes
app.use('/cars', carRoutes);
app.use('/customers', customerRoutes);
app.use('/payments', paymentRoutes);
app.use('/reservations', reservationRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});