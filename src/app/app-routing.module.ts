import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {ManageProductsComponent} from './components/manage-products/manage-products.component';
import {ProductsComponent} from './components/products/products.component';
import {ProductComponent} from './components/product/product.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'manage-products', component: ManageProductsComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
