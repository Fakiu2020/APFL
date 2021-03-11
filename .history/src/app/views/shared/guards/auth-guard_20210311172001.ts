import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(next: ActivatedRouteSnapshot): boolean {
    const claims = next.firstChild  != null ? next.firstChild.data['claims'] as Array<string> : null;
    console.log(claims);
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']); 
      return false;
    }
    return true;
  }
}