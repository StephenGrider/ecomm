import { Request, Response, NextFunction } from 'express';
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
export declare const currentUser: (JWT_KEY: string) => (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => Promise<void>;
export {};
