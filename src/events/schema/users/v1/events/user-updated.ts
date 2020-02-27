import { Event } from '../../../common/v1/event';

export interface UserUpdatedEvent extends Event {
  data: {
    id: string;
    email: string;
    role: 'user' | 'admin';
  };
}
