import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductDto} from '../../model/dto/ProductDto';
import {MatDialog} from '@angular/material/dialog';
import {MessageDialogComponent} from '../dialogs/message-dialog/message-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  selected: any;
  isLoading = false;

  public options = [
    'FITNESS',
    'DECORATIONS',
    'FOOD_SUPPLEMENTS',
    'GASTRONOMY',
    'HAIRDRESSING_SUPPLIES',
    'HOUSEHOLD_SUPPLIES',
    'LEISURE',
    'OTHER'
  ];

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  public addProduct(): void {
    if (this.addProductForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.productService.addProductPOST(this.createProductDto())
        .then(() => {
          this.dialog.open(MessageDialogComponent, {data: 'Product successfully added.'})
            .afterClosed().subscribe(() => {
              this.router.navigate(['products']);
          });
        })
        .catch(() => {
          this.dialog.open(MessageDialogComponent, {data: 'There was an error while creating this product.'});
          this.isLoading = false;
        });
    }
  }


  private createForm(): void {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      quantityInStock: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  private createProductDto(): ProductDto {
    return {
      name: this.addProductForm.get('name').value,
      price: this.addProductForm.get('price').value,
      quantityInStock: this.addProductForm.get('quantityInStock').value,
      category: this.addProductForm.get('category').value,
      description: this.addProductForm.get('description').value
    } as ProductDto;
  }
}
