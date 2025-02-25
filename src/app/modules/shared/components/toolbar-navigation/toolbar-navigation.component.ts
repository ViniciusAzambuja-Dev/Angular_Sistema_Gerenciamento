import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrl: './toolbar-navigation.component.scss'
})
export class ToolbarNavigationComponent {
  constructor(private cookie: CookieService, private router: Router) {}

  handleLogOut(): void {
    this.cookie.delete('USUARIO_INFO');

    this.router.navigate(['/home']);
  }
}
