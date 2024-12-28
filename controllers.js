// controllers.js
const express = require("express");
const router = express.Router();
const Customer = require("./models");
const Car = require("./models");
const Reservation = require('./models');  
const passport = require("passport");
const bcrypt = require('bcryptjs');


router.post("/register", async (req, res) => {
    const { firstName, lastName, email, phone, address, password, confirmpassword } = req.body;
    if (!firstName || !lastName || !email || !password || !confirmpassword) {
        return res.status(403).render("register", { error: "All Fields are required" });
    }
    if (confirmpassword !== password) {
        return res.status(403).render("register", { error: "Password do not match" });
    }
    try {
        const existingCustomer = await Customer.findCustomerByEmail(email);
        if (existingCustomer) {
            return res.status(409).render("register", { error: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        const accountCreatedDate = new Date().toISOString().split('T')[0];
        await Customer.createCustomer(firstName, lastName, email, phone, address, accountCreatedDate, hashedPassword);

        return res.redirect("/login");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});


router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, customer, info) => {
        if (err) {
            return next(err);
        }
        if (!customer) {
            return res.status(401).render("login", { error: "Invalid email or password" });
        }
        req.logIn(customer, (err) => {
            if (err) {
                return next(err);
            }
            req.session.name = customer.FirstName;
            return res.redirect("/");
        });
    })(req, res, next);
});
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy();
        res.redirect("/");
    });
});

router.post("/cars", async (req, res) => {
    const { model, year, plateID, status, officeID } = req.body;
    try {
        const newCarId = await Car.createCar(model, year, plateID, status, officeID);
        res.status(201).json({ message: 'Car added successfully', carId: newCarId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/cars", async (req, res) => {
    try {
        const cars = await Car.getAllCars();
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/cars/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.getCarById(id);
        if (car) {
            res.status(200).json(car);
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/cars/:id", async (req, res) => {
    const { id } = req.params;
    const { model, year, plateID, status, officeID } = req.body;
    try {
        const updatedCar = await Car.updateCar(id, model, year, plateID, status, officeID);
        if (updatedCar) {
            res.status(200).json({ message: 'Car updated successfully', car: updatedCar });
        } else {
            res.status(404).json({ message: 'Car not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/cars/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Car.deleteCar(id);
        if (result) {
            res.status(200).json({ message: 'Car deleted successfully' });
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a reservation
router.post("/reservations", async (req, res) => {
    const { carID, customerID, reservationDate, pickupDate, returnDate, totalPayment } = req.body;

   
    if (!carID || !customerID || !reservationDate || !pickupDate || !returnDate || !totalPayment) {
        return res.status(403).json({ error: "All fields are required" });
    }

    try {
        const newReservationId = await Reservation.createReservation(carID, customerID, reservationDate, pickupDate, returnDate, totalPayment);
        res.status(201).json({ message: "Reservation created successfully", reservationId: newReservationId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all reservations
router.get("/reservations", async (req, res) => {
    try {
        const reservations = await Reservation.getAllReservations();
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get reservation by ID
router.get("/reservations/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.getReservationById(id);
        if (reservation) {
            res.status(200).json(reservation);
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update reservation
router.put("/reservations/:id", async (req, res) => {
    const { id } = req.params;
    const { carID, customerID, reservationDate, pickupDate, returnDate, totalPayment } = req.body;

    try {
        const updatedReservation = await Reservation.updateReservation(id, carID, customerID, reservationDate, pickupDate, returnDate, totalPayment);
        if (updatedReservation) {
            res.status(200).json({ message: "Reservation updated successfully", reservation: updatedReservation });
        } else {
            res.status(404).json({ message: "Reservation not found or no changes made" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete reservation
router.delete("/reservations/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Reservation.deleteReservation(id);
        if (result) {
            res.status(200).json({ message: "Reservation deleted successfully" });
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;