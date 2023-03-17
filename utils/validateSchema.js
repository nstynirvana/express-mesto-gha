function validateSchema(url) {
  const regex = /https?:\/\/(www\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+/i;
  if (regex.test(url)) {
    return url;
  }
  throw new Error('Введен некорректный url');
}

module.exports = { validateSchema };
