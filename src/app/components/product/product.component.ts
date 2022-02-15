import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {ProductDto} from '../../model/dto/ProductDto';
import {MatDialog} from '@angular/material/dialog';
import {ModifyProductDialogComponent} from '../dialogs/modify-product-dialog/modify-product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: ProductDto;

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
      })
      .catch(() => {
          this.router.navigate(['manage-products']);
        }
      );
  }

  public deleteProduct(): void {
    this.productService.deleteProductDELETE(this.product.id.toString())
      .then(() => {
        this.router.navigate(['manage-products']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public modifyProduct(): void {
    this.dialog.open(ModifyProductDialogComponent, {data: this.product, maxWidth: '400px'})
      .afterClosed().subscribe(
      () => {
        this.getProduct();
      }
    );
  }

}
