import { Request } from 'express';
import {
  Stan,
  Message,
  SubscriptionOptions as _SubscriptionOptions
} from 'node-nats-streaming';
import { EventEmitter } from 'events';
import { Tracer } from 'logging/tracer';
import { Event } from 'events/event';

interface SubscriptionOptions extends _SubscriptionOptions {
  groupName: string;
}

export class Broker {
  constructor(
    public client: Stan,
    public process: EventEmitter,
    public tracer: Tracer
  ) {
    client.on('connection_lost', this.onClientClose);
    client.on('error', this.closeClient);
    process.on('SIGUSR2', this.closeClient);
  }

  onClientClose = (err: Error) => {
    throw err;
  };

  closeClient = () => {
    this.client.close();
    throw new Error('Broker closed');
  };

  defaultOptions() {
    return this.client
      .subscriptionOptions()
      .setStartWithLastReceived() as SubscriptionOptions;
  }

  on<T>(eventName: string, callback: (data: T, message: Message) => void): void;
  on<T>(
    eventName: string,
    callback: (data: T, message: Message) => void,
    _options?: SubscriptionOptions
  ): void {
    const options = _options || this.defaultOptions();

    const subscription = options.groupName
      ? this.client.subscribe(eventName, options.groupName, options)
      : this.client.subscribe(eventName, options);

    subscription.on('message', (message: Message) => {
      const parsedData = this.parseMessage(message);
      const span = this.tracer.spanFromEvent(parsedData);
      span.log({ eventId: parsedData.metadata.id });

      try {
        callback(parsedData, message);
      } catch (err) {
        span.log({ error: err });
      } finally {
        span.finish();
      }
    });
  }

  private parseMessage(message: Message) {
    const data = message.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }

  publish(event: Event, contextSource?: Request): Promise<string> {
    const span = this.tracer.spanFromRequest(
      event.metadata.type,
      contextSource
    );

    this.tracer.injectEvent(span, event);
    span.log({ event });

    return new Promise((resolve, reject) => {
      this.client.publish(
        event.metadata.type,
        JSON.stringify(event),
        (err, guid) => {
          if (err) {
            span.log({ error: err });
            span.finish();
            return reject(err);
          }

          span.log({ guid });
          span.finish();

          resolve(guid);
        }
      );
    });
  }
}
