"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var opentracing_1 = require("opentracing");
var tracer_1 = require("../logging/tracer");
exports.tracing = function () {
    return function (req, res, next) {
        var headers = req.headers, path = req.path, url = req.url, method = req.method, body = req.body, query = req.query, params = req.params;
        var context = tracer_1.tracer.extract(opentracing_1.FORMAT_HTTP_HEADERS, headers);
        var span = tracer_1.tracer.startSpan(req.url, { childOf: context || undefined });
        req.tracerContext = span;
        span.setTag('http.request.url', url);
        span.setTag('http.request.method', method);
        span.setTag('http.request.path', path);
        span
            .log({ body: filterField(body, 'password') })
            .log({ query: filterField(query, 'password') })
            .log({ params: filterField(params, 'password') });
        tracer_1.tracer.inject(span, opentracing_1.FORMAT_HTTP_HEADERS, headers);
        req.headers = headers;
        res.once('finish', function () {
            span.setTag('http.response.status_code', res.statusCode);
            span.setTag('http.response.status_message', res.statusMessage);
            span.finish();
        });
        next();
    };
};
var filterField = function (obj, name) {
    var ret = {};
    for (var key in obj) {
        //@ts-ignore
        ret[key] = key === name ? '***' : obj[key];
    }
    return ret;
};
