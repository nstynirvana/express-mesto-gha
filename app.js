const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname)));

app.use(bodyParser.json());

app.use(routes);

app.use((req, res, next) => {
  req.user = {
    _id: '64074943b1d6d71b1df57798', //  _id созданного пользователя
  };

  next();
});

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/mestodb', {
  useNewUrlParser: true,
}, () => {
  console.log('Connected to MongoDB!');
  app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`);
  });
});
