module.exports = class NotFound extends Error {
  constructor(message) {
    super();
    this.code = 400;
    this.message = message || 'Not Found';
  }

  handleResponse(res) {
    res.status(400).json({
      errors: [{ message: this.message }]
    });
  }
};
