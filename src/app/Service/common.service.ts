import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpclient: HttpClient) { }
  // Login API URLs
  public readonly urlLogin = environment.ApiUrl + '/api/Account/Login';
  public readonly urlGetUser = environment.ApiUrl + '/api/User/Get';
  public readonly urlAddUser = environment.ApiUrl + '/api/User/Add';
  public readonly urlEditUser = environment.ApiUrl + '/api/User/Edit';
  public readonly urlDeleteUser = environment.ApiUrl + '/api/User/Delete';

  //Simple get with dynamic response
  public get(_url: string) {
    return this.httpclient.get<any>(_url);
  }

  //Simple post with dynamic response
  public post(_url: string, param: any) {
    return this.httpclient.post(_url, param);
  }

  public put(_url: string, param: any) {
    return this.httpclient.put(_url, param);
  }

  public delete(_url: string) {
    return this.httpclient.delete(_url);
  }

  public setToken(token: any) {
    sessionStorage.setItem("token", token);
  }

  public uploadFile<T>(_url: string, file: File): Observable<T> {
    let formData = new FormData();
    formData.append('file', file, file.name);

    return this.httpclient.post<T>(_url, formData);
  }
}
