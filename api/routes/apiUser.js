const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected for form ');
});


// Express route to handle form submission and insert new user details
router.post('/user-info', (req, res) => {
  const {
   title, first_name,
    last_name,position, company, arena, employees
  } = req.body;

  const query = `
  INSERT INTO users (title, first_name,
  last_name, position, company, arena, employees)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  db.query(query, [
    title, first_name,
    last_name,position, company, arena, employees
  ], (err, result) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.json({ message: 'User added successfully', id: result.insertId }); // Use res.json
    }
  });
});

module.exports = router;
