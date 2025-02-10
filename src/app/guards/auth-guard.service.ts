import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): boolean {

    if(!this.userService.isLoggedIn()){
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
