import { Event } from './event';

export const productUpdatedEventName = 'product-updated';
export interface ProductUpdatedEvent extends Event {
  data: {
    id: string;
    title: string;
    price: number;
    images: {
      thumb: string;
      raw: string;
    }[];
  };
}
