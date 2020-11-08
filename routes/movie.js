const express = require('express');
const { body, validationResult, check } = require('express-validator');
const passport = require('passport');
const Movies = require('../models/movies');

const router = express.Router();

router.post('/', [
  body('99popularity').optional().isNumeric().escape()
    .trim(),
  body('director').optional().isString().escape()
    .trim(),
  body('genre').optional().isArray(),
  check('genre.*').optional().isString().escape()
    .trim(),
  body('imdb_score').optional().isNumeric().escape(),
  body('name').isString().escape().trim(),
  passport.authenticate('jwt', { session: false }),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newMovie = new Movies(req.body);
  try {
    const result = await newMovie.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
  return true;
});

router.put('/', [
  body('99popularity').optional().isNumeric().escape()
    .trim(),
  body('director').optional().isString().escape()
    .trim(),
  body('genre').optional().isArray(),
  check('genre.*').optional().isString().escape()
    .trim(),
  body('imdb_score').optional().isNumeric().escape(),
  body('id').isString().escape(),
  passport.authenticate('jwt', { session: false }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.body;
  delete req.body.id;
  delete req.body.name;
  try {
    const result = await Movies.findByIdAndUpdate(id, req.body);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
  return true;
});

module.exports = router;
