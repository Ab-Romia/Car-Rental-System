const executeQuery = require('../helpers/db.helper');

// Perform operations for cars
const Car = {
    // Add a car
    addCar: async (carData) => {
        const sql = `
        INSERT INTO Car (Model, Year, PlateID, Status, OfficeID)
        VALUES (?, ?, ?, ?, ?)
      `;
        const params = [carData.model, carData.year, carData.plateId, carData.status, carData.officeLocation];
        return await executeQuery(sql, params);
    },

    // Get available cars
    getAvailableCars: async () => {
        const sql = `SELECT * FROM Car WHERE status = 'active'`;
        return await executeQuery(sql);
    }
};

module.exports = Car;