const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
// Create a new reservation
router.post('/add', async (req, res) => {
    const { carID, customerID, reservationDate, pickupDate, returnDate, totalPayment } = req.body;

    if (!carID || !customerID || !reservationDate || !pickupDate || !returnDate || !totalPayment) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = `
            INSERT INTO Reservation (CarID, CustomerID, ReservationDate, PickupDate, ReturnDate, TotalPayment)
            VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [carID, customerID, reservationDate, pickupDate, returnDate, totalPayment];

        const [result] = await db.execute(query, values);
        return res.status(201).json({ reservationID: result.insertId, carID, customerID, reservationDate, pickupDate, returnDate, totalPayment });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Get all reservations
router.get('/all', async (req, res) => {
    try {
        const query = 'SELECT * FROM Reservation';
        const [reservations] = await db.execute(query);
        return res.status(200).json(reservations);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Get a specific reservation by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'SELECT * FROM Reservation WHERE ReservationID = ?';
        const [reservation] = await db.execute(query, [id]);

        if (!reservation.length) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        return res.status(200).json(reservation[0]);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Update a reservation
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { carID, customerID, reservationDate, pickupDate, returnDate, totalPayment } = req.body;

    try {
        const query = `
            UPDATE Reservation
            SET CarID = ?, CustomerID = ?, ReservationDate = ?, PickupDate = ?, ReturnDate = ?, TotalPayment = ?
            WHERE ReservationID = ?`;
        const values = [carID, customerID, reservationDate, pickupDate, returnDate, totalPayment, id];

        const [result] = await db.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reservation not found or update failed' });
        }

        return res.status(200).json({ message: 'Reservation updated successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Delete a reservation
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM Reservation WHERE ReservationID = ?';
        const [result] = await db.execute(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        return res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Search reservations by criteria
router.get('/search', async (req, res) => {
    const { carID, customerID, reservationDateFrom, reservationDateTo, pickupDateFrom, pickupDateTo } = req.query;

    let searchConditions = [];
    let params = [];

    if (carID) {
        searchConditions.push('CarID = ?');
        params.push(carID);
    }
    if (customerID) {
        searchConditions.push('CustomerID = ?');
        params.push(customerID);
    }
    if (reservationDateFrom || reservationDateTo) {
        if (reservationDateFrom) {
            searchConditions.push('ReservationDate >= ?');
            params.push(reservationDateFrom);
        }
        if (reservationDateTo) {
            searchConditions.push('ReservationDate <= ?');
            params.push(reservationDateTo);
        }
    }
    if (pickupDateFrom || pickupDateTo) {
        if (pickupDateFrom) {
            searchConditions.push('PickupDate >= ?');
            params.push(pickupDateFrom);
        }
        if (pickupDateTo) {
            searchConditions.push('PickupDate <= ?');
            params.push(pickupDateTo);
        }
    }

    const whereClause = searchConditions.length ? `WHERE ${searchConditions.join(' AND ')}` : '';

    try {
        const query = `SELECT * FROM Reservation ${whereClause}`;
        const [reservations] = await db.execute(query, params);
        return res.status(200).json(reservations);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Payment for reservation
router.post("/:id/payment", async (req, res) => {
    const { id } = req.params;
    const { paymentDate, amount, paymentMethod } = req.body;

    if (!paymentDate || !amount || !paymentMethod) {
        return res.status(400).json({ error: "Payment details are incomplete" });
    }

    try {
        const query = `
            INSERT INTO Payment (ReservationID, PaymentDate, Amount, PaymentMethod)
            VALUES (?, ?, ?, ?)`;
        const values = [id, paymentDate, amount, paymentMethod];

        const [result] = await db.execute(query, values);
        return res.status(201).json({ paymentID: result.insertId, ReservationID: id, paymentDate, amount, paymentMethod });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
