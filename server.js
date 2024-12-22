// Server.js

// Imports //
const express = require("express");
const passport = require("passport");
const Customer = require("./models.js");
const localStrategy = require("./pass.js");
const controllers = require("./controllers.js");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const routes = require("./pages.js");
const session = require("express-session");

// Main Server //
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

// Serialize and deserialize customer objects to maintain user sessions
passport.serializeUser((customer, done) => done(null, customer.CustomerID));
passport.deserializeUser(async (id, done) => {
    try {
        const customer = await Customer.findCustomerById(id);
        done(null, customer);
    } catch (err) {
        done(err, null);
    }
});

// Use the routes
app.use("/api/", controllers); // Path to your authentication routes file
app.use("/", routes);

// Start the server
const port = 3000; // Replace with your desired port number
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});