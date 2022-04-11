import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CartDialogComponent} from '../dialogs/cart-dialog/cart-dialog.component';
import {CartDto} from '../../model/dto/CartDto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input()
  cart: CartDto;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openCartDialog(): void {
    this.dialog.open(CartDialogComponent, {data: this.cart, width: '18em'});
  }

  calculateQuantity(): number {
    return this.cart.items.length;
  }
}
