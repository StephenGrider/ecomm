import { BaseError } from './base-error';

export class NotAuthorizedError extends Error implements BaseError {
  code = 401;

  handleResponse() {
    return {
      code: this.code,
      errors: [{ message: 'You are not authorized to do that' }]
    };
  }
}
