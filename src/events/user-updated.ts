import { Event } from './event';

export interface UserUpdatedEvent extends Event {
  data: {
    id: string;
    email: string;
    role: 'user' | 'admin';
  };
}
