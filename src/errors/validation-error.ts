import { BaseError, ErrorDescription } from './base-error';

export class ValidationError extends Error implements BaseError {
  code = 401;

  constructor(message: string, private errors: ErrorDescription[]) {
    super(message);
  }

  formatErrors() {
    // return this.errors.map(err => {
    //   const formatted = { message: err.message };
    //   const field = err.dataPath.replace('/', '');

    //   return field ? { ...formatted, field } : formatted;
    // });
    return [];
  }

  handleResponse() {
    return {
      code: this.code,
      errors: this.formatErrors()
    };
  }
}
