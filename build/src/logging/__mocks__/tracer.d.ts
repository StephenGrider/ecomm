/// <reference types="jest" />
import { Tracer as _Tracer } from 'opentracing';
declare class Tracer extends _Tracer {
    startSpan: jest.Mock<any, any>;
    inject: jest.Mock<any, any>;
    extract: jest.Mock<any, any>;
    spanFromRequest: jest.Mock<any, any>;
    spanFromEvent: jest.Mock<any, any>;
    injectEvent: jest.Mock<any, any>;
}
export declare const tracer: Tracer;
export {};
