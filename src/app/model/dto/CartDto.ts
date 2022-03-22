import {CartItem} from './CartItem';

export class CartDto {
  id: number;
  account: Account;
  items: CartItem;
  price: number;
}
