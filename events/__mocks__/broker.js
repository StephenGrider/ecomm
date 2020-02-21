class MockBroker {
  constructor() {
    this.client = {
      publish: jest.fn()
    };
  }
}

module.exports = new MockBroker();
