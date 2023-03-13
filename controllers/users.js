const User = require('../models/user');
const { BadRequestError, NotFoundError } = require('../errors/errors');
const {
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
  ERROR_CODE_DEFAULT,
} = require('../utils/utils');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(SUCCESS_CODE_OK).json(users);
  } catch (err) {
    return res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(SUCCESS_CODE_CREATED).json(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(BadRequestError).json({ message: 'Неверный формат данных' });
    }
    return res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      res.status(NotFoundError).json({ message: 'Пользователь не найден' });
    }
    res.status(SUCCESS_CODE_OK).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(BadRequestError).json({ message: 'Неверный формат данных' });
      return;
    }
    res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res.status(NotFoundError).json({ message: 'Пользователь не найден' });
    }
    return res.status(SUCCESS_CODE_OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(BadRequestError).json({ message: 'Неверный формат данных' });
    }
    return res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res.status(NotFoundError).json({ message: 'Пользователь не найден' });
    }
    return res.status(SUCCESS_CODE_OK).send(user);
  } catch (err) {
    return res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
};
