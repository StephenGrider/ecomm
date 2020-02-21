module.exports = class BadRequest extends Error {
  constructor(message) {
    super();
    this.code = 400;
    this.message = message;
  }

  handleResponse(res) {
    res.status(400).json({
      errors: [{ message: this.message }]
    });
  }
};
