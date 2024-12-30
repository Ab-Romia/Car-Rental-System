// controllers/officeController.js
const Office = require("../models/office");

// Create a new office
async function createOffice(req) {
    const { officeName, location } = req.body;

    if (!officeName || !location) {
        return { statusCode: 400, body: { error: "All fields are required" } };
    }

    try {
        const officeId = await Office.create(officeName, location);
        return { statusCode: 201, body: { message: "Office created successfully", officeId } };
    } catch (error) {
        return { statusCode: 500, body: { message: error.message } };
    }
}

// Get all offices
async function getAllOffices() {
    try {
        const offices = await Office.getAll();
        return { statusCode: 200, body: { offices } };
    } catch (error) {
        return { statusCode: 500, body: { message: error.message } };
    }
}

module.exports = {
    createOffice,
    getAllOffices,
};