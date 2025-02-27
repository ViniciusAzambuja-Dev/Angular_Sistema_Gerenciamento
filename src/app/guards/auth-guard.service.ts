import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private userService: UserService, private router: Router, private cookie: CookieService) { }

  canActivate(): boolean {

    if(!this.userService.isLoggedIn()){
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }

  decodeToken(): any {
    try {
      const token = this.cookie.get('USUARIO_INFO');
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      return null;
    }
  }

  hasRole(requiredRoles: string[]): boolean {
    const userRoles = this.getUserRoles();
    return requiredRoles.some(role => userRoles.includes(role));
  }

  getLoggedUserId(): string {
    const decodedToken = this.decodeToken();
    return decodedToken?.id;
  }

  getUserRoles(): string[] {
    const decodedToken = this.decodeToken();
    return [decodedToken?.roles]
  }
}
