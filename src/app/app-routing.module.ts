import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuardService } from './guards/auth-guard.service';

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
    canActivate: [AuthGuardService]
  },
  {
    path: 'project',
    loadChildren: () => import('./modules/project/project.module').then(
      (module) => module.ProjectModule
    ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'activity',
    loadChildren: () => import('./modules/activity/activity.module').then(
      (module) => module.ActivityModule
    ),
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
