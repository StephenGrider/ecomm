import { Event } from '../../../common/v1/event';

export interface ProductCreatedData {
  id: string;
  title: string;
  price: number;
  images: {
    thumb: string;
    raw: string;
  }[];
}

export interface ProductCreatedEvent extends Event<ProductCreatedData> {}
