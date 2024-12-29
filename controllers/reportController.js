const Report = require("../models/report");

const reportController = {
    getReservationsWithinPeriod: async (req, res) => {
        const { startDate, endDate } = req.query;

        try {
            const report = await Report.getReservationsWithinPeriod(startDate, endDate);
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getReservationsByCar: async (req, res) => {
        const { carId, startDate, endDate } = req.query;

        try {
            const report = await Report.getReservationsByCar(carId, startDate, endDate);
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getCarStatusOnSpecificDay: async (req, res) => {
        const { specificDate } = req.query;

        try {
            const report = await Report.getCarStatusOnSpecificDay(specificDate);
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getCustomerReservations: async (req, res) => {
        const { customerId } = req.query;

        try {
            const report = await Report.getCustomerReservations(customerId);
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getDailyPayments: async (req, res) => {
        const { startDate, endDate } = req.query;

        try {
            const payments = await Report.getDailyPayments(startDate, endDate);
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = reportController;