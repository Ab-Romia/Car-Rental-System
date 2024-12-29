const pool = require("../config/pool");

const Report = {
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
};

module.exports = Report;