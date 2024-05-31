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

// Count the number of characters
exports.countCharacters = asyncHandler(async (req, res, next) => {
  const count = await Character.countDocuments();
  res.json({ count });
});

// Get a character by their name
exports.getCharacter = asyncHandler(async (req, res, next) => {
  const character = await Character.findOne({ name: req.params.name });
  if (!character) {
    return res.status(500).json({ message: 'No character found' });
  }
  res.json(character);
});
