import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard.routing';



@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DASHBOARD_ROUTES)
  ]
})
export class DashboardModule { }
