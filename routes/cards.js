const express = require('express');

const cardRouter = express.Router(); // создали роутер

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId', deleteCardById);
cardRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardRouter; // экспортировали роутер
