import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivityResponse } from '../../../../models/interfaces/activity/ActivityResponse';
import { ActivityService } from '../../../../services/activity/activity.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { ActivityFormComponent } from '../../components/activity-form/activity-form.component';

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
    private dialogService: DialogService,
    private activityService: ActivityService,
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
    this.activityService.getHourByActivity(activityId)
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
          event: event
        },
      });
      this.ref.onClose
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.getActivityDatas(),
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
