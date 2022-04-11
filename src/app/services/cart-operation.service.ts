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
      // TODO
      console.log(this.cart);
    }

  }

  addToCart(cartItem: CartItem): void {
    this.createCart();
    // TODO
    console.log(this.cart);
    this.cart.items.push(
      {
        // @ts-ignore
        cartItemNo: this.cart.items.length + 1,
        ...cartItem
      }
    );
    this.updateCart();
    // @ts-ignore
    this.saveCart();
    // TODO
    console.log(this.cart);
  }

  saveCart(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  updateCart(): void {
    this.cart.price = 0;
    this.cart.items.forEach(cartItem => {
      this.cart.price += cartItem.price;
    });
  }

  emptyCart(): void {
    this.cart.items = new Array<CartItem>();
    this.cart.price = 0;
  }

  getCart(): CartDto {
    return this.cart;
  }

  deleteCartItem(cartItemNo: number): void {
    // TODO
    console.log(this.cart.items);
    // @ts-ignore
    this.cart.items.splice(this.cart.items.indexOf(
      this.cart.items.find(cartItem => {
        // @ts-ignore
        // tslint:disable-next-line:no-unused-expression
        cartItem.cartItemNo === cartItemNo;
    })), 1);
    this.saveCart();
  }
}
