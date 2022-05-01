import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {CartDialogComponent} from '../dialogs/cart-dialog/cart-dialog.component';
import {CartOperationService} from '../../services/cart-operation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  currentRoute: string;
  loginUrl = `${environment.rootUrl}/login`;

  constructor(
    private cartOperationService: CartOperationService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  openCartDialog(): void {
    this.dialog.open(CartDialogComponent, {data: this.cartOperationService.getCart()});
  }
}
