// controllers/customerController.js
const Customer = require("../models/Customer");
const bcrypt = require('bcryptjs');
const passport = require("passport");

// Register new customer
async function register(req, res) {
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
}

// Login customer
function login(req, res, next) {
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
}

// Logout customer
function logout(req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy();
        res.redirect("/");
    });
}



module.exports = {
    register,
    login,
    logout
};
