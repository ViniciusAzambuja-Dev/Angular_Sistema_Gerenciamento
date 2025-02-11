import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    TooltipModule,
    SidebarModule,
    TableModule,
    CardModule,
  ],
  exports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    TooltipModule,
    SidebarModule,
    TableModule,
    CardModule
  ],
  providers: [MessageService]
})
export class PrimeNgModule { }
