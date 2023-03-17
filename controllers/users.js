const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  BadRequestError,
  NotFoundError,
  AuthError,
} = require('../errors/errors');
const {
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
  ERROR_CODE_DEFAULT,
} = require('../utils/utils');

const login = (req, res) => {
  const { email, password } = req.body;
  let userId;
  try {
    User.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          throw new AuthError('Неправильный мейл или пароль');
        }
        userId = user._id;
        return bcrypt.compare(password, user.password);
      })
      .then((matched) => {
        if (!matched) {
          throw new AuthError('Неправильный мейл или пароль');
        }
        const token = jwt.sign({ _id: userId }, NODE_ENV ? JWT_SECRET : 'super-secret-key', { expiresIn: '7d' });
        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        });

        return res.status(SUCCESS_CODE_OK).send({ token });
      });
  } catch (err) {
    res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(SUCCESS_CODE_OK).json(users);
  } catch (err) {
    return res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    User.create({
      email, password: hashPassword, name, about, avatar,
    });
    return res.status(SUCCESS_CODE_CREATED).send({
      email, name, about, avatar,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      throw new BadRequestError('Неверный формат данных');
    }
    return res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.status(SUCCESS_CODE_OK).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      throw new BadRequestError('Неверный формат данных');
    }
    res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

const getInfoUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    res.status(SUCCESS_CODE_OK).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      throw new BadRequestError('Неверный формат данных');
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
      throw new NotFoundError('Пользователь не найден');
    }
    return res.status(SUCCESS_CODE_OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      throw new BadRequestError('Неверный формат данных');
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
      throw new NotFoundError('Пользователь не найден');
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
  login,
  getInfoUser,
};
