import {Component} from '@angular/core';
import { AuthService } from '../../views/shared/services/auth.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  userName = null;
  constructor(private authService: AuthService) {
    this.userName = (this.authService.authentication.userName)

  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){
    this.authService.logOut();
  }
}
