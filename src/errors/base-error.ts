export interface ErrorDescription {
  message: string;
  field?: string;
}

export abstract class BaseError extends Error {
  abstract handleResponse(): {
    code: number;
    errors: ErrorDescription[];
  };
}
