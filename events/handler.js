const broker = require('./broker');
const ajv = require('./event-validator');
const PublishValidationError = require('./publish-error');
const tracer = require('../logging/tracer');
const { FORMAT_TEXT_MAP } = require('opentracing');

module.exports = class Handler {
  static handle() {
    const handler = new this();
    handler.listen();

    return handler;
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
    if (!this.eventVersion) {
      throw new Error('Subclasses should assign eventVersion');
    }

    return this.eventVersion;
  }

  getQueueGroupName() {
    if (!this.schema) {
      throw new Error('Subclasses should assign queueGroupName');
    }

    return this.queueGroupName;
  }

  async validateData(data) {
    await ajv.compileAsync(this.schema);

    const valid = ajv.validate(this.schema, data);

    if (!valid) {
      const { errors } = ajv;
      ajv.errors = null;
      return { errors, valid: false };
    }

    return { errors: [], valid: true };
  }

  listen() {
    broker.client
      .subscribe(this.getEventName(), this.getQueueGroupName())
      .on('message', this._handle.bind(this));
  }

  async _handle(message) {
    const event = JSON.parse(message.getData());
    const { errors, valid } = await this.validateData(event);

    const context = tracer.extract(FORMAT_TEXT_MAP, event.context);
    const span = tracer.startSpan(this.eventName, {
      childOf: context
    });

    if (!valid) {
      span.log({ error: errors, event });
      span.finish();
      throw new PublishValidationError(errors);
    }

    try {
      await this.handle(event);
    } catch (err) {
      span.log({ error: err });
    } finally {
      span.finish();
    }
  }
};
