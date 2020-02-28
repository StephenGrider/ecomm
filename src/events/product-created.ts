import { Event } from './event';

export const productCreatedEventName = 'product-created';
export interface ProductCreatedEvent extends Event {
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
