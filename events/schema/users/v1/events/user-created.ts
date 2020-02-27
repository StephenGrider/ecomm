import { Event } from '../../../common/v1/event';

export interface UserCreatedData {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface UserCreatedEvent extends Event<UserCreatedData> {}
