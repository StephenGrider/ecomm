class MockBroker {
  client = {
    //@ts-ignore
    publish: jest.fn()
  };
}

export const broker = new MockBroker();
