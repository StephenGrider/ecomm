/// <reference types="node" />
import { Request } from 'express';
import { Stan, Message, SubscriptionOptions as _SubscriptionOptions } from 'node-nats-streaming';
import { EventEmitter } from 'events';
import { Tracer } from 'logging/tracer';
import { Event } from 'events/event';
interface SubscriptionOptions extends _SubscriptionOptions {
    groupName: string;
}
export declare class Broker {
    client: Stan;
    process: EventEmitter;
    tracer: Tracer;
    constructor(client: Stan, process: EventEmitter, tracer: Tracer);
    onClientClose: (err: Error) => never;
    closeClient: () => never;
    defaultOptions(): SubscriptionOptions;
    on<T>(eventName: string, callback: (data: T, message: Message) => void): void;
    private parseMessage;
    publish(event: Event, contextSource?: Request): Promise<string>;
}
export {};
