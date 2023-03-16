const { ERROR_UNAUTHORIZATED } = require('../utils/utils'); // 401

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNAUTHORIZATED;
  }
}

module.exports = AuthError;
