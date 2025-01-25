const express = require('express');
const pg = require('pg');
const fs = require('fs');
const dotenv = require('dotenv');  // To load environment variables

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));

// Database connection config using environment variables
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('./routers/ca.pem').toString(),  // Correct path
  },
};

// Create PostgreSQL client and connect
const client = new pg.Client(config);
client.connect((err) => {
  if (err) {
    console.error('Connection Error:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});

// Set view engine
app.set('view engine', 'ejs');

// Import routers
const indexRouter = require('./routers/index');

// Pass client to the router
app.use((req, res, next) => {
  req.client = client;
  next();
});

app.use('/', indexRouter);

// Export app for Vercel to handle as a serverless function
module.exports = app;