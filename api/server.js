
// Import required modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3006;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL database connected');
});

// Route to handle user details registration
app.post('/api/user-details', (req, res) => {
  const { title, firstName, lastName, position, company, businessArena, employees } = req.body;
  
  const sql = 'INSERT INTO users (title, first_name, last_name, position, company, business_arena, employees) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [title, firstName, lastName, position, company, businessArena, employees], (err, result) => {
    if (err) {
      console.error('Error inserting user details:', err);
      res.status(500).json({ error: 'Error inserting user details' });
    } else {
      console.log('User details inserted:', result.insertId);
      res.status(201).json({ message: 'User details inserted successfully', userId: result.insertId });
    }
  });
});

// Route to handle insertion of contact details
app.post('/api/contact-details', (req, res) => {
  const { userId } = req.params;
  const { street, additionalInfo, zipCode, place, country, code, phoneNumber, email, termsAndConditions } = req.body;
  
  const sql = 'INSERT INTO contact_details (user_id, street, additional_info, zip_code, place, country, code, phone_number, email, terms_and_conditions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [userId, street, additionalInfo, zipCode, place, country, code, phoneNumber, email, termsAndConditions];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting contact details:', err);
      return res.status(500).json({ error: 'Error inserting contact details' });
    }

    console.log('Contact details inserted:', result.insertId);
    res.status(201).json({ message: 'Contact details inserted successfully' });
  });
});

// Route to fetch contact details by user ID
app.get('/api/contact-details/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT * FROM contact_details WHERE user_id = ?';
  db.query(sql, userId, (err, results) => {
    if (err) {
      console.error('Error fetching contact details:', err);
      res.status(500).json({ error: 'Error fetching contact details' });
    } else {
      res.status(200).json(results);
    }
  });
});



// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

