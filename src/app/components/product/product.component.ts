import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {ProductDto} from '../../model/dto/ProductDto';
import {MatDialog} from '@angular/material/dialog';
import {ModifyProductDialogComponent} from '../dialogs/modify-product-dialog/modify-product-dialog.component';
import {FormGroup} from '@angular/forms';
import {MessageDialogComponent} from '../dialogs/message-dialog/message-dialog.component';
import {CartOperationService} from '../../services/cart-operation.service';
import {CartItem} from '../../model/dto/CartItem';
import {CartDto} from '../../model/dto/CartDto';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: ProductDto;
  quantity = 1;
  decDisabled = true;
  incDisabled = false;
  cart: CartDto;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartOperationService: CartOperationService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.cart = this.cartOperationService.getCart();
  }

  private getProduct(): void {
    this.productService.getProductGET(this.route.snapshot.paramMap.get('id'))
      .then(result => {
        this.product = result;
      })
      .catch(() => {
          this.router.navigate(['manage-products']);
        }
      );
  }

  public addToCart(): void {
    // TODO
    console.log(typeof this.createCartItem().price);
    this.cartOperationService.addToCart(this.createCartItem());
    this.cart = this.cartOperationService.getCart();
  }

  public increment(): void {
    if (this.quantity < this.product.quantityInStock && this.quantity <= 10) {
      this.quantity++;
      if (this.decDisabled) {
        this.decDisabled = false;
      }
    }
    if (this.quantity >= this.product.quantityInStock || this.quantity >= 10) {
      this.incDisabled = true;
    }
  }

  public decrement(): void {
    if (this.quantity > 1) {
      this.quantity--;
      if (this.quantity <= 1) {
        this.decDisabled = true;
      }
    }
    if (this.quantity <= this.product.quantityInStock && this.quantity <= 10) {
      this.incDisabled = false;
    }
  }

  public deleteProduct(): void {
    this.dialog.open(MessageDialogComponent)
      .afterClosed().subscribe((confirmValue) => {
        if (confirmValue) {
          this.productService.deleteProductDELETE(this.product.id.toString())
          .then(() => {
            this.dialog.open(MessageDialogComponent, {data: 'Product successfully deleted.'})
              .afterClosed().subscribe(() => this.router.navigate(['manage-products']));
          })
          .catch((error) => {
            this.dialog.open(MessageDialogComponent, {data: error});
          });
        }
    });
  }

  public modifyProduct(): void {
    this.dialog.open(ModifyProductDialogComponent, {data: this.product, minWidth: '300px'})
      .afterClosed().subscribe(
      () => {
        this.getProduct();
      }
    );
  }

  private createCartItem(): CartItem {
    return {
      product: this.product,
      quantity: this.quantity,
      price: this.product.price * this.quantity
    };
  }

}
