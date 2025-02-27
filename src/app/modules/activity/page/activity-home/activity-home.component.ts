import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivityResponse } from '../../../../models/interfaces/activity/ActivityResponse';
import { ActivityService } from '../../../../services/activity/activity.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { ActivityFormComponent } from '../../components/activity-form/activity-form.component';
import { DeleteAction } from '../../../../models/interfaces/events/DeleteAction';
import { HourService } from '../../../../services/hour/hour.service';

@Component({
  selector: 'app-activity-home',
  templateUrl: './activity-home.component.html',
  styleUrl: './activity-home.component.scss'
})
export class ActivityHomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject;
  private ref!: DynamicDialogRef;
  public activitiesDatas: Array<ActivityResponse> = [];

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private activityService: ActivityService,
    private hourService: HourService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getActivityDatas();
  }

  getActivityDatas(): void {
    this.activityService
    .getAllActivities()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.activitiesDatas = response;
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar atividades',
          life: 2500,
        });
        this.router.navigate(['/dashboard']);
      },
    });
  }

  handleGetHour(activityId: number): void {
    this.hourService.getHourByActivity(activityId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response) {
          const activityIndex = this.activitiesDatas.findIndex(activity => activity.id === activityId)

          this.activitiesDatas[activityIndex] = {
            ...this.activitiesDatas[activityIndex],
            horasLancadas: response
          }
        }
      },
    });
  }

  handleActivityAction(event: EventAction) : void {
    if(event) {
      this.ref = this.dialogService.open(ActivityFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: { overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
          activitiesDatas: this.activitiesDatas,
        },
      });
      this.ref.onClose
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.getActivityDatas(),
        });
    }
  }

  handleDeleteActivityAction(event : DeleteAction): void {
    if(event){
      this.confirmationService.confirm({
        message: `Confirma a exclusão da atividade: ${event?.name}?`,
        header: `Confirmação de exclusão`,
        icon: 'bx bxs-error-circle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteActivity(event?.id),
        acceptButtonStyleClass: 'custom-accept-button',
        rejectButtonStyleClass: 'custom-reject-button'
      });
    }
  }

  deleteActivity(activityId: number) {
    if(activityId) {
      this.activityService.deleteActivity(activityId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successo',
            detail: 'Atividade removida com sucesso!',
            life: 2500,
          });

          this.getActivityDatas();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao remover atividade!',
            life: 2500,
          });
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
