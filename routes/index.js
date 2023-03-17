const routes = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

routes.post('/signin', login);
routes.post('/signup', createUser);

routes.use(auth);

routes.use('/users', userRouter);
routes.use('/cards', cardRouter);

module.exports = routes;
