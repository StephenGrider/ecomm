import nats, { Stan, Message } from 'node-nats-streaming';
import { EventEmitter } from 'events';
import { Broker } from 'events/broker';
import { UserCreatedEvent } from 'events/user-created';
import { Event } from 'events/event';
import { tracer } from 'logging/tracer';

jest.mock('logging/tracer');

const createBroker = () => {
  const client = nats.connect('clsuterId', 'clientId', { url: 'url' });
  const _process = new EventEmitter();
  return {
    tracer,
    client,
    _process,
    broker: new Broker(client, _process, tracer)
  };
};

const createUserCreatedEvent = (): UserCreatedEvent => {
  return {
    data: {
      id: '1',
      role: 'user',
      email: 'asdf@asdf.com'
    },
    metadata: {
      type: 'user-created',
      id: '1',
      timestamp: '1'
    },
    context: {}
  };
};

beforeEach(() => {
  jest.clearAllMocks();
});

it('the client losing a connection throws an error', () => {
  const { broker, client } = createBroker();

  expect(() => {
    client.emit('connection_lost');
  }).toThrow();
});

it('when the process emits SIGUSR2 the client closes', () => {
  const { broker, client, _process } = createBroker();

  expect(() => {
    _process.emit('SIGUSR2');
  }).toThrow();

  expect(client.close).toHaveBeenCalled();
});

describe('publishing', () => {
  it('can publish an event', () => {
    const { broker, client } = createBroker();
    const event = createUserCreatedEvent();

    broker.publish(event);

    expect(client.publish).toHaveBeenCalled();

    // @ts-ignore
    const [subject, data] = client.publish.mock.calls[0];
    expect(subject).toEqual('user-created');
    expect(data).toEqual(JSON.stringify(event));
  });

  it('when publishing, it starts a span', () => {
    const { broker, client, tracer } = createBroker();
    const event = createUserCreatedEvent();

    broker.publish(event);

    expect(tracer.spanFromRequest).toHaveBeenCalledWith(
      'user-created',
      undefined
    );
  });

  it('if given some context, it will start the span with context', () => {
    const { broker, client, tracer } = createBroker();
    const event = createUserCreatedEvent();

    // @ts-ignore
    broker.publish(event, {});

    expect(tracer.spanFromRequest).toHaveBeenCalledWith('user-created', {});
  });

  it('injects context into the event', () => {
    const { broker, client, tracer } = createBroker();
    const event = createUserCreatedEvent();
    broker.publish(event);

    expect(event.context).toEqual({ context: 1 });
  });

  it('logs the entire event', () => {
    const { broker, client, tracer } = createBroker();
    const event = createUserCreatedEvent();
    broker.publish(event);

    //@ts-ignore
    const span = tracer.spanFromRequest();

    expect(span.log).toHaveBeenCalledWith({ event });
  });

  it('resolves on successful publish', async () => {
    const { broker, client, tracer } = createBroker();
    const event = createUserCreatedEvent();
    const promise = broker.publish(event);

    //@ts-ignore
    client.publish.mock.calls[0][2](null, 'guid');
    //@ts-ignore
    const span = tracer.spanFromRequest();

    const guid = await promise;
    expect(guid).toEqual('guid');
    expect(span.log).toHaveBeenCalledWith({ guid: 'guid' });
    expect(span.finish).toHaveBeenCalled();
  });

  it('rejects on unsuccessful publish', async () => {
    const { broker, client, tracer } = createBroker();
    const event = createUserCreatedEvent();
    const promise = broker.publish(event);

    //@ts-ignore
    client.publish.mock.calls[0][2]('error message', null);
    //@ts-ignore
    const span = tracer.spanFromRequest();

    let err;
    try {
      await promise;
    } catch (error) {
      err = error;
    }

    expect(err).toEqual('error message');
    expect(span.log).not.toHaveBeenCalledWith({ guid: 'guid' });
    expect(span.log).toHaveBeenCalledWith({ error: 'error message' });
    expect(span.finish).toHaveBeenCalled();
  });
});

describe('handling', () => {
  it('should be able to receive fully decoded messages', done => {
    const { broker, client, tracer } = createBroker();
    const event = createUserCreatedEvent();

    broker.on('user-created', (data: Event, message: Message) => {
      expect(data).toEqual(event);
      expect(message.getSubject()).toEqual('user-created');
      done();
    });

    const message = {
      getSubject: jest.fn().mockReturnValue('user-created'),
      getData: jest.fn().mockReturnValue(JSON.stringify(event))
    };

    // @ts-ignore
    client.subscribe().on.mock.calls[0][1](message);
  }, 200);

  it('should enforce some types', done => {
    const { broker, client, tracer } = createBroker();
    const _event = createUserCreatedEvent();

    broker.on('user-created', (event: UserCreatedEvent, message: Message) => {
      expect(event).toEqual(_event);
      expect(message.getSubject()).toEqual('user-created');

      // This is really a check to make sure TS picks up correct typings
      expect(event.data.email).toBeDefined();
      expect(event.data.id).toBeDefined();
      expect(event.data.role).toBeDefined();

      done();
    });

    const message = {
      getSubject: jest.fn().mockReturnValue('user-created'),
      getData: jest.fn().mockReturnValue(JSON.stringify(_event))
    };

    // @ts-ignore
    client.subscribe().on.mock.calls[0][1](message);
  }, 200);

  it('creates and finishes a span', done => {
    const { broker, client, tracer } = createBroker();
    const _event = createUserCreatedEvent();

    broker.on('user-created', (event: UserCreatedEvent, message: Message) => {
      expect(event).toEqual(_event);
      expect(message.getSubject()).toEqual('user-created');

      //@ts-ignore
      const span = tracer.spanFromEvent();

      expect(span.log).toHaveBeenCalled();

      setImmediate(() => {
        expect(span.finish).toHaveBeenCalled();
        done();
      });
    });

    const message = {
      getSubject: jest.fn().mockReturnValue('user-created'),
      getData: jest.fn().mockReturnValue(JSON.stringify(_event))
    };

    // @ts-ignore
    client.subscribe().on.mock.calls[0][1](message);
  }, 200);
});
