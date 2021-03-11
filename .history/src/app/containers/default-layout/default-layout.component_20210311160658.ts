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
  
  constructor(public authService: AuthService) {
    console.log(this.authService.authentication)

  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
