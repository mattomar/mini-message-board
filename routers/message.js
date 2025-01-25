const express = require('express');
const router = express.Router();

// GET route for the "New Message" form
router.get('/', (req, res) => {
  res.render('form', { title: 'New Message' });
});

module.exports = router;