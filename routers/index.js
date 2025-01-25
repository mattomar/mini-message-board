const express = require('express');
const router = express.Router();

// Sample messages array
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];
router.use(express.urlencoded({ extended: true }));

// Index route
router.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

router.post('/new', (req, res) => {
  const { user, text } = req.body;

  // Add the message to the array
  messages.push({
    text: text, // or simply `text`
    user: user, // or simply `user`
    added: new Date()
  });

  console.log('Messages:', messages);

  // Redirect back to the form page or another route
  res.redirect('/');
});


module.exports = router;