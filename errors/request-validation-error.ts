import { ValidationError } from 'express-validator';
import { BaseError } from './base-error';

export class RequestValidationError extends Error implements BaseError {
  code = 400;

  constructor(private errors: ValidationError[]) {
    super('Validation Error');
  }

  formatErrors() {
    return this.errors.map(err => {
      return {
        field: err.param,
        message: err.msg
      };
    });
  }

  handleResponse() {
    return {
      code: this.code,
      errors: this.formatErrors()
    };
  }
}
