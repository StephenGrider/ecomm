const uuid = require('uuid/v4');
const ajv = require('./event-validator');
const PublishValidationError = require('./publish-error');
const broker = require('./broker');
const tracer = require('../logging/tracer');
const { FORMAT_TEXT_MAP } = require('opentracing');

module.exports = class Publisher {
  static publish(data, req) {
    const publisher = new this();

    return publisher.publish(data, req);
  }

  getEventName() {
    if (!this.eventName) {
      throw new Error('Subclasses should assign eventName');
    }
    return this.eventName;
  }

  getSchema() {
    if (!this.schema) {
      throw new Error('Subclasses should assign schema');
    }

    return this.schema;
  }

  getEventVersion() {
    if (!this.schema) {
      throw new Error('Subclasses should assign eventVersion');
    }

    return this.eventVersion;
  }

  async validateData(data) {
    await ajv.compileAsync(this.getSchema());

    const valid = ajv.validate(this.getSchema(), data);

    if (!valid) {
      const { errors } = ajv;
      ajv.errors = null;
      return { errors, valid: false };
    }

    return { errors: [], valid: true };
  }

  buildEvent(data) {
    return {
      metadata: {
        type: this.getEventName(),
        version: this.getEventVersion(),
        timestamp: new Date().toISOString(),
        id: uuid()
      },
      data
    };
  }

  async publish(data, { tracerContext }) {
    const event = this.buildEvent(data);

    const { errors, valid } = await this.validateData(event);

    if (!valid) {
      throw new PublishValidationError(errors);
    }

    const span = tracer.startSpan(event.metadata.type, {
      childOf: tracerContext
    });
    span.log({ event });
    event.context = {};
    tracer.inject(span, FORMAT_TEXT_MAP, event.context);

    return new Promise((resolve, reject) => {
      broker.client.publish(
        this.getEventName(),
        JSON.stringify(event),
        (err, guid) => {
          if (err) {
            span.log({ err });
            reject(err);
          }

          span.log({ guid });
          span.finish();
          resolve(guid);
        }
      );
    });
  }
};
