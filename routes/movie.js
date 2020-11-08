const express = require('express');
const {
  body, validationResult, check, param,
} = require('express-validator');
const passport = require('passport');
const Movies = require('../models/movies');

const router = express.Router();

router.post('/', [
  body('99popularity').isNumeric().escape()
    .trim(),
  body('director').isString().escape()
    .trim(),
  body('genre').isArray(),
  check('genre.*').optional().isString().escape()
    .trim(),
  body('imdb_score').isNumeric().escape(),
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
  body('99popularity').isNumeric().escape()
    .trim(),
  body('director').isString().escape()
    .trim(),
  body('genre').isArray(),
  check('genre.*').isString().escape()
    .trim(),
  body('imdb_score').isNumeric().escape(),
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

router.get('/:id', [
  param('id').isString().escape()
    .trim(),
  // passport.authenticate('jwt', { session: false }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  try {
    const result = await Movies.findById(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
  return true;
});
module.exports = router;
