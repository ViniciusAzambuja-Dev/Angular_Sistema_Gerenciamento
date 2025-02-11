import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrl: './sidebar-navigation.component.scss'
})
export class SidebarNavigationComponent {
  sidebarVisible: boolean = false;

  constructor(private cookie: CookieService, private router: Router) {}

  handleLogOut(): void {
    this.cookie.delete('USUARIO_INFO');

    this.router.navigate(['/home']);
  }
}
