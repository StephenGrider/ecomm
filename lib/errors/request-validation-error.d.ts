import { ValidationError } from 'express-validator';
import { BaseError } from './base-error';
export declare class RequestValidationError extends BaseError {
    private errors;
    code: number;
    constructor(errors: ValidationError[]);
    formatErrors(): {
        field: string;
        message: any;
    }[];
    handleResponse(): {
        code: number;
        errors: {
            field: string;
            message: any;
        }[];
    };
}
