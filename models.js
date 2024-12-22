const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '8368',
    database: 'car_rental_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Function to find a customer by email
async function findCustomerByEmail(email) {
    const query = 'SELECT * FROM Customer WHERE Email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0];
}

// Function to create a new customer
async function createCustomer(firstName, lastName, email, phone, address, accountCreatedDate, hashedPassword) {
    const query = 'INSERT INTO Customer (FirstName, LastName, Email, Phone, Address, AccountCreatedDate, Password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute(query, [firstName, lastName, email, phone, address, accountCreatedDate, hashedPassword]);
    return result.insertId;
}

// Function to find a customer by ID
async function findCustomerById(id) {
    const query = 'SELECT * FROM Customer WHERE CustomerID = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
}

module.exports = {
    findCustomerByEmail,
    createCustomer,
    findCustomerById,
    pool
};