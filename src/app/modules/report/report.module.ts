import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { REPORTS_ROUTES } from './report-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReportHomeComponent } from './page/report-home/report-home.component';
import { ProjectTableReportComponent } from './components/project-table-report/project-table-report.component';
import { ProjectReportComponent } from './components/project-report/project-report.component';
import { ActivityReportComponent } from './components/activity-report/activity-report.component';



@NgModule({
  declarations: [
    ReportHomeComponent,
    ProjectTableReportComponent,
    ProjectReportComponent,
    ActivityReportComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(REPORTS_ROUTES),
    SharedModule
  ]
})
export class ReportModule { }
