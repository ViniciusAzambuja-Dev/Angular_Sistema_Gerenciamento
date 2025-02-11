import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [SidebarNavigationComponent],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    SidebarNavigationComponent,
    PrimeNgModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService]
})
export class SharedModule { }
