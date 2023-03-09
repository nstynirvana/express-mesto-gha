const User = require('../models/user');
const {
  NotFoundError,
} = require('../errors/errors');
const {
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
  ERROR_CODE_DEFAULT,
} = require('../utils/utils');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(SUCCESS_CODE_OK).json(users);
  } catch (e) {
    console.error(e);
    return res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(SUCCESS_CODE_CREATED).json(user);
  } catch (e) {
    console.error(e);
    const errors = Object.values(e.errors).map((err) => err.message);
    return res.status(ERROR_CODE_DEFAULT).json({ message: errors.join(', ') });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user === null) {
      return res.status(NotFoundError).json({ message: 'Пользователь не найден' });
    }
    return res.status(SUCCESS_CODE_OK).json(user);
  } catch (e) {
    console.error(e);
    return res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true },
    );
    if (user === null) {
      return res.status(NotFoundError).json({ message: 'Пользователь не найден' });
    }
    return res.status(SUCCESS_CODE_OK).json(user);
  } catch (e) {
    console.error(e);
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
      { new: true },
    );
    if (user === null) {
      return res.status(NotFoundError).json({ message: 'Пользователь не найден' });
    }
    return res.status(SUCCESS_CODE_OK).json(user);
  } catch (e) {
    console.error(e);
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
