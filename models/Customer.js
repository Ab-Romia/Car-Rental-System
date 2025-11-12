const mysql = require('mysql2/promise');
const pool = require('../config/pool');

const Customer = {
    create: async (firstName, lastName, email, phone, address, accountCreatedDate, hashedPassword) => {
        const query = 'INSERT INTO Customer (FirstName, LastName, Email, Phone, Address, AccountCreatedDate, Password) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.execute(query, [firstName, lastName, email, phone, address, accountCreatedDate, hashedPassword]);
        return result.insertId;
    },
    getByEmail: async (email) => {
        const query = 'SELECT * FROM Customer WHERE Email = ?';
        const [rows] = await pool.execute(query, [email]);
        return rows[0];
    },
    getById: async (id) => {
        const query = 'SELECT * FROM Customer WHERE CustomerID = ?';
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    },
    getAll: async () => {
        const query = 'SELECT * FROM Customer';
        const [rows] = await pool.execute(query);
        return rows;
    }
};

module.exports = Customer;
