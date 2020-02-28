import { Tracer as _Tracer } from 'opentracing';

class Tracer extends _Tracer {
  startSpan = jest.fn();
  inject = jest.fn();
  extract = jest.fn();
  spanFromRequest = jest
    .fn()
    .mockReturnValue({ log: jest.fn(), finish: jest.fn() });
  spanFromEvent = jest
    .fn()
    .mockReturnValue({ log: jest.fn(), finish: jest.fn() });
  injectEvent = jest.fn().mockImplementation((span: any, context: any) => {
    context['context'] = { context: 1 };
  });
}

export const tracer = new Tracer();
