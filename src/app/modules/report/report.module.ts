import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { REPORTS_ROUTES } from './report-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReportHomeComponent } from './page/report-home/report-home.component';



@NgModule({
  declarations: [
    ReportHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(REPORTS_ROUTES),
    SharedModule
  ]
})
export class ReportModule { }
