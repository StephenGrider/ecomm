"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jaeger_client_1 = require("jaeger-client");
exports.tracer = jaeger_client_1.initTracer({
    serviceName: process.env.POD_NAME || 'service',
    sampler: {
        type: 'const',
        param: 1
    }
}, {});
