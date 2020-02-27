import { Event } from '../../../common/v1/event';

export interface UserCreatedEvent extends Event {
  data: {
    id: string;
    email: string;
    role: 'user' | 'admin';
  };
}
