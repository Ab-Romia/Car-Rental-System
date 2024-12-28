const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '8368',
    database: 'car_rental_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function findCustomerByEmail(email) {
    const query = 'SELECT * FROM Customer WHERE Email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0];
}

async function createCustomer(firstName, lastName, email, phone, address, accountCreatedDate, hashedPassword) {
    const query = 'INSERT INTO Customer (FirstName, LastName, Email, Phone, Address, AccountCreatedDate, Password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute(query, [firstName, lastName, email, phone, address, accountCreatedDate, hashedPassword]);
    return result.insertId;
}

async function findCustomerById(id) {
    const query = 'SELECT * FROM Customer WHERE CustomerID = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
}
async function createCar(model, year, plateID, status, officeID) {
    const query = 'INSERT INTO Car (Model, Year, PlateID, Status, OfficeID) VALUES (?, ?, ?, ?, ?)';
    const [result] = await pool.execute(query, [model, year, plateID, status, officeID]);
    return result.insertId;
}

// Get all cars
async function getAllCars() {
    const query = 'SELECT * FROM Car';
    const [rows] = await pool.execute(query);
    return rows;
}

// Get car by ID
async function getCarById(id) {
    const query = 'SELECT * FROM Car WHERE CarID = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
}

// Update car details
async function updateCar(id, model, year, plateID, status, officeID) {
    const query = 'UPDATE Car SET Model = ?, Year = ?, PlateID = ?, Status = ?, OfficeID = ? WHERE CarID = ?';
    const [result] = await pool.execute(query, [model, year, plateID, status, officeID, id]);
    return result.affectedRows > 0 ? { id, model, year, plateID, status, officeID } : null;
}

// Delete car by ID
async function deleteCar(id) {
    const query = 'DELETE FROM Car WHERE CarID = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
}
// Create a reservation
async function createReservation(carID, customerID, reservationDate, pickupDate, returnDate, totalPayment) {
    const query = `
        INSERT INTO Reservation (CarID, CustomerID, ReservationDate, PickupDate, ReturnDate, TotalPayment) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [carID, customerID, reservationDate, pickupDate, returnDate, totalPayment]);
    return result.insertId;
}

// Get all reservations
async function getAllReservations() {
    const query = 'SELECT * FROM Reservation';
    const [rows] = await pool.execute(query);
    return rows;
}

// Get a reservation by ID
async function getReservationById(id) {
    const query = 'SELECT * FROM Reservation WHERE ReservationID = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
}

// Update a reservation
async function updateReservation(id, carID, customerID, reservationDate, pickupDate, returnDate, totalPayment) {
    const query = `
        UPDATE Reservation 
        SET CarID = ?, CustomerID = ?, ReservationDate = ?, PickupDate = ?, ReturnDate = ?, TotalPayment = ? 
        WHERE ReservationID = ?
    `;
    const [result] = await pool.execute(query, [carID, customerID, reservationDate, pickupDate, returnDate, totalPayment, id]);
    return result.affectedRows > 0 ? { id, carID, customerID, reservationDate, pickupDate, returnDate, totalPayment } : null;
}

// Delete a reservation
async function deleteReservation(id) {
    const query = 'DELETE FROM Reservation WHERE ReservationID = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
}

// Search reservations
async function searchReservations(searchConditions) {
    let query = 'SELECT * FROM Reservation WHERE 1';
    const values = [];

    if (searchConditions.carID) {
        query += ' AND CarID = ?';
        values.push(searchConditions.carID);
    }

    if (searchConditions.customerID) {
        query += ' AND CustomerID = ?';
        values.push(searchConditions.customerID);
    }

    if (searchConditions.reservationDate) {
        if (searchConditions.reservationDate.$gte) {
            query += ' AND ReservationDate >= ?';
            values.push(searchConditions.reservationDate.$gte);
        }
        if (searchConditions.reservationDate.$lte) {
            query += ' AND ReservationDate <= ?';
            values.push(searchConditions.reservationDate.$lte);
        }
    }

    if (searchConditions.pickupDate) {
        if (searchConditions.pickupDate.$gte) {
            query += ' AND PickupDate >= ?';
            values.push(searchConditions.pickupDate.$gte);
        }
        if (searchConditions.pickupDate.$lte) {
            query += ' AND PickupDate <= ?';
            values.push(searchConditions.pickupDate.$lte);
        }
    }

    const [rows] = await pool.execute(query, values);
    return rows;
}

module.exports = {
    findCustomerByEmail,
    createCustomer,
    findCustomerById,
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar,
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation,
    searchReservations,
    pool
};