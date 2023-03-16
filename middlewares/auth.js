const jsonwebtoken = require('jsonwebtoken');
const { AuthError } = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const { jwt } = req.cookies;

  if (!jwt) {
    next(new AuthError('Неверный email или пароль'));
    return;
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(jwt, NODE_ENV ? JWT_SECRET : 'secretkey');
  } catch (err) {
    throw new AuthError('Неверный email или пароль');
  }

  req.user = payload;
  next();
}

module.exports = { auth };
