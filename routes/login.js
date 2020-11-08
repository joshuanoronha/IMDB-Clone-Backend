const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const secrets = require('../config/secrets');

const router = express.Router();

router.post('/', [
  body('email').isEmail().escape()
    .trim(),
  body('password').isString(),
],
async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  passport.authenticate(
    'login',
    async (err, user) => {
      try {
        if (err || !user) {
          const error = new Error('An error occurred.');

          return next(error);
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);
            const resp = { email: user.email };
            const token = jwt.sign({ user: resp }, secrets.fetchKey('jwt'));

            return res.json({ token });
          },
        );
      } catch (error) {
        return next(error);
      }
      return true;
    },
  )(req, res, next);
  return true;
});

module.exports = router;
