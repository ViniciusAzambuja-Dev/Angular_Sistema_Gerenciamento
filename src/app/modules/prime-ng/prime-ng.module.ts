import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  exports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class PrimeNgModule { }
