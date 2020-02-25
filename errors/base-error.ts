export interface ErrorDescription {
  message: string;
  field?: string;
}

export abstract class BaseError {
  abstract handleResponse(): {
    code: number;
    errors: ErrorDescription[];
  };
}
