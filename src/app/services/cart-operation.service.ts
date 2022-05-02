import { Injectable } from '@angular/core';
import {CartDto} from '../model/dto/CartDto';
import {CartItem} from '../model/dto/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartOperationService {

  cart: CartDto;

  constructor() {
    this.createCart();
  }

  createCart(): void {
    this.cart = JSON.parse(sessionStorage.getItem('cart'));

    if (!this.cart){
      this.cart = new CartDto();
      this.cart.items = new Array<CartItem>();
      this.cart.price = 0;
      this.saveCart();
    }

  }

  addToCart(cartItem: CartItem): void {
    this.createCart();
    this.cart.items.push(
      {
        // @ts-ignore
        cartItemNo: this.cart.items.length + 1,
        ...cartItem
      }
    );
    this.updateCart();
  }

  saveCart(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  updateCart(): void {
    this.cart.price = 0;
    this.cart.items.forEach(cartItem => {
      this.cart.price += cartItem.price;
    });
    this.saveCart();
  }

  emptyCart(): void {
    this.cart.items = new Array<CartItem>();
    this.cart.price = 0;
    this.saveCart();
  }

  getCart(): CartDto {
    return this.cart;
  }

  deleteCartItem(cartItemNo: number): void {
    // @ts-ignore
    this.cart.items.splice(this.cart.items.indexOf(
      this.cart.items.find(cartItem => {
        // @ts-ignore
        // tslint:disable-next-line:no-unused-expression
        cartItem.cartItemNo === cartItemNo;
      })
    ), 1);
    this.updateCart();
  }
}
