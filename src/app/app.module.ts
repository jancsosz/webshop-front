import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import {HttpClientModule} from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { ModifyProductDialogComponent } from './components/dialogs/modify-product-dialog/modify-product-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule, MatRippleModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import { MessageDialogComponent } from './components/dialogs/message-dialog/message-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProductsSidebarComponent } from './components/products-sidebar/products-sidebar.component';
import { CartComponent } from './components/cart/cart.component';
import { CartDialogComponent } from './components/dialogs/cart-dialog/cart-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    AddProductComponent,
    ProductComponent,
    ProductsComponent,
    ModifyProductDialogComponent,
    MessageDialogComponent,
    LoginComponent,
    SignUpComponent,
    ProductsSidebarComponent,
    CartComponent,
    CartDialogComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatRippleModule
    ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
