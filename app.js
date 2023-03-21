const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { handleErrors } = require('./middlewares/handlerErrors');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname)));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(errors());

app.use(handleErrors);

mongoose.set('strictQuery', true);
mongoose.connect(
  'mongodb://127.0.0.1:27017/mestodb',
  {
    useNewUrlParser: true,
  },
  () => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  },
);

app.use(routes);
