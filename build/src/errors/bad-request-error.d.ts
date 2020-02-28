import { BaseError } from './base-error';
export declare class BadRequestError extends BaseError {
    code: number;
    handleResponse(): {
        code: number;
        errors: {
            message: string;
        }[];
    };
}
