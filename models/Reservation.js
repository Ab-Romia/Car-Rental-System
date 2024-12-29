const pool = require("../config/pool");

const Reservation = {
    // Create a new reservation
    create: async (carID, customerID, reservationDate, pickupDate, returnDate, totalPayment) => {
        await Reservation.checkCarStatusAndOverlaps(carID, pickupDate, returnDate);

        const query = `
            INSERT INTO Reservation (CarID, CustomerID, ReservationDate, PickupDate, ReturnDate, TotalPayment)
            VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await pool.execute(query, [carID, customerID, reservationDate, pickupDate, returnDate, totalPayment]);

        return result.insertId;
    },

    // Update a reservation
    update: async (id, carID, customerID, reservationDate, pickupDate, returnDate, totalPayment) => {
        await Reservation.checkCarStatusAndOverlaps(carID, pickupDate, returnDate, id);

        const query = `
            UPDATE Reservation
            SET CarID = ?, CustomerID = ?, ReservationDate = ?, PickupDate = ?, ReturnDate = ?, TotalPayment = ?
            WHERE ReservationID = ?`;
        const [result] = await pool.execute(query, [carID, customerID, reservationDate, pickupDate, returnDate, totalPayment, id]);

        return result.affectedRows > 0 ? { id, carID, customerID, reservationDate, pickupDate, returnDate, totalPayment } : null;
    },

    // Delete a reservation
    delete: async (id) => {
        // Get the car ID before deleting the reservation
        const [reservation] = await pool.execute("SELECT CarID FROM Reservation WHERE ReservationID = ?", [id]);
        const carID = reservation[0].CarID;

        const query = "DELETE FROM Reservation WHERE ReservationID = ?";
        const [result] = await pool.execute(query, [id]);



        return result.affectedRows > 0;
    },

    // Check car status and overlapping reservations
    checkCarStatusAndOverlaps: async (carID, pickupDate, returnDate, reservationID = null) => {
        // Check if the car status is "active"
        const carStatusQuery = "SELECT Status FROM Car WHERE CarID = ?";
        const [carStatusRows] = await pool.execute(carStatusQuery, [carID]);
        if (carStatusRows.length === 0 || carStatusRows[0].Status == "Out of Service") {
            throw new Error("The car is not available for reservation.");
        }

        // Check for overlapping reservations
        let overlapQuery = `
            SELECT * FROM Reservation
            WHERE CarID = ? AND (
                (PickupDate <= ? AND ReturnDate >= ?) OR
                (PickupDate <= ? AND ReturnDate >= ?) OR
                (PickupDate >= ? AND ReturnDate <= ?)
            )`;
        const queryParams = [carID, pickupDate, pickupDate, returnDate, returnDate, pickupDate, returnDate];

        if (reservationID) {
            overlapQuery += " AND ReservationID != ?";
            queryParams.push(reservationID);
        }

        const [overlappingReservations] = await pool.execute(overlapQuery, queryParams);

        if (overlappingReservations.length > 0) {
            throw new Error("This car is already reserved for the selected dates.");
        }
    },

    // Get all reservations
    getAll: async () => {
        const query = "SELECT * FROM Reservation";
        const [rows] = await pool.execute(query);
        return rows;
    },

    // Get a reservation by ID
    getById: async (id) => {
        const query = "SELECT * FROM Reservation WHERE ReservationID = ?";
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }
};

module.exports = Reservation;