const express = require('express');
const { getCharacters, getCharacter, countCharacters } = require('../controllers/characterController');
const router = express.Router();

router.get('/count', countCharacters);
router.get('/', getCharacters);
router.get('/:name', getCharacter);

module.exports = router;
