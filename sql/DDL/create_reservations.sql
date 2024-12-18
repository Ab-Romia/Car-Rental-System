USE car_rental_system;

CREATE TABLE Reservations (
                              id INT PRIMARY KEY AUTO_INCREMENT,
                              car_id INT,
                              customer_id INT,
                              reservation_date DATE NOT NULL,
                              pickup_date DATE NOT NULL,
                              return_date DATE,
                              payment_status ENUM('pending', 'completed') NOT NULL DEFAULT 'pending',
                              FOREIGN KEY (car_id) REFERENCES Cars(id),
                              FOREIGN KEY (customer_id) REFERENCES Customers(id)
);