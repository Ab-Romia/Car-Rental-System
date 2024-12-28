// config/dbConfig.js
const mysql = require('mysql2/promise');

// Creating a pool with the necessary configuration
const pool = mysql.createPool({
  host: 'localhost',           // The host where your MySQL server is running
  user: 'root',                // MySQL username
  password: '8368',            // MySQL password
  database: 'car_rental_system', // The database you're working with
  waitForConnections: true,    // Ensure it waits for connections
  connectionLimit: 10,         // Limit the number of concurrent connections
  queueLimit: 0                // No queue limit, adjust as needed
});

// Exporting the pool to be used in other modules
module.exports = pool;
