USE car_rental_system;

CREATE TABLE Payment (
                         PaymentID INT AUTO_INCREMENT PRIMARY KEY,
                         ReservationID INT NOT NULL,
                         PaymentDate DATE NOT NULL,
                         Amount DECIMAL(10, 2) NOT NULL,
                         PaymentMethod ENUM('Credit Card', 'Cash', 'Other') NOT NULL,
                         FOREIGN KEY (ReservationID) REFERENCES Reservation(ReservationID) ON DELETE CASCADE
);
