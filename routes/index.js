const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateSchema } = require('../utils/validateSchema');

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

routes.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateSchema),
    }),
  }),
  createUser,
);

routes.use(auth);

routes.use('/users', userRouter);
routes.use('/cards', cardRouter);

module.exports = routes;
