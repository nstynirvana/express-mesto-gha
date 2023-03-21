const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');

// const { NODE_ENV, JWT_SECRET } = process.env;
const secretKey = 'super-secret-key';

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload;

  return next();
};

module.exports = auth;
