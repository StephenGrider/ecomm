"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jaeger_client_1 = require("jaeger-client");
var opentracing_1 = require("opentracing");
var tracer = jaeger_client_1.initTracer({
    serviceName: process.env.POD_NAME || 'service',
    sampler: {
        type: 'const',
        param: 1
    }
}, {});
exports.tracer = tracer;
tracer.spanFromRequest = function (name, req) {
    var context = tracer.extract(opentracing_1.FORMAT_HTTP_HEADERS, req) || undefined;
    return tracer.startSpan(name, {
        childOf: context
    });
};
tracer.spanFromEvent = function (event) {
    var context = tracer.extract(opentracing_1.FORMAT_TEXT_MAP, event.context) || undefined;
    return tracer.startSpan(event.metadata.type, {
        childOf: context
    });
};
tracer.injectEvent = function (span, carrier) {
    tracer.inject(span, opentracing_1.FORMAT_TEXT_MAP, carrier);
};
