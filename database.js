
const mysql = require('mysql2');

// connection to database
const db = mysql.createConnection({
  host: 'localhost',        
  user: 'root',              
  password: '',              
  database: 'car_rental_system'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});


module.exports = db;
