// /routes/scoreRoutes.js
const express = require('express');
const { getScores, addScore } = require('../controllers/scoreController');
const router = express.Router();

router.get('/', getScores);
router.post('/', addScore);

module.exports = router;
