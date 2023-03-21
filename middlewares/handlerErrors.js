function handleErrors(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const errMessage = err.message || 'На сервере произошла ошибка';

  res.status(statusCode).send({ message: errMessage });

  next();
}

module.exports = { handleErrors };
