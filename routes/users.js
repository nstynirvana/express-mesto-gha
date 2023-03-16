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
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);
userRouter.get('/:userId', getUserById);
userRouter.get('/me', getInfoUser);

module.exports = userRouter; // экспортировали роутер
