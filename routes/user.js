const express = require('express');
const { body, validationResult, check } = require('express-validator');

const router = express.Router();
const Users = require('../models/users');

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
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // errormessages
  }
  const newMovie = new Users(req.body);
  try {
    const result = await newMovie.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
  return true;
});
