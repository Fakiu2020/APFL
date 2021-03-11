import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {    
    const isAdminPage =this.auth.authentication.roles.filter(x=>x == 'AdminPage');
    
    if (!this.auth.isAuthenticated() && !isAdminPage) {
      this.router.navigate(['login']); 
      return false;
    }
    return true;
  }
}