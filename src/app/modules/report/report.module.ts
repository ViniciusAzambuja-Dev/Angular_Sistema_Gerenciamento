import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { REPORTS_ROUTES } from './report-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReportHomeComponent } from './page/report-home/report-home.component';
import { ProjectReportComponent } from './components/project-report/project-report.component';
import { ActivityReportComponent } from './components/activity-report/activity-report.component';
import { PeriodReportComponent } from './components/period-report/period-report.component';
import { ProjectTableReportComponent } from './components/table/project-table-report/project-table-report.component';
import { ActivityTableReportComponent } from './components/table/activity-table-report/activity-table-report.component';



@NgModule({
  declarations: [
    ReportHomeComponent,
    ProjectReportComponent,
    ActivityReportComponent,
    PeriodReportComponent,
    ProjectTableReportComponent,
    ActivityTableReportComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(REPORTS_ROUTES),
    SharedModule
  ]
})
export class ReportModule { }
