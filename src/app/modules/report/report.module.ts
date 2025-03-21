import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ActivityReportComponent } from './components/activity-report/activity-report.component';
import { PeriodReportComponent } from './components/period-report/period-report.component';
import { ProjectReportComponent } from './components/project-report/project-report.component';
import { ActivityTableReportComponent } from './components/table/activity-table-report/activity-table-report.component';
import { HourTableReportComponent } from './components/table/hour-table-report/hour-table-report.component';
import { ProjectTableReportComponent } from './components/table/project-table-report/project-table-report.component';
import { ReportHomeComponent } from './page/report-home/report-home.component';
import { REPORTS_ROUTES } from './report-routing.module';



@NgModule({
  declarations: [
    ReportHomeComponent,
    ProjectReportComponent,
    ActivityReportComponent,
    PeriodReportComponent,
    ProjectTableReportComponent,
    ActivityTableReportComponent,
    HourTableReportComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(REPORTS_ROUTES),
    SharedModule
  ]
})
export class ReportModule { }
