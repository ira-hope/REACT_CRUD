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
  console.log('MySQL connected for form 2');
});

// Express route to fetch all user details
router.get('/user-details', (req, res) => {
  const query = 'SELECT * FROM details';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user details:', err);
      res.status(500).send({ error: 'Error fetching user details' });
    } else {
      res.json(results); // Use res.json to send JSON response
    }
  });
});

// Express route to update user details
router.put('/user-details/:id', (req, res) => {
  const userId = req.params.id;
  const {
     street, additionalInfo,
    zipCode, place, country, code, phoneNumber, email,
    termsAndConditions
  } = req.body;

  const query = `
  UPDATE details
   street=?, additional_info=?, 
  zip_code=?, place=?, country=?, code=?, phone_number=?, email=?, 
  terms_and_conditions=?
  WHERE id=?
`;

  db.query(query, [
     street, additionalInfo,
    zipCode, place, country, code, phoneNumber, email,
    termsAndConditions, userId
  ], (err, result) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.json({ message: 'User details updated successfully' }); // Use res.json
    }
  });
});

// Express route to delete user details
router.delete('/user-details/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM details WHERE id=?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.json({ message: 'User deleted successfully' }); // Use res.json
    }
  });
});

// Express route to handle form submission and insert new user details
router.post('/user-details', (req, res) => {
  const {
   street, additionalInfo,
    zipCode, place, country, code, phoneNumber, email,
    termsAndConditions
  } = req.body;

  const query = `
  INSERT INTO details (street, additional_info,
    zip_code, place, country, code, phone_number, email,
    terms_and_conditions)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  db.query(query, [
     street, additionalInfo,
    zipCode, place, country, code, phoneNumber, email,
    termsAndConditions
  ], (err, result) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.json({ message: 'User details added successfully', id: result.insertId }); // Use res.json
    }
  });
});

module.exports = router;
