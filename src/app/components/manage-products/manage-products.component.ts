import {Component, HostListener, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductDto} from '../../model/dto/ProductDto';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MessageDialogComponent} from '../dialogs/message-dialog/message-dialog.component';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  products: ProductDto[];
  innerWidth: number;
  colCount: number;
  isLoading = true;

  constructor(
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerWidth > 768 ? this.colCount = 3 : this.innerWidth > 500 ? this.colCount = 2 : this.colCount = 1;
    this.productService.getProductsGET()
      .then(result => {
        this.products = result;
        this.products = this.products.concat(result).concat(result).concat(result).concat(result).concat(result).concat(result).concat(result).concat(result).concat(result).concat(result).concat(result).concat(result).concat(result);
        this.isLoading = false;
      })
      .catch((error) => {
        this.dialog.open(MessageDialogComponent, {data: 'There was an error while loading products.'});
        this.isLoading = false;
      });
  }

  navigateToProductDetail(path: string): void {
    this.router.navigate([`products/${path}`]);
  }

  @HostListener('window:resize')
  private onResize(): void {
    this.innerWidth = window.innerWidth;
  }

}
