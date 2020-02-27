import { Event } from '../../../common/v1/event';

export interface ProductUpdatedData {
  id: string;
  title: string;
  price: number;
  images: {
    thumb: string;
    raw: string;
  }[];
}

export interface ProductUpdatedEvent extends Event<ProductUpdatedData> {}
