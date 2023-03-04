const userRouter = require('express').Router(); // создали роутер
const { userSchema } = require('./user.js'); // данные нужны для роутинга, поэтому импортируем их

userRouter.get('/users/:id', (req, res) => {
  if (!userSchema[req.params.id]) {
    res.send(`Такого пользователя не существует`);
    return;
  }
});

userRouter.get('/users', (req, res) => {
  if (!userSchema[req.params.id]) {
    res.send(`Такого пользователя не существует`);
    return;
  }
});

userRouter.post('/users', (req, res) => {
  if (!userSchema[req.params.id]) {
    res.send(`Такого пользователя не существует`);
    return;
  }

  const { name, about, avatar } = userSchema[req.params.id];

  res.send(`Пользователь ${name}, ${about}, ${avatar}`);
});


userRouter.get('/users/:userId', getUserById);
userRouter.get('/users', getUsers);
userRouter.post('/users', createUser);

module.exports = userRouter; // экспортировали роутер