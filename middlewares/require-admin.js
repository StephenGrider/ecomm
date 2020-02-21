const { NotAuthorizedError } = require('../errors');

module.exports = async (req, res, next) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  if (req.currentUser.role !== 'admin') {
    throw new NotAuthorizedError();
  }

  next();
};
