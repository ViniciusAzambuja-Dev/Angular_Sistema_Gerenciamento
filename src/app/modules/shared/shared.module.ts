import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToolbarNavigationComponent } from './components/toolbar-navigation/toolbar-navigation.component';
import { HasRoleDirective } from './directives/HasRole.directive';



@NgModule({
  declarations: [
    ToolbarNavigationComponent,
    HasRoleDirective
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ToolbarNavigationComponent,
    HasRoleDirective,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: []
})
export class SharedModule { }
