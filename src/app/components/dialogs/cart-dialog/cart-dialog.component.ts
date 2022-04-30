import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CartOperationService} from '../../../services/cart-operation.service';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent implements OnInit {

  constructor(
    public globalService: GlobalService,
    private cartOperationService: CartOperationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  public deleteCartItem(cartItemNo: any): void {
    this.cartOperationService.deleteCartItem(cartItemNo);
  }
}
