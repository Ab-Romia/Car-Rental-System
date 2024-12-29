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
    }
};

module.exports = Search;