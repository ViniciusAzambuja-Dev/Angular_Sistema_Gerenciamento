import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { USERS_ROUTES } from './user.routing';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserHomeComponent } from './page/user-home/user-home.component';



@NgModule({
  declarations: [
    UserHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(USERS_ROUTES),
    SharedModule,
  ],
  providers: [ConfirmationService]
})
export class UserModule { }
