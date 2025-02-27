import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { RoleGuardService } from './guards/role-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      ),
    canActivate: [AuthGuardService, RoleGuardService],
    data: { roles: ['ADMIN', 'USUARIO'] }
  },
  {
    path: 'project',
    loadChildren: () => import('./modules/project/project.module').then(
      (module) => module.ProjectModule
    ),
    canActivate: [AuthGuardService, RoleGuardService],
    data: { roles: ['ADMIN', 'USUARIO'] }
  },
  {
    path: 'activity',
    loadChildren: () => import('./modules/activity/activity.module').then(
      (module) => module.ActivityModule
    ),
    canActivate: [AuthGuardService, RoleGuardService],
    data: { roles: ['ADMIN', 'USUARIO'] }
  },
  {
    path: 'hour',
    loadChildren: () => import('./modules/hour/hour.module').then(
      (module) => module.HourModule
    ),
    canActivate: [AuthGuardService, RoleGuardService],
    data: { roles: ['ADMIN', 'USUARIO'] }
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/user/user.module').then(
      (module) => module.UserModule
    ),
    canActivate: [AuthGuardService, RoleGuardService],
    data: { roles: ['ADMIN', 'USUARIO'] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
