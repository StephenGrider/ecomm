import { Request } from 'express';
import { Tracer } from 'jaeger-client';
import { Span } from 'opentracing';
import { Event } from 'events/event';
declare module 'jaeger-client' {
    interface Tracer extends JaegerTracer {
        spanFromRequest(name: string, req?: Request): Span;
        spanFromEvent(event: Event): Span;
        injectEvent(span: Span, carrier: any): void;
    }
}
declare const tracer: Tracer;
export { tracer, Tracer };
