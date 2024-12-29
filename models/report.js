const pool = require("../config/pool");

const Report = {
    getReservationsWithinPeriod: async (startDate, endDate) => {
        const query = `
            SELECT
                r.ReservationID, r.PickupDate, r.ReturnDate, r.ReservationDate,
                ca.CarID, ca.Model AS carModel, ca.Year AS carYear, ca.PlateID AS carPlateId,
                cu.CustomerID, cu.FirstName, cu.LastName, cu.Email AS customerEmail
            FROM
                Reservation r
                    JOIN
                Car ca ON r.CarID = ca.CarID
                    JOIN
                Customer cu ON r.CustomerID = cu.CustomerID
            WHERE
                r.ReservationDate BETWEEN ? AND ?
            ORDER BY
                r.ReservationDate;
        `;
        const [rows] = await pool.execute(query, [startDate, endDate]);
        return rows;
    },

    getReservationsByCar: async (carId, startDate, endDate) => {
        const query = `
            SELECT
                r.ReservationID, r.PickupDate, r.ReturnDate, r.ReservationDate,
                ca.CarID, ca.Model AS carModel, ca.Year AS carYear, ca.PlateID AS carPlateId,
                cu.CustomerID, cu.FirstName, cu.LastName, cu.Email AS customerEmail
            FROM
                Reservation r
            JOIN
                Car ca ON r.CarID = ca.CarID
            JOIN
                Customer cu ON r.CustomerID = cu.CustomerID
            WHERE
                ca.CarID = ? AND r.ReservationDate BETWEEN ? AND ?
            ORDER BY
                r.ReservationDate;
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
                CASE
                    WHEN ? BETWEEN r.PickupDate AND r.ReturnDate THEN 'Rented'
                    ELSE 'Active'
                    END AS carStatus,
                o.Name AS officeName
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
                ca.CarID, ca.Model, ca.Year, ca.PlateID, o.Name, r.PickupDate, r.ReturnDate
            ORDER BY
                ca.CarID;
        `;
        const [rows] = await pool.execute(query, [specificDate, specificDate, specificDate]);
        return rows;
    },

    getCustomerReservations: async (customerId) => {
        const query = `
            SELECT
                r.ReservationID, r.PickupDate, r.ReturnDate, r.ReservationDate,
                ca.CarID, ca.Model AS carModel, ca.PlateID AS carPlateId,
                cu.CustomerID, cu.FirstName, cu.LastName, cu.Email AS customerEmail
            FROM
                Reservation r
            JOIN
                Car ca ON r.CarID = ca.CarID
            JOIN
                Customer cu ON r.CustomerID = cu.CustomerID
            WHERE
                cu.CustomerID = ?
            ORDER BY
                r.ReservationDate;
        `;
        const [rows] = await pool.execute(query, [customerId]);
        return rows;
    },

    getDailyPayments: async (startDate, endDate) => {
        const query = `
            SELECT
                PaymentDate, SUM(Amount) as totalAmount
            FROM
                Payment
            WHERE
                PaymentDate BETWEEN ? AND ?
            GROUP BY
                PaymentDate
            ORDER BY
                PaymentDate;
        `;
        const [rows] = await pool.execute(query, [startDate, endDate]);
        return rows;
    }
};

module.exports = Report;