import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {CartDialogComponent} from '../dialogs/cart-dialog/cart-dialog.component';
import {CartOperationService} from '../../services/cart-operation.service';
import {CartDto} from '../../model/dto/CartDto';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  cartDto: CartDto;
  cartDialogOpen = false;
  currentRoute: string;
  loginUrl = `${environment.rootUrl}/login`;

  constructor(
    private cartOperationService: CartOperationService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.cartDto = this.cartOperationService.getCart();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  openCartDialog(): void {
    this.cartDialogOpen = true;

    this.dialog.open(CartDialogComponent, {data: this.cartDto, })
      .afterClosed().subscribe(() => this.cartDialogOpen = false);
  }
}
