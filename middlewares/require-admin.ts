import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors';

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  if (req.currentUser.role !== 'admin') {
    throw new NotAuthorizedError();
  }

  next();
};
