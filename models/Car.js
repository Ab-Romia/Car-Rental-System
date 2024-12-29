const mysql = require('mysql2/promise');
const pool = require('../config/pool');
const Car = {
    create: async (model, year, plateID, status, officeID) => {
        const query = "INSERT INTO Car (Model, Year, PlateID, Status, OfficeID) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.execute(query, [model, year, plateID, status, officeID]);
        return result.insertId;
    },

    getAll: async () => {
        const query = "SELECT * FROM Car";
        const [rows] = await pool.execute(query);
        return rows;
    },

    getById: async (id) => {
        const query = "SELECT * FROM Car WHERE CarID = ?";
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    },

    update: async (id, model, year, plateID, status, officeID) => {
        const query =
            "UPDATE Car SET Model = ?, Year = ?, PlateID = ?, Status = ?, OfficeID = ? WHERE CarID = ?";
        const [result] = await pool.execute(query, [model, year, plateID, status, officeID, id]);
        return result.affectedRows > 0 ? { id, model, year, plateID, status, officeID } : null;
    },

    updateStatus: async (id, status) => {
        const query = "UPDATE Car SET Status = ? WHERE CarID = ?";
        const [result] = await pool.execute(query, [status, id]);
        return result.affectedRows > 0 ? { id, status } : null;
    },

    delete: async (id) => {
        const query = "DELETE FROM Car WHERE CarID = ?";
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    },
};

module.exports = Car;