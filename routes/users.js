const express = require('express');

const userRouter = express.Router(); // создали роутер

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getInfoUser,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getInfoUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);
userRouter.get('/:userId', getUserById);

module.exports = userRouter; // экспортировали роутер
