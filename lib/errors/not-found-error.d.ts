import { BaseError } from './base-error';
export declare class NotFoundError extends BaseError {
    code: number;
    handleResponse(): {
        code: number;
        errors: {
            message: string;
        }[];
    };
}
