const router = require('express').Router(); // создали роутер
const {
  getUsers,
  createUser,
  getUserById,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);

module.exports = router; // экспортировали роутер
