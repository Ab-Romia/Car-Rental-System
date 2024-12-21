USE car_rental_system;
CREATE TABLE Car (
                     CarID INT AUTO_INCREMENT PRIMARY KEY,
                     Model VARCHAR(50) NOT NULL,
                     Year INT NOT NULL,
                     PlateID VARCHAR(20) UNIQUE NOT NULL,
                     Status ENUM('Active', 'Out of Service', 'Rented') NOT NULL,
                     OfficeID INT NOT NULL,
                     FOREIGN KEY (OfficeID) REFERENCES Office(OfficeID) ON DELETE CASCADE
);
