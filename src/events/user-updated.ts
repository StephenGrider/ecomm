import { Event } from './event';

export const userUpdatedEventName = 'user-updated';
export interface UserUpdatedEvent extends Event {
  data: {
    id: string;
    email: string;
    role: 'user' | 'admin';
  };
}
