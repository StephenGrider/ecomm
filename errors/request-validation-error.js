module.exports = class RequestValidationError extends Error {
  constructor(errors) {
    super();
    this.code = 400;
    this.errors = errors;
  }

  formatErrors() {
    return this.errors.map(err => {
      return {
        field: err.param,
        message: err.msg
      };
    });
  }

  handleResponse(res) {
    res.status(400).json({
      errors: this.formatErrors()
    });
  }
};
