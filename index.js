const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Set up a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'scala'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Use body-parser to parse JSON data in the request body
app.use(bodyParser.json());

// Allow cross-origin resource sharing
app.use(cors());

// Create an API endpoint to fetch user data
app.get('/users', (req, res) => {
  connection.query('SELECT id, first_name, last_name, age FROM users', (err, results) => {
    if (err) {
      console.log('Error fetching users from MySQL:', err);
      res.status(500).send('Error fetching users from MySQL');
      return;
    }
    res.json(results);
  });
});

// Create an API endpoint to fetch cars
app.get('/cars', (req, res) => {
  connection.query('SELECT id, brand, name, photo FROM cars', (err, results) => {
    if (err) {
      console.log('Error fetching users from MySQL:', err);
      res.status(500).send('Error fetching users from MySQL');
      return;
    }
    res.json(results);
  });
});

// Create an API endpoint to fetch car info
app.get('/cars/:id', (req, res) => {
  connection.query('SELECT id, brand, name, photo FROM cars WHERE id = ' + req.params.id, (err, results) => {
    if (err) {
      console.log('Error fetching users from MySQL:', err);
      res.status(500).send('Error fetching users from MySQL');
      return;
    }
    res.json(results);
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
