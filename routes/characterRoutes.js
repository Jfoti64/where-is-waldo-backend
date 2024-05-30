// /routes/characterRoutes.js
const express = require('express');
const { getCharacters, getCharacter } = require('../controllers/characterController');
const router = express.Router();

router.get('/', getCharacters);
router.get('/:name', getCharacter);

module.exports = router;
