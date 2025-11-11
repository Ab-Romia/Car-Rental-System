# 🚗 CarRental Pro - Professional Car Rental Management System

A modern, full-featured car rental management system built with Node.js, Express, MySQL, and EJS. This application provides a complete solution for managing car rentals, reservations, payments, and customer relationships.

![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![Express](https://img.shields.io/badge/Express-v4.21-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🌐 Public-Facing Features
- **Professional Landing Page** - Modern, responsive homepage with hero section and feature highlights
- **Car Browsing** - Browse available cars with filtering by status, year, and model
- **User Authentication** - Secure registration and login system with password hashing
- **Responsive Design** - Mobile-friendly interface that works on all devices

### 📊 Admin Dashboard
- **Statistics Overview** - Real-time metrics for cars, reservations, customers, and revenue
- **Visual Analytics** - Color-coded statistics cards with utilization rates
- **Recent Activity** - Quick view of recent reservations and payments
- **Quick Actions** - Fast access to common administrative tasks

### 🚙 Car Management
- **Complete CRUD Operations** - Add, view, update, and delete cars
- **Status Tracking** - Monitor car status (Active, Rented, Out of Service)
- **Office Assignment** - Assign cars to specific office locations
- **Detailed Car Information** - Track model, year, plate ID, and more

### 📅 Reservation System
- **Smart Booking** - Create and manage customer reservations
- **Availability Checking** - Automatic validation to prevent double bookings
- **Date Range Selection** - Pick-up and return date management
- **Payment Integration** - Link reservations with payment records

### 💳 Payment Processing
- **Payment Tracking** - Record and manage all payment transactions
- **Multiple Payment Methods** - Support for Credit Card, Cash, and other payment types
- **Revenue Reports** - Track daily payments and total revenue

### 🔍 Advanced Search & Reporting
- **Multi-criteria Search** - Search by car info, customer details, or dates
- **Custom Reports** - Generate reports for:
  - Reservations within a period
  - Reservations by specific car
  - Car status on specific dates
  - Customer reservation history
  - Daily payment summaries

### 👥 Customer Management
- **Customer Profiles** - Maintain detailed customer information
- **Registration System** - Self-service customer registration
- **Booking History** - Track customer rental history

### 🏢 Office Management
- **Multiple Locations** - Manage cars across different office locations
- **Office Information** - Track office names, locations, and contact details

## 🛠️ Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL 8.0
- **Template Engine:** EJS
- **Authentication:** Passport.js (Local Strategy)
- **Password Hashing:** bcrypt
- **Session Management:** express-session
- **Styling:** Custom CSS + Tailwind CSS
- **Icons:** Font Awesome 6

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Car-Rental-System
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup

Create the database and tables:

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE car_rental_system;
USE car_rental_system;

# Run the DDL scripts
source sql/DDL/create_db.sql
source sql/DDL/create_customers.sql
source sql/DDL/create_office.sql
source sql/DDL/create_cars.sql
source sql/DDL/create_reservations.sql
source sql/DDL/create_payments.sql

# (Optional) Load sample data
source sql/DML/populate_offices.sql
source sql/DML/populate_cars.sql
source sql/DML/populate_reservations.sql
source sql/DML/populate_payments.sql
```

### 4. Configure Environment Variables

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and update with your configuration:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=car_rental_system
DB_PORT=3306
PORT=3000
SESSION_SECRET=your_secure_random_string
```

### 5. Start the Application

```bash
# Development mode
npm start

# The application will be available at http://localhost:3000
```

## 📁 Project Structure

```
Car-Rental-System/
├── config/              # Database configuration
│   ├── dbConfig.js
│   └── pool.js
├── controllers/         # Business logic
│   ├── authController.js
│   ├── carController.js
│   ├── customerController.js
│   ├── dashboardController.js
│   ├── officeController.js
│   ├── paymentController.js
│   ├── reportController.js
│   ├── reservationController.js
│   └── searchController.js
├── models/             # Data layer
│   ├── Car.js
│   ├── Customer.js
│   ├── office.js
│   ├── Payment.js
│   ├── Reservation.js
│   ├── report.js
│   └── search.js
├── routes/             # Route definitions
│   ├── carRoutes.js
│   ├── officeRoutes.js
│   ├── pages.js
│   ├── paymentRoutes.js
│   ├── reportRoutes.js
│   ├── reservationRoutes.js
│   └── searchRoutes.js
├── views/              # EJS templates
│   ├── partials/       # Reusable components
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── landing.ejs
│   ├── dashboard.ejs
│   ├── browse.ejs
│   ├── login.ejs
│   ├── register.ejs
│   └── ...
├── public/             # Static assets
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── sql/                # Database scripts
│   ├── DDL/            # Table definitions
│   └── DML/            # Sample data
├── server.js           # Application entry point
└── package.json        # Dependencies
```

## 🎯 Usage

### For Customers

1. **Browse Cars**: Visit the homepage and click "Browse Cars" to see available vehicles
2. **Register**: Create an account by clicking "Sign Up"
3. **Login**: Access your dashboard with your credentials
4. **Book a Car**: Select a car and create a reservation with your desired dates

### For Administrators

1. **Dashboard**: Access comprehensive statistics and recent activity
2. **Manage Cars**: Add, update, or remove cars from the fleet
3. **Handle Reservations**: Create, view, and manage customer bookings
4. **Process Payments**: Record and track payment transactions
5. **Generate Reports**: Access various reports for business insights
6. **Search**: Use advanced search to find specific records

## 🔐 Default Configuration

- **Database**: `car_rental_system`
- **Server Port**: `3000`
- **Database Port**: `3306` (MySQL default)

## 📊 Database Schema

### Tables

1. **Customer** - User accounts and profiles
2. **Office** - Rental office locations
3. **Car** - Vehicle inventory
4. **Reservation** - Booking records
5. **Payment** - Transaction history

### Relationships

- Cars belong to Offices (Many-to-One)
- Reservations link Cars and Customers (Many-to-Many)
- Payments reference Reservations (One-to-One)

## 🎨 UI Features

- **Modern Design** - Clean, professional interface with consistent styling
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
- **Interactive Elements** - Smooth animations and hover effects
- **Icon Integration** - Font Awesome icons throughout the interface
- **Color-Coded Status** - Visual indicators for car status and availability
- **Form Validation** - Client-side and server-side validation
- **Error Handling** - User-friendly error messages and 404 pages

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds for secure password storage
- **Session Management** - Secure session handling with express-session
- **Authentication Middleware** - Protected routes requiring login
- **SQL Injection Prevention** - Parameterized queries throughout
- **Input Validation** - Form validation on client and server side

## 📱 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `GET /api/logout` - User logout

### Cars
- `GET /car/all` - List all cars
- `GET /car/:id` - Get car details
- `POST /car/add` - Add new car
- `POST /car/update` - Update car
- `POST /car/delete` - Delete car
- `POST /car/updateStatus` - Update car status

### Reservations
- `GET /res/all` - List all reservations
- `GET /res/:id` - Get reservation details
- `POST /res/add` - Create reservation
- `POST /res/update` - Update reservation
- `POST /res/delete` - Delete reservation

### Payments
- `GET /payment/all` - List all payments
- `GET /payment/:id` - Get payment details
- `POST /payment/` - Create payment

### Reports
- `GET /report/res` - Reservations in period
- `GET /report/res/by-car` - Car-specific reservations
- `GET /report/res/car-status-day` - Car status on date
- `GET /report/res/by-customer` - Customer reservations
- `GET /report/payments/daily` - Daily payment summary

### Search
- `GET /search/adv` - Advanced multi-criteria search

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Support

For issues, questions, or contributions, please open an issue on the repository.

## 🙏 Acknowledgments

- Node.js and Express.js communities
- MySQL database
- Font Awesome for icons
- Tailwind CSS for utility classes

---

**Built with ❤️ for efficient car rental management**
