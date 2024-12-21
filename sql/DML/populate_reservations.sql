USE car_rental_system;
INSERT INTO Reservation (CarID, CustomerID, ReservationDate, PickupDate, ReturnDate, TotalPayment)
VALUES
    (1, 1, '2024-06-01', '2024-06-02', '2024-06-05', 200.00),
    (2, 2, '2024-06-10', '2024-06-11', '2024-06-15', 300.00),
    (3, 3, '2024-06-20', '2024-06-21', '2024-06-25', 250.00),
    (4, 4, '2024-06-30', '2024-07-01', '2024-07-03', 150.00);
