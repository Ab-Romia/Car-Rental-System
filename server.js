// Server.js

const express = require("express");
const passport = require("passport");
const Customer = require("./models/Customer");
const localStrategy = require("./pass.js");
const controllers = require("./controllers.js");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const routes = require("./routes/pages.js");
const session = require("express-session");
const carRoutes = require("./routes/carRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const authController = require("./controllers/authController"); 

const app = express();
connectDB();
app.use(
    session({
        secret: "GFGLogin346",
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

passport.serializeUser((customer, done) => done(null, customer.CustomerID));
passport.deserializeUser(async (id, done) => {
    try {
        const customer = await Customer.findCustomerById(id);
        done(null, customer);
    } catch (err) {
        done(err, null);
    }
});
app.use("/api/auth", authController); // Authentication routes (login, register, logout)
app.use("/api/cars", carController); // Car-related routes
app.use("/api/reservations", reservationController); // Reservation-related routes

app.use("/", routes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});