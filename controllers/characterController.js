const Character = require('../models/character');
const asyncHandler = require('express-async-handler');

// Get a list of all characters by and their coordinates
exports.getCharacters = asyncHandler(async (req, res, next) => {
  const characterList = await Character.find();
  if (!characterList) {
    return res.status(500).json({ message: 'No characters found' });
  }
  res.json(characterList);
});