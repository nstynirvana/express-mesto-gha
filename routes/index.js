const routes = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');

routes.use('/users', auth, userRouter);
routes.use('/cards', auth, cardRouter);
routes.post('/signin', login);
routes.post('/signup', createUser);

module.exports = routes;
