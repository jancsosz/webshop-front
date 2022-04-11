import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  confirm = false;
  clicked = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    if (typeof this.data !== 'string') {
      this.confirm = true;
    }
  }

  disableButton(): void {
    if (!this.clicked) {
      this.clicked = true;
    }
  }

}
