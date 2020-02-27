import { Event } from '../../../common/v1/event';

export interface UserUpdatedData {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface UserUpdatedEvent extends Event<UserUpdatedData> {}
