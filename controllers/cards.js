const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    cards.populate('owner');
    return res.status(200).json(cards);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    const card = await Card.create({ name, link, owner: ownerId });
    return res.status(201).json(card);
  } catch (e) {
    console.error(e);
    const errors = Object.values(e.errors).map((err) => err.message);
    return res.status(500).json({ message: errors.join(', ') });
  }
};

const deleteCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    card.populate('owner');
    if (card === null) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }
    return res.status(200).json(card);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
};
