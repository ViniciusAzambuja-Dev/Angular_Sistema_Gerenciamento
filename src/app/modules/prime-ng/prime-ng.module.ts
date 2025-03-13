import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
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
    ProgressSpinnerModule,
    TabViewModule,
    MultiSelectModule,
    SidebarModule
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
    ChartModule,
    ProgressSpinnerModule,
    TabViewModule,
    MultiSelectModule,
    SidebarModule
  ],
  providers: []
})
export class PrimeNgModule { }
