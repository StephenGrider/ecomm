import { Event } from './event';
export declare const userUpdatedEventName = "user-updated";
export interface UserUpdatedEvent extends Event {
    data: {
        id: string;
        email: string;
        role: 'user' | 'admin';
    };
}
