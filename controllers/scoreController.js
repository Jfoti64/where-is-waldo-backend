const { body, validationResult } = require('express-validator');
const Score = require('../models/score');
const asyncHandler = require('express-async-handler');

// Get a list of top 10 scores sorted by time
exports.getScores = asyncHandler(async (req, res, next) => {
  const scoresList = await Score.find().sort({ time: 1 }).limit(10); // Sort by time in ascending order
  if (!scoresList) {
    return res.status(500).json({ message: 'No scores found' });
  }
  res.json(scoresList);
});

// Add score
exports.addScore = [
  body('user_name').trim().isLength({ min: 1 }).escape(),
  body('time').trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const score = new Score({
        user_name: req.body.user_name || 'Anonymous',
        time: req.body.time,
      });

      await score.save();

      res.status(201).json({ score });
    } catch (error) {
      console.error('Error saving score:', error.message, error.stack);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  })
];
