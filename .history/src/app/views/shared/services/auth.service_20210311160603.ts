import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Authentication } from '../../models/authentication';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseApiUrl = environment.baseUrl + 'token';
  authentication = new Authentication();
  constructor(private http: HttpClient) {   
  }

  fillAuthenticationData(){
    this.authentication = JSON.parse(localStorage.getItem('authorizationData'));     
  }

  login(loginData) {
    const data = "grant_type=password&username=" + encodeURIComponent(loginData.userName) +
      "&password=" + loginData.password +
      "&deviceToken=" + loginData.deviceToken +
      "&deviceModel=" + loginData.deviceModel +
      "&devicePlatform=" + loginData.devicePlatform +
      "&client_id=ionicApp";
    return this.http.post(this.baseApiUrl, data, { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) })
      .pipe(
        map((response: any) => {
          if (response) {
            const dataResponse = {
              token: response.access_token,
              userName: loginData.userName,
              refreshToken: response.refresh_token,
              useRefreshTokens: true,
              roles: response.roles.split(','),
              isFirstAccess: response.isFirstAccess,
              isFirstDayAccess: response.isFirstDayAccess,
              referralToken: response.referralToken
            };
            this.authentication = dataResponse
            localStorage.setItem('authorizationData',  JSON.stringify(dataResponse));
          }
        })
      );
  }
}
