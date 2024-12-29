const Search = require('../models/search');

const searchController = {
    searchAvailableCars: async (req, res) => {
        const { model, year, plateID, officeID } = req.query;

        try {
            const cars = await Search.searchAvailableCars(model, year, plateID, officeID);
            res.json(cars);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = searchController;