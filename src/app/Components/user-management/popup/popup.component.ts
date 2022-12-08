import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../Models/CommonModels';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  model: any;
  Header: string;

  constructor(@Inject(MAT_DIALOG_DATA) public d: any, public dialogRef: MatDialogRef<PopupComponent>) {
    this.model = d.Data;
    this.Header = d.Header;
    if (this.Header == 'Add User') {
      this.model = new User();
    }
  }

  ngOnInit(): void {
  }

  OnDeleteConfirm() {
    this.dialogRef.close("Confirmed");
  }

  OnSave(model: any) {
    this.dialogRef.close(model);
  }
}
