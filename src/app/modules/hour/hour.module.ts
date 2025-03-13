import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { SharedModule } from '../shared/shared.module';
import { HourFormComponent } from './components/hour-form/hour-form.component';
import { HourTableComponent } from './components/hour-table/hour-table.component';
import { HOUR_ROUTES } from './hour.routing';
import { HourHomeComponent } from './page/hour-home/hour-home.component';


@NgModule({
  declarations: [
    HourHomeComponent,
    HourTableComponent,
    HourFormComponent
  ],
  imports: [
    RouterModule.forChild(HOUR_ROUTES),
    SharedModule,
  ],
  providers: [DialogService, ConfirmationService]
})
export class HourModule { }
