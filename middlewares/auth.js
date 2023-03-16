const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/AuthError');

const auth = (req, res, next) => {
  const { authorization } = req.cookies;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(AuthError).send({ message: 'Необходима авторизация' });
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'supersecretkey');
  } catch (err) {
    res.status(AuthError).send({ message: 'Необходима авторизация' });
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};

module.exports = auth;
