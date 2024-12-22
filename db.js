const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '8368',
    database: 'car_rental_system',
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

module.exports = connectDB;