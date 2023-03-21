const Card = require('../models/card');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/errors');
const {
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
} = require('../utils/utils');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(SUCCESS_CODE_OK).send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    const card = await Card.create({ name, link, owner: ownerId });
    res.status(SUCCESS_CODE_CREATED).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Неверный формат данных'));
    } else {
      next(err);
    }
  }
};

const deleteCardById = async (req, res, next) => {
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
      next(new BadRequestError('Неверный формат данных'));
    } else {
      next(err);
    }
  }
};

const likeCard = async (req, res, next) => {
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
    res.status(SUCCESS_CODE_OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неверный формат данных'));
    } else {
      next(err);
    }
  }
};

const dislikeCard = async (req, res, next) => {
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
    res.status(SUCCESS_CODE_OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неверный формат данных'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
