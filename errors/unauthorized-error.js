module.exports = class UnauthorizedError extends Error {
  constructor() {
    super();
    this.code = 401;
  }

  handleResponse(res) {
    res.status(this.code).json({
      errors: [{ message: 'You are not authorized to do that' }]
    });
  }
};
