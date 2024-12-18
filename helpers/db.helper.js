const db = require('../config/db.config');

// Executes raw SQL query
const executeQuery = async (sql, params = []) => {
    try {
        const [rows] = await db.execute(sql, params);
        return rows;
    } catch (error) {
        throw Error(`Failed to execute the query: ${error.message}`);
    }
};

module.exports = executeQuery;