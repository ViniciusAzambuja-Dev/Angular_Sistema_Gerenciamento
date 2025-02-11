import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProjectHomeComponent } from './page/project-home/project-home.component';
import { RouterModule } from '@angular/router';
import { PROJECTS_ROUTES } from './project.routing';
import { ProjectTableComponent } from './components/project-table/project-table.component';



@NgModule({
  declarations: [
    ProjectHomeComponent,
    ProjectTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PROJECTS_ROUTES),
    SharedModule,
  ]
})
export class ProjectModule { }
