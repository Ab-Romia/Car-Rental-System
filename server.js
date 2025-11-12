// Server.js
require('dotenv').config();

const express = require("express");
const passport = require("passport");
const Customer = require("./models/Customer");
const localStrategy = require("./pass.js");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConfig");
const ejs = require("ejs");
const reportRoutes = require("./routes/reportRoutes");
const bodyParser = require("body-parser");
const routes = require("./routes/pages.js");
const session = require("express-session");
const carRoutes = require("./routes/carRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const authController = require("./controllers/authController");
const searchRoutes = require("./routes/searchRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const officeRoutes = require("./routes/officeRoutes");


const app = express();
connectDB();

// Serve static files
app.use(express.static('public'));

app.use(
    session({
        secret: process.env.SESSION_SECRET || "GFGLogin346_fallback",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");

// Middleware to pass user session to all views
app.use((req, res, next) => {
    res.locals.user = req.session.name || null;
    next();
});

passport.serializeUser((customer, done) => done(null, customer.CustomerID));
passport.deserializeUser(async (id, done) => {
    try {
        const customer = await Customer.getById(id);
        done(null, customer);
    } catch (err) {
        done(err, null);
    }
});
app.use("/payment/", paymentRoutes);
app.use("/search/", searchRoutes);
app.use("/api/", authController);
app.use("/report/",reportRoutes);
app.use("/res/",reservationRoutes);
app.use("/car/",carRoutes);
app.use("/office/",officeRoutes);

app.use("/", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});