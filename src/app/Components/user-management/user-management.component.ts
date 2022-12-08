import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../user-management/popup/popup.component';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../Service/common.service';
import { User } from '../../Models/CommonModels';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  Users: any;

  constructor(public dialog: MatDialog, private toastrService: ToastrService, private commonService: CommonService,
    private router: Router) { }

  ngOnInit(): void {
    this.GetUsers();
  }

  GetUsers() {
    let url = this.commonService.urlGetUser;

    this.commonService.get(url).subscribe(data => {
      let userData: any = data;
      if (userData?.users) {
        this.Users = userData.users;
      }
    },
      err => {
        if (err.status == 404 || err.status == 500) {
          this.toastrService.error(err.error);
        }
      });
  }

  OpenAddEditPopup(type: string, user: User = new User()) {
    let model = this.commonService.clone_model(user);

    const dialogRef = this.dialog.open(PopupComponent, {
      panelClass: 'modal-medium',
      data: { dialogueName: 'AddEditUser', Header: type + ' User', Data: model },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (type == 'Add') {
          this.AddUser(result);
        }
        else {
          this.EditUser(result);        }
        
      }
    });
  }

  AddUser(model: any) {
    let url = this.commonService.urlAddUser;

    this.commonService.post(url, model).subscribe(data => {
      let _data: any = data;
      if (_data?.status) {
        this.toastrService.success('User added successfully.');
      }
      else {
        this.toastrService.error('Some error occured while adding user.');
      }
      this.GetUsers();
    },
      err => {
        if (err.status == 404) {
          this.toastrService.error(err.error);
        }
      });
  }

  EditUser(model: any) {
    let url = this.commonService.urlEditUser;

    this.commonService.put(url, model).subscribe(data => {
      let _data: any = data;
      if (_data?.status) {
        this.toastrService.success('User updated successfully.');
      }
      else {
        this.toastrService.error('Some error occured while updating user.');
      }
      this.GetUsers();
    },
      err => {
        if (err.status == 404) {
          this.toastrService.error(err.error);
        }
      });
  }

  OpenDeletePopup(id: number) {
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
        this.DeleteUser(id)
      }
    });
  }

  DeleteUser(id: number) {
    let url = this.commonService.urlDeleteUser + '/' + id;

    this.commonService.delete(url).subscribe(data => {
      let _data: any = data;
      if (_data?.status) {
        this.toastrService.success('User deleted successfully.');
      }
      else {
        this.toastrService.error('Some error occured while deleting user.');
      }
      this.GetUsers();
    },
      err => {
        if (err.status == 404) {
          this.toastrService.error(err.error);
        }
      });
  }

  Logout() {
    let model = {
      header: 'Confirmation',
      msg: 'Are you sure, do you want to logout?'
    }
    const dialogRef = this.dialog.open(PopupComponent, {
      panelClass: 'modal-extra-small',
      data: { dialogueName: "ConfirmDelete", Data: model },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Confirmed') {
        sessionStorage.removeItem('token');
        this.router.navigateByUrl('/');
      }
    });

    
  }
}
