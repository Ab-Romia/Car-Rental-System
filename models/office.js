const pool = require("../config/pool");

const Office = {
    create: async (officeName, location) => {
        const query = `
            INSERT INTO Office (OfficeName, Location)
            VALUES (?, ?)`;
        const [result] = await pool.execute(query, [officeName, location]);
        return result.insertId;
    },

    getAll: async () => {
        const query = "SELECT * FROM Office";
        const [rows] = await pool.execute(query);
        return rows;
    },
};

module.exports = Office;
