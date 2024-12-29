const pool = require("../config/pool");

const Search = {
    searchAvailableCars: async (model, year, plateID, officeID) => {
        let query = `
            SELECT * FROM Car
            WHERE Status = 'Active'
        `;
        const params = [];

        if (model) {
            query += " AND Model LIKE ?";
            params.push(`%${model}%`);
        }
        if (year) {
            query += " AND Year = ?";
            params.push(year);
        }
        if (plateID) {
            query += " AND PlateID LIKE ?";
            params.push(`%${plateID}%`);
        }
        if (officeID) {
            query += " AND OfficeID = ?";
            params.push(officeID);
        }

        const [rows] = await pool.execute(query, params);
        return rows;
    },

    advancedSearch: async (carInfo, customerInfo, reservationDate) => {
        let query = `
            SELECT
                ca.CarID, ca.Model, ca.Year, ca.PlateID, ca.Status,
                cu.CustomerID, cu.FirstName , cu.LastName , cu.Email AS customerEmail,
                r.ReservationID, r.PickupDate, r.ReturnDate
            FROM
                Car ca
            LEFT JOIN
                Reservation r ON ca.CarID = r.CarID
            LEFT JOIN
                Customer cu ON r.CustomerID = cu.CustomerID
            WHERE
                1=1
        `;
        const params = [];

        if (carInfo) {
            query += " AND (ca.Model LIKE ? OR ca.Year = ? OR ca.PlateID LIKE ?)";
            params.push(`%${carInfo}%`, carInfo, `%${carInfo}%`);
        }
        if (customerInfo) {
            query += " AND (cu.FirstName LIKE ? OR cu.Email LIKE ? OR cu.Phone LIKE ? OR cu.LastName LIKE ? OR cu.Address LIKE ?)";
            params.push(`%${customerInfo}%`, `%${customerInfo}%, %${customerInfo}%, %${customerInfo}%`, `%${customerInfo}%`, `%${customerInfo}%`);
        }
        if (reservationDate) {
            query += " AND (r.PickupDate = ? OR r.ReturnDate = ? OR r.ReservationDate = ?)";
            params.push(reservationDate, reservationDate);
        }

        const [rows] = await pool.execute(query, params);
        return rows;
    }
};

module.exports = Search;