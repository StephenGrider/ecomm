import { Request } from 'express';
import { initTracer, Tracer } from 'jaeger-client';
import { FORMAT_HTTP_HEADERS, Span, FORMAT_TEXT_MAP } from 'opentracing';
import { Event } from 'events/event';

declare module 'jaeger-client' {
  export interface Tracer extends JaegerTracer {
    spanFromRequest(name: string, req?: Request): Span;
    spanFromEvent(event: Event): Span;
    injectEvent(span: Span, carrier: any): void;
  }
}

const tracer = initTracer(
  {
    serviceName: process.env.POD_NAME || 'service',
    sampler: {
      type: 'const',
      param: 1
    }
  },
  {}
) as Tracer;

tracer.spanFromRequest = (name: string, req?: Request) => {
  const context = tracer.extract(FORMAT_HTTP_HEADERS, req) || undefined;
  return tracer.startSpan(name, {
    childOf: context
  });
};

tracer.spanFromEvent = (event: Event) => {
  const context = tracer.extract(FORMAT_TEXT_MAP, event.context) || undefined;
  return tracer.startSpan(event.metadata.type, {
    childOf: context
  });
};

tracer.injectEvent = (span: Span, carrier: any) => {
  tracer.inject(span, FORMAT_TEXT_MAP, carrier);
};

export { tracer, Tracer };
