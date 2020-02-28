import { Request, Response, NextFunction } from 'express';
export declare const requireAdmin: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => Promise<void>;
