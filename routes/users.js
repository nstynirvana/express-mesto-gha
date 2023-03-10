const express = require('express');

const userRouter = express.Router(); // создали роутер

const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);
userRouter.get('/:userId', getUserById);

module.exports = userRouter; // экспортировали роутер
