import {AccountType} from './AccountType';
import {CartDto} from './CartDto';

export class Account {
  id: number;

  username: string;
  password: string;
  accountType: AccountType;

  activeCart: CartDto;
}
