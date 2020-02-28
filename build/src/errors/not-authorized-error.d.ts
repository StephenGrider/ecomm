import { BaseError } from './base-error';
export declare class NotAuthorizedError extends BaseError {
    message: string;
    code: number;
    constructor(message?: string);
    handleResponse(): {
        code: number;
        errors: {
            message: string;
        }[];
    };
}
