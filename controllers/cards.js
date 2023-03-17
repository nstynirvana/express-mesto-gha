const Card = require('../models/card');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/errors');
const {
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
  ERROR_CODE_DEFAULT,
} = require('../utils/utils');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(SUCCESS_CODE_OK).send(cards);
  } catch (err) {
    res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    const card = await Card.create({ name, link, owner: ownerId });
    res.status(SUCCESS_CODE_CREATED).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      throw new BadRequestError('Неверный формат данных');
    }
    res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

const deleteCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId).populate('owner');

    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    const ownerId = card.owner.id;
    const userId = req.user._id;

    if (ownerId !== userId) {
      throw new ForbiddenError('Нельзя удалить чужую карточку');
    }
    await card.remove();
    res.status(SUCCESS_CODE_OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      throw new BadRequestError('Неверный формат данных');
    }
    res.status(err.statusCode).send({ message: err.message });
  }
};

const likeCard = async (req, res) => {
  try {
    const userId = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.status(SUCCESS_CODE_OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      throw new BadRequestError('Неверный формат данных');
    }
    return res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const userId = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.status(SUCCESS_CODE_OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      throw new BadRequestError('Неверный формат данных');
    }
    return res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
