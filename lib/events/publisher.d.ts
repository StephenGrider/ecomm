import { Request } from 'express';
import { Event } from './schema/common/v1/event';
export interface EventOptions {
    req?: Request;
}
export declare abstract class Publisher<T> {
    private data;
    private options;
    abstract eventName: string;
    abstract eventVersion: string;
    constructor(data: T, options?: EventOptions);
    buildContext(): import("opentracing").SpanContext | undefined;
    buildEvent(): Event;
    publish(): Promise<void>;
}
