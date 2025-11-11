const Car = require('../models/Car');
const Reservation = require('../models/Reservation');
const Payment = require('../models/Payment');
const Customer = require('../models/Customer');

exports.getDashboardStats = async (req, res) => {
    try {
        // Fetch all data
        const cars = await Car.getAll();
        const reservations = await Reservation.getAll();
        const payments = await Payment.getAll();
        const customers = await Customer.getAll();

        // Calculate statistics
        const totalCars = cars.length;
        const activeCars = cars.filter(car => car.Status === 'Active').length;
        const rentedCars = cars.filter(car => car.Status === 'Rented').length;
        const outOfServiceCars = cars.filter(car => car.Status === 'Out of Service').length;

        const totalReservations = reservations.length;
        const totalCustomers = customers.length;

        // Calculate total revenue
        const totalRevenue = payments.reduce((sum, payment) => sum + parseFloat(payment.Amount || 0), 0);

        // Get recent reservations (last 5)
        const recentReservations = reservations
            .sort((a, b) => new Date(b.ReservationDate) - new Date(a.ReservationDate))
            .slice(0, 5);

        // Get recent payments (last 5)
        const recentPayments = payments
            .sort((a, b) => new Date(b.PaymentDate) - new Date(a.PaymentDate))
            .slice(0, 5);

        res.render('dashboard', {
            name: req.session.name,
            stats: {
                totalCars,
                activeCars,
                rentedCars,
                outOfServiceCars,
                totalReservations,
                totalCustomers,
                totalRevenue
            },
            recentReservations,
            recentPayments,
            cars: cars.slice(0, 6) // Show first 6 cars
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.render('dashboard', {
            name: req.session.name,
            stats: {
                totalCars: 0,
                activeCars: 0,
                rentedCars: 0,
                outOfServiceCars: 0,
                totalReservations: 0,
                totalCustomers: 0,
                totalRevenue: 0
            },
            recentReservations: [],
            recentPayments: [],
            cars: [],
            error: 'Error loading dashboard data'
        });
    }
};
