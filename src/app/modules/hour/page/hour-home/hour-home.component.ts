import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HourResponse } from '../../../../models/interfaces/hour/HourResponse';
import { HourService } from '../../../../services/hour/hour.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HourFormComponent } from '../../components/hour-form/hour-form.component';

@Component({
  selector: 'app-hour-home',
  templateUrl: './hour-home.component.html',
  styleUrl: './hour-home.component.scss'
})
export class HourHomeComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject;
  public hoursDatas: Array<HourResponse> = [];
  private ref!: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private hourService: HourService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHourDatas();
  }

  getHourDatas(): void {
    this.hourService
    .getAllProjects()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.hoursDatas = response;
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar horas lançadas',
          life: 2500,
        });
        this.router.navigate(['/dashboard']);
      },
    });
  }

  handleHourAction(event: EventAction): void {
    if(event) {
      this.ref = this.dialogService.open(HourFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: { overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event.action,
          hoursDatas: this.hoursDatas,
        },
      });
      this.ref.onClose
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.getHourDatas(),
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
