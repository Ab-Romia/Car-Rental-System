// controllers.js
const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

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
        const existingCustomer = await Customer.getByEmail(email);
        if (existingCustomer) {
            return res.status(409).render("register", { error: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const accountCreatedDate = new Date().toISOString().split('T')[0];
        await Customer.create(firstName, lastName, email, phone, address, accountCreatedDate, hashedPassword);

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
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy();
        res.redirect("/");
    });
});

module.exports = router;