import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityHomeComponent } from './page/activity-home/activity-home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ACTIVITIES_ROUTES } from './activity.routing';
import { ActivityTableComponent } from './components/activity-table/activity-table.component';


@NgModule({
  declarations: [
    ActivityHomeComponent,
    ActivityTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ACTIVITIES_ROUTES),
    SharedModule,
  ]
})
export class ActivityModule { }
