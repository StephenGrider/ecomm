import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (JWT_KEY: string) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session) {
    return next();
  }
  if (!req.session.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, JWT_KEY) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
