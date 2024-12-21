USE car_rental_system;

CREATE TABLE Customer (
                          CustomerID INT AUTO_INCREMENT PRIMARY KEY,
                          FirstName VARCHAR(50) NOT NULL,
                          LastName VARCHAR(50) NOT NULL,
                          Email VARCHAR(100) UNIQUE NOT NULL,
                          Phone VARCHAR(15),
                          Address TEXT,
                          AccountCreatedDate DATE NOT NULL
);
