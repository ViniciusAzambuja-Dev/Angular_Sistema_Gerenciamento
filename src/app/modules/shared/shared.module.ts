import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SidebarNavigationComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    RouterModule,
  ],
  exports: [
    SidebarNavigationComponent,
    PrimeNgModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [CookieService]
})
export class SharedModule { }
