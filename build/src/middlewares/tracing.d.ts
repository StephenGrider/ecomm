import { Request, Response, NextFunction } from 'express';
import { Span } from 'opentracing';
declare global {
    namespace Express {
        interface Request {
            tracerContext: Span;
        }
    }
}
export declare const tracing: () => (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
