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

app.use((req, res, next) => {
  req.user = {
    _id: '640dcbf5c30fc0798b14d2a8', //  _id созданного пользователя
  };

  next();
});

mongoose.set('strictQuery', true);
mongoose.connect(
  'mongodb://127.0.0.1:27017/mestodb',
  {
    useNewUrlParser: true,
  },
  () => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, () => {
      // Если всё работает, консоль покажет, какой порт приложение слушает
      console.log(`App listening on port ${PORT}`);
    });
  },
);

app.use(routes);
