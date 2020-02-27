import { Event } from '../../../common/v1/event';

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
