import { Metadata } from './metadata';

export interface Event<T> {
  metadata: Metadata;
  context: any;
  data: T;
}
