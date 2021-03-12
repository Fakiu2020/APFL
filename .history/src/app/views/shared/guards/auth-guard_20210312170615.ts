import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    const isAdminPage = this.auth.authentication &&  this.auth.authentication.roles
                        && this.auth.authentication.roles.some(x => x == 'AdminPage');

    if (!this.auth.isAuthenticated() || !isAdminPage) {
      this.router.navigate(['401']);
      this.auth.logOut();
      return false;
    }
    return true;
  }
}