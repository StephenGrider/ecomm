import { BaseError } from './base-error';

export class NotAuthorizedError extends BaseError {
  code = 401;

  constructor(public message: string = 'Not authorized') {
    super(message);
  }

  handleResponse() {
    return {
      code: this.code,
      errors: [{ message: this.message }]
    };
  }
}
