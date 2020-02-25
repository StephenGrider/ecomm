import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors';

module.exports = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
