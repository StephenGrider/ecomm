import { Request, Response, NextFunction } from 'express';
import { FORMAT_HTTP_HEADERS, SpanContext } from 'opentracing';

declare global {
  namespace Express {
    interface Request {
      tracerContext: SpanContext;
    }
  }
}

module.exports = () => {
  return (req: Request, res: Response, next: NextFunction) => {
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

const filterField = <T>(obj: T, name: Extract<keyof T, string>) => {
  const ret = {} as T;

  for (let key in obj) {
    //@ts-ignore
    ret[key] = key === name ? '***' : obj[key];
  }

  return ret;
};
