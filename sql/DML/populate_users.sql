USE car_rental_system;

INSERT INTO users (email, username, password, created_at) VALUES
                                                              ('romia@team.com', 'romia', 'hashed_password_1', NOW()),
                                                              ('john.doe@example.com', 'johndoe', 'hashed_password_1', NOW()),
                                                              ('jane.smith@example.com', 'janesmith', 'hashed_password_2', NOW()),
                                                              ('alice.jones@example.com', 'alicejones', 'hashed_password_3', NOW());