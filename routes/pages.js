// pages.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if (req.session.name) {
        const name = req.session.name;
        res.render("home", { name: name });
    } else {
        res.render("home", { name: null });
    }
});

router.get("/login", (req, res) => {
    if (req.session.name) {
        res.redirect("/");
    } else {
        res.render("login", { error: null });
    }
});

router.get("/register", (req, res) => {
    if (req.session.name) {
        res.redirect("/");
    } else {
        res.render("register", { error: null });
    }
});

module.exports = router;