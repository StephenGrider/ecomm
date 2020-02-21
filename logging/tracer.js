const initTracer = require('jaeger-client').initTracer;

module.exports = initTracer({
  serviceName: process.env.POD_NAME || 'service',
  sampler: {
    type: 'const',
    param: 1
  }
});
