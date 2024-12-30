const pool = require('../config/pool');

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
    },
    update: async (id, reservationID, paymentDate, amount, paymentMethod) => {
        const query = 'UPDATE Payment SET ReservationID = ?, PaymentDate = ?, Amount = ?, PaymentMethod = ? WHERE PaymentID = ?';
        await pool.execute(query, [reservationID, paymentDate, amount, paymentMethod, id]);
    },
    delete: async (id) => {
        const query = 'DELETE FROM Payment WHERE PaymentID = ?';
        await pool.execute(query, [id]);
    }
};

module.exports = Payment;