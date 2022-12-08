import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from "rxjs";

const defaultUser = null;
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public user$: any = new BehaviorSubject(defaultUser);

  constructor(private httpclient: HttpClient) { }
  // Login API URLs
  public readonly urlLogin = environment.ApiUrl + '/api/Account/Login';

  //Simple get with dynamic response
  public get(_url: string) {
    return this.httpclient.get<any>(_url);
  }

  //Simple post with dynamic response
  public post(_url: string, param: any) {
    return this.httpclient.post(_url, param);
  }

  public setUser(user: any) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    this.user$.next(user);
  }
}
