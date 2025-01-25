const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

const indexRouter = require('./routers/index');
const messageRouter = require('./routers/message');

// Use routers
app.use('/', indexRouter);
app.use('/new', messageRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});