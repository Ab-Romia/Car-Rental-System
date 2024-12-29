const pool = require("../config/pool");

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
            SELECT r.reservationId, c.firstName, c.lastName, r.reservationDate, r.returnDate,
                   ca.carId, ca.model, ca.plateId, ca.year, ca.status, ca.officeId
            FROM Reservation r
                     JOIN Customer c ON r.customerId = c.customerId
                     JOIN Car ca ON r.carId = ca.carId
            WHERE r.carId = ? AND r.reservationDate BETWEEN ? AND ?
            ORDER BY r.reservationDate;
        `;

        const [rows] = await pool.execute(query, [carId, startDate, endDate]);
        return rows;
    },



    getCarStatusOnSpecificDay: async (specificDate) => {
        const query = `
            SELECT 
                ca.CarID,
                ca.Model AS carModel,
                ca.Year AS carYear,
                ca.PlateID AS carPlateId,
                ca.Status AS carStatus,
                o.OfficeName AS officeName
            FROM 
                Car ca
            LEFT JOIN 
                Office o ON ca.OfficeID = o.OfficeID
            LEFT JOIN 
                Reservation r ON r.CarID = ca.CarID
                AND r.ReservationDate <= ? AND r.ReturnDate >= ?
            WHERE 
                ca.Status IN ('Active', 'Out of Service', 'Rented')
            GROUP BY 
                ca.CarID
            ORDER BY 
                ca.CarID;
        `;
        
        const [rows] = await pool.execute(query, [specificDate, specificDate]);
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
