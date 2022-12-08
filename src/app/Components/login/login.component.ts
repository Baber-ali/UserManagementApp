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
  pwd: string = '';

  constructor(private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService, private commonService: CommonService, private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    let userModel = {
      Username: this.username,
      Password: this.pwd
    }
    this.spinnerService.show();
    let url = this.commonService.urlLogin;
    this.commonService.post(url, userModel).subscribe(data => {
      this.spinnerService.hide();
      let userData: any = data;
      if (userData && userData.status) {
        this.commonService.setUser(userData.user);
        this.router.navigateByUrl('/user-management');
        return;
      }
      this.toastrService.error(userData.message, 'Not Authenticated');
      return;
    });
  }
}
