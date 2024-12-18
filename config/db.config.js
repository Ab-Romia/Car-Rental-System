const mysql = require('mysql2');

// Establish MySQL connection
const db = mysql.createPool({
    host: 'localhost', // Database host
    user: 'romia',      // Your DB username
    password: '8368', // Your DB password
    database: 'car_rental_system', // Your DB name
    connectionLimit: 10,
});

module.exports = db.promise(); // Use promises for async/await