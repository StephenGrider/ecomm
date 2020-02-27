import { Request, Response, NextFunction } from 'express';
export declare const errorHandler: (err: Error, req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => Response | undefined;
