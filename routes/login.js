const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const { jwtKey } = require('../config/config');

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
          throw new Error('Authentication Failed');
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);
            const resp = { email: user.email };
            const token = jwt.sign({ user: resp }, jwtKey);

            return res.json({ token });
          },
        );
      } catch (error) {
        return res.status(401).json({ error: 'Authentication Failed for User' });
      }
      return true;
    },
  )(req, res, next);
  return true;
});

module.exports = router;
