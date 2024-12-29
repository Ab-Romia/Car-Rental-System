const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Customer = require("./models/Customer");
const bcrypt = require('bcryptjs');


passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const customer = await Customer.getByEmail(email);
            if (!customer) {
                return done(null, false, { message: "Incorrect email" });
            }

            const passwordsMatch = await bcrypt.compare(password, customer.Password); // Ensure this matches the case in your database
            if (passwordsMatch) {
                return done(null, customer);
            } else {
                return done(null, false, { message: "Incorrect password" });
            }
        } catch (err) {
            return done(err);
        }
    })
);

module.exports = passport;