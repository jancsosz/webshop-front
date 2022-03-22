import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {ProductDto} from '../../model/dto/ProductDto';
import {MatDialog} from '@angular/material/dialog';
import {ModifyProductDialogComponent} from '../dialogs/modify-product-dialog/modify-product-dialog.component';
import {FormGroup} from '@angular/forms';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';
import {MessageDialogComponent} from '../dialogs/message-dialog/message-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  cartGroup: FormGroup;
  product: ProductDto;
  quantity: number[];
  counter = 1;
  decDisabled = true;
  incDisabled = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(): void {
    this.productService.getProductGET(this.route.snapshot.paramMap.get('id'))
      .then(result => {
        this.product = result;
        for (let i = 0; i < this.product.quantityInStock; i++) {
          // TODO
          //  this.quantity
        }
      })
      .catch(() => {
          this.router.navigate(['manage-products']);
        }
      );
  }

  public addToCart(): void {
    // TODO
  }

  public increment(): void {
    if (this.counter < this.product.quantityInStock && this.counter <= 10) {
      this.counter++;
      if (this.decDisabled) {
        this.decDisabled = false;
      }
    }
    if (this.counter >= this.product.quantityInStock || this.counter >= 10) {
      this.incDisabled = true;
    }
  }

  public decrement(): void {
    if (this.counter > 1) {
      this.counter--;
      if (this.counter <= 1) {
        this.decDisabled = true;
      }
    }
    if (this.counter <= this.product.quantityInStock && this.counter <= 10) {
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

}
