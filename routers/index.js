const express = require('express');
const router = express.Router();

// GET route for the homepage to show all messages
router.get('/', (req, res) => {
  const query = 'SELECT * FROM messages ORDER BY added DESC';
  req.client.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching messages:', err);
      return res.status(500).send('Error fetching messages');
    }

    // Pass title and messages to the view
    res.render('index', { title: 'Mini Message Board', messages: result.rows });
  });
});

// GET route to show the form for creating a new message
router.get('/new', (req, res) => {
  res.render('newMessage', { title: 'New Message' });
});

// POST route to handle form submission and insert into the database
router.post('/new', (req, res) => {
  const { user, text } = req.body;

  // Ensure the column 'user' is quoted since it's a reserved word
  const query = 'INSERT INTO messages ("user", text) VALUES ($1, $2)';
  
  req.client.query(query, [user, text], (err, result) => {
    if (err) {
      console.error('Error inserting message:', err);
      res.status(500).send('Error saving message');
    } else {
      // After saving, redirect to the home page (or wherever you want)
      res.redirect('/');
    }
  });
});

module.exports = router;