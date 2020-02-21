const { FORMAT_HTTP_HEADERS } = require('opentracing');

module.exports = serviceName => {
  const tracer = require('../logging/tracer');

  return (req, res, next) => {
    const { headers, path, url, method, body, query, params } = req;

    const context = tracer.extract(FORMAT_HTTP_HEADERS, headers);
    const span = tracer.startSpan(req.url, { childOf: context });

    req.tracerContext = span;
    span.setTag('http.request.url', url);
    span.setTag('http.request.method', method);
    span.setTag('http.request.path', path);
    span
      .log({ body: filterField(body, 'password') })
      .log({ query: filterField(query, 'password') })
      .log({ params: filterField(params, 'password') });

    tracer.inject(span, FORMAT_HTTP_HEADERS, headers);
    req.headers = headers;

    res.once('finish', () => {
      span.setTag('http.response.status_code', res.statusCode);
      span.setTag('http.response.status_message', res.statusMessage);
      span.finish();
    });

    next();
  };
};

const filterField = (obj, name) => {
  const ret = {};

  for (let key in obj) {
    ret[key] = key === name ? '***' : obj[key];
  }

  return ret;
};
