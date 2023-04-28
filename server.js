// Import required modules
const express = require('express');
const mysql = require('mysql');

// Create a new instance of the express application
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Configure MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Demo'
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// Define routes for the REST API
app.get('/customers', (req, res) => {
  // Query the customers table in the MySQL database
  db.query('SELECT * FROM customers', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/customers', (req, res) => {
  // Insert a new customer into the customers table in the MySQL database
  const { customer_name, customer_email } = req.body;
  const sql = 'INSERT INTO customers (customer_name, customer_email) VALUES (?, ?)';
  db.query(sql, [customer_name, customer_email], (err, result) => {
    if (err) throw err;
    res.send('Customer added successfully!');
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
