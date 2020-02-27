import { BaseError, ErrorDescription } from './base-error';
export declare class ValidationError extends Error implements BaseError {
    private errors;
    code: number;
    constructor(message: string, errors: ErrorDescription[]);
    formatErrors(): never[];
    handleResponse(): {
        code: number;
        errors: never[];
    };
}
