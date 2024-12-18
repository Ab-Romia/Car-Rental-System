USE car_rental_system;
CREATE TABLE Cars (
                      id INT PRIMARY KEY AUTO_INCREMENT,
                      model VARCHAR(100) NOT NULL,
                      year INT NOT NULL,
                      plate_id VARCHAR(50) NOT NULL UNIQUE,
                      status ENUM('active', 'out_of_service', 'rented') NOT NULL DEFAULT 'active',
                      office_location VARCHAR(100) NOT NULL
);