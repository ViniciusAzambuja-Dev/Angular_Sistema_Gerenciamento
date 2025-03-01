import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    TooltipModule,
    ToolbarModule,
    TableModule,
    CardModule,
    InputTextareaModule,
    InputMaskModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    CalendarModule,
    TagModule,
    ChartModule,
  ],
  exports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    TooltipModule,
    ToolbarModule,
    TableModule,
    CardModule,
    InputTextareaModule,
    InputMaskModule,
    AutoCompleteModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    CalendarModule,
    TagModule,
    ChartModule
  ],
  providers: []
})
export class PrimeNgModule { }
