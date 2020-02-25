import { BaseError } from './base-error';

export class BadRequestError extends Error implements BaseError {
  code = 400;

  handleResponse() {
    return {
      code: this.code,
      errors: [
        {
          message: this.message
        }
      ]
    };
  }
}
