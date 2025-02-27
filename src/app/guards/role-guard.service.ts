import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(private authService: AuthGuardService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];

    const hasRole = this.authService.hasRole(expectedRoles);

    if (!hasRole) {
      this.router.navigate(['home']);
      return false;
    }

    return true;
  }
}
