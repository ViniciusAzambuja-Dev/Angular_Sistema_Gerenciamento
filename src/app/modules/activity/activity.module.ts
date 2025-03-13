import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { SharedModule } from '../shared/shared.module';
import { ACTIVITIES_ROUTES } from './activity.routing';
import { ActivityFormComponent } from './components/activity-form/activity-form.component';
import { ActivityTableComponent } from './components/activity-table/activity-table.component';
import { ActivityHomeComponent } from './page/activity-home/activity-home.component';


@NgModule({
  declarations: [
    ActivityHomeComponent,
    ActivityTableComponent,
    ActivityFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ACTIVITIES_ROUTES),
    SharedModule,
  ],
  providers: [DialogService, ConfirmationService]
})
export class ActivityModule { }
