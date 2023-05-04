import { OrderItem } from './order-item';
import { User } from '@bluebits/users';

export class Order {
  id?: string;
  orderItems?: OrderItem[]; // Make orderItems an array of OrderItem
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalprice?: number;
  user?: User;
  email?:string;
}