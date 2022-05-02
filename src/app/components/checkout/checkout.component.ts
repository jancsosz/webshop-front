import { Component, OnInit } from '@angular/core';
import {CartOperationService} from '../../services/cart-operation.service';
import {CartDto} from '../../model/dto/CartDto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartDto: CartDto;

  constructor(
    private cartService: CartOperationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartDto = this.cartService.getCart();
    this.navigateToProductsIfCartIsEmpty();
  }

  deleteCartItem(cartItemNo: number): void {
    this.cartService.deleteCartItem(cartItemNo);
    this.navigateToProductsIfCartIsEmpty();
  }

  private navigateToProductsIfCartIsEmpty(): void {
    if (!this.cartDto || this.cartDto.items.length === 0) {
      this.router.navigate(['/products']);
    }
  }
}
