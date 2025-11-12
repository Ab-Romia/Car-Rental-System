// pages.js
const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const dashboardController = require("../controllers/dashboardController");
const { isAuthenticated, isNotAuthenticated } = require("../middleware/auth");

router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/home");
    } else {
        res.render("landing");
    }
});

router.get("/home", isAuthenticated, dashboardController.getDashboardStats);

router.get("/browse", isAuthenticated, async (req, res) => {
    try {
        const { status, year, search } = req.query;
        let cars = await Car.getAll();

        // Apply filters
        if (status) {
            cars = cars.filter(car => car.Status === status);
        }
        if (year) {
            cars = cars.filter(car => car.Year == year);
        }
        if (search) {
            cars = cars.filter(car =>
                car.Model.toLowerCase().includes(search.toLowerCase())
            );
        }

        res.render("browse", {
            cars,
            status: status || '',
            year: year || '',
            search: search || ''
        });
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.render("browse", {
            cars: [],
            status: '',
            year: '',
            search: '',
            error: "Error loading cars"
        });
    }
});

router.get("/login", isNotAuthenticated, (req, res) => {
    res.render("login", { error: null });
});

router.get("/register", isNotAuthenticated, (req, res) => {
    res.render("register", { error: null });
});

module.exports = router;