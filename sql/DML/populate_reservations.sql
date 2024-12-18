USE car_rental_system;

INSERT INTO car_rental_system.Reservations (car_id, customer_id, reservation_date, pickup_date, return_date, payment_status) VALUES
                                                                                                               (1, 1, '2023-01-10', '2023-01-15', '2023-01-20', 'completed'),
                                                                                                               (2, 2, '2023-02-15', '2023-02-20', '2023-02-25', 'completed'),
                                                                                                               (3, 3, '2023-03-20', '2023-03-25', '2023-03-30', 'pending');