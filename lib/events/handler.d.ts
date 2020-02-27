import { Message } from 'node-nats-streaming';
import { Event } from './schema/common/v1/event';
export declare abstract class Handler<T extends Event> {
    abstract eventName: string;
    abstract eventVersion: string;
    abstract queueGroupName?: string;
    abstract handle(event: T): any;
    subscribe(): import("node-nats-streaming").Subscription;
    _handle(message: Message): Promise<void>;
}
