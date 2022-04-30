import { Component, OnInit } from '@angular/core';
import {CartOperationService} from '../../services/cart-operation.service';
import {CartDto} from '../../model/dto/CartDto';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartDto: CartDto;

  constructor(
    private cartService: CartOperationService
  ) { }

  ngOnInit(): void {
    this.cartDto = this.cartService.getCart();
  }

  deleteCartItem(cartItemNo: number): void {
    this.cartService.deleteCartItem(cartItemNo);
  }
}
