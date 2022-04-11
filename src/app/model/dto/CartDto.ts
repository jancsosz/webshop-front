import {CartItem} from './CartItem';

export class CartDto {
  id: number;
  account: Account;
  items: Array<CartItem>;
  price: number;
}
