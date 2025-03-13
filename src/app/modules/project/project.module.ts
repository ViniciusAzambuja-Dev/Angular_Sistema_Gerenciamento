import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { SharedModule } from '../shared/shared.module';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { ProjectHomeComponent } from './page/project-home/project-home.component';
import { PROJECTS_ROUTES } from './project.routing';



@NgModule({
  declarations: [
    ProjectHomeComponent,
    ProjectTableComponent,
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PROJECTS_ROUTES),
    SharedModule,
  ],
  providers: [DialogService, ConfirmationService]
})
export class ProjectModule { }
