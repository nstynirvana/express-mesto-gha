const Card = require('../models/card');
const {
  NotFoundError,
} = require('../errors/errors');
const {
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
  ERROR_CODE_DEFAULT,
} = require('../utils/utils');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    cards.populate('owner');
    return res.status(SUCCESS_CODE_OK).json(cards);
  } catch (e) {
    console.error(e);
    return res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    const card = await Card.create({ name, link, owner: ownerId });
    return res.status(SUCCESS_CODE_CREATED).json(card);
  } catch (e) {
    console.error(e);
    const errors = Object.values(e.errors).map((err) => err.message);
    return res.status(ERROR_CODE_DEFAULT).json({ message: errors.join(', ') });
  }
};

const deleteCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    card.populate('owner');
    if (card === null) {
      return res.status(NotFoundError).json({ message: 'Карточка не найдена' });
    }
    return res.status(SUCCESS_CODE_OK).json(card);
  } catch (e) {
    console.error(e);
    return res.status(ERROR_CODE_DEFAULT).json({ message: 'Произошла ошибка' });
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
    if (card === null) {
      return res.status(NotFoundError).json({ message: 'Карточка не найдена' });
    }
    return res.status(SUCCESS_CODE_OK).json(card);
  } catch (e) {
    console.error(e);
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
    if (card === null) {
      return res.status(NotFoundError).json({ message: 'Карточка не найдена' });
    }
    return res.status(SUCCESS_CODE_OK).json(card);
  } catch (e) {
    console.error(e);
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
