import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    TooltipModule,
  ],
  exports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    TooltipModule
  ],
  providers: [MessageService]
})
export class PrimeNgModule { }
