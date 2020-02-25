import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import {
  RequestValidationError,
  NotAuthorizedError,
  BadRequestError,
  NotFoundError
} from '../errors';

module.exports = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof NotFoundError ||
    err instanceof BadRequestError ||
    err instanceof RequestValidationError ||
    err instanceof NotAuthorizedError
  ) {
    const { code, errors } = err.handleResponse();
    return res.status(code).json(errors);
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
