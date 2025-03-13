import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { SharedModule } from '../shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserHomeComponent } from './page/user-home/user-home.component';
import { USERS_ROUTES } from './user.routing';



@NgModule({
  declarations: [
    UserHomeComponent,
    UserTableComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(USERS_ROUTES),
    SharedModule,
  ],
  providers: [DialogService, ConfirmationService]
})
export class UserModule { }
