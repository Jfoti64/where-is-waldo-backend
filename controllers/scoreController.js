const { body, validationResult } = require('express-validator');
const Score = require('../models/score');
const asyncHandler = require('express-async-handler');

// Get a list of all scores
exports.getScores = asyncHandler(async (req, res, next) => {
  const scoresList = await Score.find().sort({ score: -1 }).limit(10);
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
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await Score.findOne({ user_name: req.body.user_name });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const score = new Score({
      user_name: req.body.user_name,
      time: req.body.time,
    });

    await score.save();

    res.status(201).json({ score });
  })
];