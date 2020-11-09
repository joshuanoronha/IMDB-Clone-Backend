const express = require('express');

const router = express.Router();
const Movies = require('../models/movies');

router.get('/', async (req, res) => {
  try {
    const result = await Movies.distinct('genre').sort();
    const genres = [];
    result.map((genre) => {
      if (!genres.includes(genre.trim())) {
        genres.push(genre.trim());
      }
      return true;
    });
    res.send(genres);
  } catch (error) {
    res.send(error);
  }
  return true;
});

module.exports = router;
