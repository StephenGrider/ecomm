import { initTracer } from 'jaeger-client';

export const tracer = initTracer(
  {
    serviceName: process.env.POD_NAME || 'service',
    sampler: {
      type: 'const',
      param: 1
    }
  },
  {}
);
