USE car_rental_system;

CREATE TABLE Customers (
                           id INT PRIMARY KEY AUTO_INCREMENT,
                           first_name VARCHAR(100) NOT NULL,
                           last_name VARCHAR(100) NOT NULL,
                           email VARCHAR(150) NOT NULL UNIQUE,
                           phone VARCHAR(20),
                           address VARCHAR(255)
);