import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivityResponse } from '../../../../models/interfaces/activity/ActivityResponse';
import { ActivityService } from '../../../../services/activity/activity.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-home',
  templateUrl: './activity-home.component.html',
  styleUrl: './activity-home.component.scss'
})
export class ActivityHomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject;
  public activitiesDatas: Array<ActivityResponse> = [];

  constructor(
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
