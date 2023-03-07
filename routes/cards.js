const express = require('express');

const cardRouter = express.Router(); // создали роутер

const {
  getCards,
  createCard,
  deleteCardById,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/cards/:cardId', deleteCardById);

module.exports = cardRouter; // экспортировали роутер
