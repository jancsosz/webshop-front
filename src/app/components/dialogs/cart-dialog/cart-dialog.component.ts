import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CartDto} from '../../../model/dto/CartDto';
import {CartOperationService} from '../../../services/cart-operation.service';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent implements OnInit {

  constructor(
    private cartOperationService: CartOperationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  public deleteCartItem(cartItemNo: any): void {
    this.cartOperationService.deleteCartItem(cartItemNo);
  }

}
