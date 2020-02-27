export interface ErrorDescription {
    message: string;
    field?: string;
}
export declare abstract class BaseError extends Error {
    abstract handleResponse(): {
        code: number;
        errors: ErrorDescription[];
    };
}
