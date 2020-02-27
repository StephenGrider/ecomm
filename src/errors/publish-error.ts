import { BaseError } from './base-error';

export class PublishError extends BaseError {
  code = 500;

  handleResponse() {
    return {
      code: this.code,
      errors: [{ message: this.message || 'Error publishing event' }]
    };
  }
}
