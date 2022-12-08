import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../user-management/popup/popup.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(public dialog: MatDialog, private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  OpenEditPopup() {
    let model = {
      header: 'Edit User'
    }
    const dialogRef = this.dialog.open(PopupComponent, {
      panelClass: 'modal-medium',
      data: { dialogueName: "EditUser", Data: model },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Save') {
        this.toastrService.success('Save successfully', 'Success');
      }
    });
  }

  OpenDeletePopup() {
    let model = {
      header: 'Confirmation',
      msg: 'Are you sure,do you want to delete?'
    }
    const dialogRef = this.dialog.open(PopupComponent, {
      panelClass: 'modal-extra-small',
      data: { dialogueName: "ConfirmDelete", Data: model },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Confirmed') {
        alert('Confirmed');
      }
    });
  }
}
