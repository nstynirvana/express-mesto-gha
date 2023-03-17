const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/AuthError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, 'super-secret-key');
  } catch (err) {
    res.status(AuthError).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  return next();
};

module.exports = auth;
