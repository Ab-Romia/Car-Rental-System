const Report = require("../models/report");

const reportController = {
    getReservationsWithinPeriod: async (req, res) => {
        const { startDate, endDate } = req.query;

        try {
            const reservations = await Report.getReservationsWithinPeriod(startDate, endDate);
            res.render("allRes", { reservations });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    getReservationsByCar: async (req, res) => {
        const { carID, startDate, endDate } = req.query;

        try {
            const reservations = await Report.getReservationsByCar(carID, startDate, endDate);
            res.render("allRes", { reservations });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    getCarStatusOnSpecificDay: async (req, res) => {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: "Date is required" });
        }

        try {
            const cars = await Report.getCarStatusOnSpecificDay(date);
            res.render("report1", { cars });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    getCustomerReservations: async (req, res) => {
        const { customerID } = req.query;

        try {
            const reservations = await Report.getCustomerReservations(customerID);
            res.render("allRes", { reservations });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    getDailyPayments: async (req, res) => {
        const { startDate, endDate } = req.query;

        try {
            const payments = await Report.getDailyPayments(startDate, endDate);
            res.render("report3", { payments });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
};

module.exports = reportController;