import { Event } from './event';
export declare const userCreatedEventName = "user-created";
export interface UserCreatedEvent extends Event {
    data: {
        id: string;
        email: string;
        role: 'user' | 'admin';
    };
}
