module.exports = class ValidationError extends Error {
  constructor(message, errors) {
    super();
    this.code = 400;
    this.message = message;
    this.errors = errors;
  }

  formatErrors() {
    return this.errors.map(err => {
      const formatted = { message: err.message };
      const field = err.dataPath.replace('/', '');

      return field ? { ...formatted, field } : formatted;
    });
  }

  handleResponse(res) {
    res.status(this.code).json({
      errors: this.formatErrors()
    });
  }
};
