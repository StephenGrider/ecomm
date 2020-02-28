import { Event } from './event';
import { Handler } from './handler';
import { Publisher } from './publisher';

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

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  eventName = 'product-created';
}

export class ProductCreatedHandler extends Handler<ProductCreatedEvent> {
  eventName = 'product-created';
}
