const express = require('express');

const router = express.Router();
const Movies = require('../models/movies');

router.get('/', async (req, res) => {
  try {
    const result = await Movies.distinct('genre').sort();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
  return true;
});

module.exports = router;
