const {
  ValidationError,
  BadRequest,
  RequestValidationError,
  UnauthorizedError
} = require('../errors');
const mongoose = require('mongoose');

module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return err.handleResponse(res);
  }

  if (err instanceof BadRequest) {
    return err.handleResponse(res);
  }

  if (err instanceof RequestValidationError) {
    return err.handleResponse(res);
  }

  if (err instanceof UnauthorizedError) {
    return err.handleResponse(res);
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const errors = [];
    for (let key in err.errors) {
      errors.push({
        field: key,
        message: err.errors[key].message
      });
    }
    return res.status(400).json({
      errors: errors
    });
  }

  console.error('UnhandledError', err);

  res.status(500).json({
    errors: [{ message: 'Server Error' }]
  });
};
