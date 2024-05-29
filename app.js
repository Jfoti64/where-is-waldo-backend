// /app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const characterRoutes = require('./routes/characterRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/characters', characterRoutes);
app.use('/api/scores', scoreRoutes);

// Connect to MongoDB
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

module.exports = app;
