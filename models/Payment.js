const mysql = require('mysql2/promise');
const pool = require('../config/dbConfig');

const Payment = {
    create: async (reservationID, paymentDate, amount, paymentMethod) => {
        const query = 'INSERT INTO Payment (ReservationID, PaymentDate, Amount, PaymentMethod) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(query, [reservationID, paymentDate, amount, paymentMethod]);
        return result.insertId;
    },
    getAll: async () => {
        const query = 'SELECT * FROM Payment';
        const [rows] = await pool.execute(query);
        return rows;
    },
    getById: async (id) => {
        const query = 'SELECT * FROM Payment WHERE PaymentID = ?';
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }
};

module.exports = Payment;


