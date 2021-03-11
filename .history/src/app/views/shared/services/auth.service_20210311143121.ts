import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseApiUrl = environment.baseUrl + 'token';

  constructor(private http: HttpClient) {}

  login(loginData) {

    const data = {
      grant_type: 'password',
      username: loginData.userName,
      password: loginData.password,
      deviceToken: null,
      deviceModel: null,
      devicePlatform: null,
      client_id: 'ionicApp',
    };
    return this.http.post(this.baseApiUrl, data, {headers : new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })});
  }
}
