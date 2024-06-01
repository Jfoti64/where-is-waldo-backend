// /app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const characterRoutes = require('./routes/characterRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
require('dotenv').config();
const compression = require("compression");
const helmet = require("helmet");

const app = express();

// Set up rate limiter: maximum of 40 requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 40,
});
// Apply rate limiter to all requests
app.use(limiter);

// Middleware
app.use(compression()); // Compress all routes

// Update CORS options to allow Netlify domain
const corsOptions = {
  origin: 'https://jfoti64-where-is-waldo.netlify.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());
// Set CSP headers to allow our Bootstrap and Jquery to be served
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);

// Routes
app.use('/api/characters', characterRoutes);
app.use('/api/scores', scoreRoutes);

// Connect to MongoDB
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

module.exports = app;
