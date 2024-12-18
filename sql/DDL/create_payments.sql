USE car_rental_system;

CREATE TABLE Payments (
                          id INT PRIMARY KEY AUTO_INCREMENT,
                          reservation_id INT,
                          amount DECIMAL(10, 2) NOT NULL,
                          payment_date DATE,
                          FOREIGN KEY (reservation_id) REFERENCES Reservations(id)
);