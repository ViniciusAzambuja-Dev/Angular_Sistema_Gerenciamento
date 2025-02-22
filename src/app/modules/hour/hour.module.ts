import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { HourHomeComponent } from './page/hour-home/hour-home.component';
import { HOUR_ROUTES } from './hour.routing';
import { HourTableComponent } from './components/hour-table/hour-table.component';


@NgModule({
  declarations: [
    HourHomeComponent,
    HourTableComponent
  ],
  imports: [
    RouterModule.forChild(HOUR_ROUTES),
    SharedModule,
  ],
  providers: [DialogService, ConfirmationService]
})
export class HourModule { }
