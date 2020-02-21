const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

const KEY = 'key';

module.exports = async (req, res, next) => {
  if (!req.currentUser) {
    throw new UnauthorizedError();
  }

  next();
};
