/// <reference types="node" />
import { Request } from 'express';
import { Stan, Message } from 'node-nats-streaming';
import { EventEmitter } from 'events';
import { Tracer } from 'logging/tracer';
import { Event } from 'events/event';
export declare class Broker {
    private tracer;
    client?: Stan;
    constructor(process: EventEmitter, tracer: Tracer);
    setClient(client: Stan): void;
    onClientClose: (err: Error) => never;
    closeClient: () => void;
    private defaultOptions;
    on<T>(eventName: string, callback: (data: T, message: Message) => void): void;
    private parseMessage;
    publish(event: Event, contextSource?: Request): Promise<string>;
}
export declare const broker: Broker;
