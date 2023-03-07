const express = require('express');

const userRouter = express.Router(); // создали роутер

const {
  getUsers,
  createUser,
  getUserById,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.post('/', createUser);
userRouter.get('/:id', getUserById);

module.exports = userRouter; // экспортировали роутер
