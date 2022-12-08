import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  model: any;

  constructor(@Inject(MAT_DIALOG_DATA) public d: any, public dialogRef: MatDialogRef<PopupComponent>) {
    this.model = d.Data;
  }

  ngOnInit(): void {
  }

  OnDeleteConfirm() {
    this.dialogRef.close("Confirmed");
  }

  OnSave() {
    this.dialogRef.close("Save");
  }
}
