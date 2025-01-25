const express = require('express');
const app = express();
const pg = require('pg');
const fs = require('fs');
const dotenv = require('dotenv');  // To load environment variables
const PORT = process.env.PORT || 3001;

// Load environment variables from .env file
dotenv.config();

app.use(express.urlencoded({ extended: true }));

// Database connection config using environment variables
const config = {
  user: process.env.DB_USER,  // Use environment variables
  password: process.env.DB_PASSWORD, 
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('./routers/ca.pem').toString(),  // Ensure the certificate file path is correct
  },
};

// Create the PostgreSQL client and connect
const client = new pg.Client(config);
client.connect((err) => {
  if (err) {
    console.error('Connection Error:', err);
    process.exit(1);  // Exit process on error
  }
  console.log('Connected to the database');
});

// Set view engine
app.set('view engine', 'ejs');

// Import routers
const indexRouter = require('./routers/index');

// Pass client to the router
app.use((req, res, next) => {
  req.client = client;  // Make client available to all routes
  next();
});

// Use routers
app.use('/', indexRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});