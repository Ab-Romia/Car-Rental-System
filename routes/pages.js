// pages.js
const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const dashboardController = require("../controllers/dashboardController");

router.get("/", (req, res) => {
    if (req.session.name) {
        res.redirect("/home");
    } else {
        res.render("landing");
    }
});

router.get("/home", dashboardController.getDashboardStats);

router.get("/browse", async (req, res) => {
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

router.get("/login", (req, res) => {
    if (req.session.name) {
        res.redirect("/home");
    } else {
        res.render("login", { error: null });
    }
});

router.get("/register", (req, res) => {
    if (req.session.name) {
        res.redirect("/home");
    } else {
        res.render("register", { error: null });
    }
});

module.exports = router;