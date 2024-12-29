const Office = require("../models/office");

const officeController = {
    createOffice: async (req, res) => {
        const { officeName, location } = req.body;

        if (!officeName || !location) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const officeId = await Office.create(officeName, location);
            res.status(201).json({ message: "Office created successfully", officeId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllOffices: async (req, res) => {
        try {
            const offices = await Office.getAll();
            res.status(200).json(offices);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = officeController;
