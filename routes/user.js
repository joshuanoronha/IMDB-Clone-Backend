const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const passport = require('passport');

router.post('/', [
  body('email').isEmail().escape()
    .trim(),
  body('password').isString()
    .trim(),
  passport.authenticate('signup', { session: false }),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({
    message: 'Signup successful',
  });
  return true;
});

module.exports = router;
