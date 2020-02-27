import { Request } from 'express';
import { v4 as uuid } from 'uuid';
import { FORMAT_TEXT_MAP, FORMAT_HTTP_HEADERS } from 'opentracing';
import { broker } from './broker';
import { tracer } from '../logging/tracer';
import { Event } from './schema/common/v1/event';

export interface EventOptions {
  req?: Request;
}

export abstract class Publisher<T> {
  abstract eventName: string;
  abstract eventVersion: string;

  constructor(private data: T, private options: EventOptions = {}) {}

  buildContext() {
    const req = this.options;

    if (req) {
      return tracer.extract(FORMAT_HTTP_HEADERS, req) || undefined;
    }
  }

  buildEvent(): Event {
    return {
      data: this.data,
      metadata: {
        type: this.eventName,
        version: this.eventVersion,
        timestamp: new Date().toISOString(),
        id: uuid()
      },
      context: {}
    };
  }

  async publish(): Promise<void> {
    const span = tracer.startSpan(this.eventName, {
      childOf: this.buildContext()
    });

    const event = this.buildEvent();

    event.context = {};
    tracer.inject(span, FORMAT_TEXT_MAP, event.context);

    span.log({ event });

    return new Promise((resolve, reject) => {
      if (!broker.client) {
        return;
      }

      broker.client.publish(
        this.eventName,
        JSON.stringify(event),
        (err, guid) => {
          if (err) {
            span.log({ err });
            reject(err);
          }

          span.log({ guid });
          span.finish();

          resolve();
        }
      );
    });
  }
}
