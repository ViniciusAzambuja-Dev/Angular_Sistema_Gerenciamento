import { Routes } from '@angular/router';

import { UserHomeComponent } from './page/user-home/user-home.component';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UserHomeComponent
  }
];
