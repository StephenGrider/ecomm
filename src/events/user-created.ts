import { Event } from './event';

export interface UserCreatedEvent extends Event {
  data: {
    id: string;
    email: string;
    role: 'user' | 'admin';
  };
}
