import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../Models/CommonModels';
import { CommonService } from '../../../Service/common.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  model: any;
  Header: string;
  modelValid: boolean = true;
  emailValid: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public d: any, public dialogRef: MatDialogRef<PopupComponent>,
    private toastrService: ToastrService, private commonService: CommonService) {
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
    this.modelValid = true;
    this.emailValid = true;

    if (!model.userName) {
      this.modelValid = false;
      this.toastrService.error('Username is empty.');
      return;
    }
    if (!model.password) {
      this.modelValid = false;
      this.toastrService.error('Password is empty.');
      return;
    }
    if (!model.email) {
      this.modelValid = false;
      this.toastrService.error('Email is empty.');
      return;
    }

    if (model.email) {
      var pattern = new RegExp("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}");
      var result = pattern.test(model.email);
      if (!result) {
        this.modelValid = false;
        this.emailValid = false;
        this.toastrService.error('Email is invalid.');
        return;
      }
    }


    this.dialogRef.close(model);
  }
}
