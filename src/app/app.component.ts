import { Component } from '@angular/core';
import localHu from '@angular/common/locales/hu';
import {registerLocaleData} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webshop-front';

  constructor() {
    registerLocaleData(localHu);
  }
}
