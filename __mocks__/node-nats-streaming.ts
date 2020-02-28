import { EventEmitter } from 'events';
import nats, { Stan } from 'node-nats-streaming';

class Subscription extends EventEmitter {
  close = jest.fn();
  unsubscribe = jest.fn();
  closed = false;

  isClosed(): boolean {
    return this.closed;
  }
}

class StanMock extends EventEmitter implements Stan {
  subscriptionOptions = jest.fn().mockReturnValue({
    setStartWithLastReceived: jest
      .fn()
      .mockReturnValue({ start: 'last_received ' })
  });
  close = jest.fn().mockReturnValue(() => new Subscription());
  publish = jest.fn();
  subscribe = jest.fn().mockReturnValue({
    on: jest.fn()
  });
}

export default {
  connect() {
    return new StanMock();
  }
};
