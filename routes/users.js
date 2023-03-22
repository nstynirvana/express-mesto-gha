const express = require('express');

const userRouter = express.Router(); // создали роутер

const { celebrate, Joi } = require('celebrate');

const { validateSchema } = require('../utils/validateSchema');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getInfoUser,
} = require('../controllers/users');

userRouter.get('/', getUsers);

userRouter.get('/me', getInfoUser);

userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

userRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateSchema),
    }),
  }),
  updateAvatar,
);

userRouter.patch(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);

module.exports = userRouter; // экспортировали роутер
