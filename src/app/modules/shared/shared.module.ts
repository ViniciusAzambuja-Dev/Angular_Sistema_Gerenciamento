import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [SidebarNavigationComponent],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    SidebarNavigationComponent,
    PrimeNgModule
  ],
  providers: [CookieService]
})
export class SharedModule { }
