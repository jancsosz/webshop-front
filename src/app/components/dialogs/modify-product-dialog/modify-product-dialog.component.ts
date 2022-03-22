import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProductDto} from '../../../model/dto/ProductDto';
import {ProductCategory} from '../../../model/dto/ProductCategory';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-modify-product-dialog',
  templateUrl: './modify-product-dialog.component.html',
  styleUrls: ['./modify-product-dialog.component.scss']
})
export class ModifyProductDialogComponent implements OnInit {

  updateProductForm: FormGroup;
  selected: any;

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
    private dialogRef: MatDialogRef<ModifyProductDialogComponent>,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ProductDto,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.selected = this.data.category;
  }

  update(): void {
    if (this.updateProductForm.valid) {
      this.productService.updateProductPUT(this.createProductDto())
        .then(() => {
          this.dialogRef.close();
          this.dialog.open(MessageDialogComponent, {data: 'Successful modification!'});
        })
        .catch(() => this.dialog.open(MessageDialogComponent, {data: 'There was an error updating this product.'}));
    }
  }

  private createForm(): void {
    this.updateProductForm = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      price: [this.data.price, Validators.required],
      category: [this.data.category, Validators.required],
      quantityInStock: [this.data.quantityInStock, Validators.required],
      description: [this.data.description, Validators.required]
    });
  }

  private createProductDto(): ProductDto {
    return {
      id: this.data.id,
      name: this.updateProductForm.get('name').value,
      price: this.updateProductForm.get('price').value,
      quantityInStock: this.updateProductForm.get('quantityInStock').value,
      category: this.updateProductForm.get('category').value,
      description: this.updateProductForm.get('description').value
    } as ProductDto;
  }
}
