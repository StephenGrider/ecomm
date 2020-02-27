import { BaseError } from './base-error';

export class NotFoundError extends BaseError {
  code = 400;

  handleResponse() {
    return {
      code: this.code,
      errors: [{ message: this.message || 'Not Found' }]
    };
  }
}
