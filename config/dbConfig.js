// config/dbConfig.js
require('dotenv').config();
const mysql = require('mysql2/promise');

// Creating a pool with the necessary configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'car_rental_system',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

function connectDB() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the car_rental_system database');
    connection.release();
  });
}

// Exporting the pool to be used in other modules
module.exports = connectDB;
