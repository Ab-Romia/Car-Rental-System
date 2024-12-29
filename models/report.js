const pool = require("../config/dbConfig");

const Report = {
    getReservationsWithinPeriod: async (startDate, endDate) => {
        const query = `
            SELECT r.reservationId, c.firstName, c.lastName, ca.model AS carModel, ca.plateId, r.reservationDate, r.returnDate
            FROM Reservation r
            JOIN Customer c ON r.customerId = c.customerId
            JOIN Car ca ON r.carId = ca.carId
            WHERE r.reservationDate BETWEEN ? AND ?
            ORDER BY r.reservationDate;
        `;
        
        const [rows] = await pool.execute(query, [startDate, endDate]);
        return rows;
    },

    getReservationsByCar: async (carId, startDate, endDate) => {
        const query = `
            SELECT r.reservationId, c.firstName, c.lastName, r.reservationDate, r.returnDate
            FROM Reservation r
            JOIN Customer c ON r.customerId = c.customerId
            WHERE r.carId = ? AND r.reservationDate BETWEEN ? AND ?
            ORDER BY r.reservationDate;
        `;

        const [rows] = await pool.execute(query, [carId, startDate, endDate]);
        return rows;
    },

    getCustomerReservations: async (customerId) => {
        const query = `
            SELECT r.reservationId, ca.model AS carModel, ca.plateId, r.reservationDate, r.returnDate
            FROM Reservation r
            JOIN Car ca ON r.carId = ca.carId
            WHERE r.customerId = ?
            ORDER BY r.reservationDate;
        `;
        
        const [rows] = await pool.execute(query, [customerId]);
        return rows;
    },

    getDailyPayments: async (startDate, endDate) => {
        const query = `
            SELECT r.reservationId, ca.model AS carModel, r.reservationDate, p.amount AS paymentAmount
            FROM Reservation r
            JOIN Payment p ON r.reservationId = p.reservationId
            JOIN Car ca ON r.carId = ca.carId
            WHERE p.paymentDate BETWEEN ? AND ?
            ORDER BY p.paymentDate;
        `;

        const [rows] = await pool.execute(query, [startDate, endDate]);
        return rows;
    },
};

module.exports = Report;
