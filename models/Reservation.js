const mysql = require('mysql2/promise');
const pool = require('../config/dbConfig');

const Reservation = {
    create: async (carID, customerID, reservationDate, pickupDate, returnDate, totalPayment) => {
        const query = 'INSERT INTO Reservation (CarID, CustomerID, ReservationDate, PickupDate, ReturnDate, TotalPayment) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await pool.execute(query, [carID, customerID, reservationDate, pickupDate, returnDate, totalPayment]);
        return result.insertId;
    },
    getAll: async () => {
        const query = 'SELECT * FROM Reservation';
        const [rows] = await pool.execute(query);
        return rows;
    },
    getById: async (id) => {
        const query = 'SELECT * FROM Reservation WHERE ReservationID = ?';
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    },
    update: async (id, carID, customerID, reservationDate, pickupDate, returnDate, totalPayment) => {
        const query = 'UPDATE Reservation SET CarID = ?, CustomerID = ?, ReservationDate = ?, PickupDate = ?, ReturnDate = ?, TotalPayment = ? WHERE ReservationID = ?';
        const [result] = await pool.execute(query, [carID, customerID, reservationDate, pickupDate, returnDate, totalPayment, id]);
        return result.affectedRows > 0 ? { id, carID, customerID, reservationDate, pickupDate, returnDate, totalPayment } : null;
    },
    delete: async (id) => {
        const query = 'DELETE FROM Reservation WHERE ReservationID = ?';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    }
};

module.exports = Reservation;
