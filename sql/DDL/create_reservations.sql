USE car_rental_system;

CREATE TABLE Reservation (
                             ReservationID INT AUTO_INCREMENT PRIMARY KEY,
                             CarID INT NOT NULL,
                             CustomerID INT NOT NULL,
                             ReservationDate DATE NOT NULL,
                             PickupDate DATE NOT NULL,
                             ReturnDate DATE NOT NULL,
                             TotalPayment DECIMAL(10, 2) NOT NULL,
                             FOREIGN KEY (CarID) REFERENCES Car(CarID) ON DELETE CASCADE,
                             FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE
);
