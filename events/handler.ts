import { FORMAT_TEXT_MAP } from 'opentracing';
import { Message } from 'node-nats-streaming';
import { broker } from './broker';
import { tracer } from '../logging/tracer';
import { Event } from './schema/common/v1/event';

export abstract class Handler<T> {
  abstract eventName: string;
  abstract eventVersion: string;
  abstract queueGroupName: string;
  abstract handle(event: Event<T>): any;

  subscribe() {
    if (!broker.client) {
      throw new Error('Cannot subscribe yet, client not available');
    }

    return broker.client
      .subscribe(this.eventName, this.queueGroupName)
      .on('message', this._handle.bind(this));
  }

  async _handle(message: Message) {
    const event: Event<T> = JSON.parse(message.getData().toString('utf8'));

    const context = tracer.extract(FORMAT_TEXT_MAP, event.context);
    const span = tracer.startSpan(this.eventName, {
      childOf: context || undefined
    });

    try {
      await this.handle(event);
    } catch (err) {
      span.log({ error: err });
    } finally {
      span.finish();
    }
  }
}
