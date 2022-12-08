import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../Service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  modelValid: boolean = true;

  constructor(private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService, private commonService: CommonService, private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.modelValid = true;

    if (!this.username) {
      this.modelValid = false;
      this.toastrService.error('Username is empty.');
      return;
    }
    if (!this.password) {
      this.modelValid = false;
      this.toastrService.error('Password is empty.');
      return;
    }


    let userModel = {
      Username: this.username,
      Password: this.password
    }

    this.spinnerService.show();
    let url = this.commonService.urlLogin;

    this.commonService.post(url, userModel).subscribe(data => {
      this.spinnerService.hide();
      let userData: any = data;
      if (userData?.token) {
        this.commonService.setToken(userData.token);
        this.router.navigateByUrl('/user-management');
      }
      else {
        this.toastrService.error('Username or Password is not correct');
      }
    },
      err => {
        if (err.status == 404) {
          this.toastrService.error(err.error);
        }
      });
  }
}
