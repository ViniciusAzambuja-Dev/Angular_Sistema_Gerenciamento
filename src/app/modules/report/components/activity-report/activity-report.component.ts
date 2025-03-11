import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

import { ActivityResponse } from '../../../../models/interfaces/activity/ActivityResponse';
import { ProjectResponse } from '../../../../models/interfaces/project/ProjectResponse';
import { ReportActivity } from '../../../../models/interfaces/report/Activity/ReportActivity';
import { ActivityService } from '../../../../services/activity/activity.service';
import { ReportService } from '../../../../services/report/report.service';

@Component({
  selector: 'app-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrl: './activity-report.component.scss'
})
export class ActivityReportComponent implements OnInit, OnDestroy {
  @Input() projectsDatas : ProjectResponse[] = [];
  private destroy$ : Subject<void> = new Subject;
  public selectedProjectId!: number;
  public selectedActivityId: number | null = null;
  public activitiesDatas : ActivityResponse[] = [];
  public reportDatas!: ReportActivity;

  constructor(
    private activityService: ActivityService,
    private reportService: ReportService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
  }

  getAllActivities(): void {
    this.selectedActivityId = null;
    this.activitiesDatas = [];
    if(this.selectedProjectId && !isNaN(this.selectedProjectId)) {

      this.activityService.getActivityByProject(this.selectedProjectId)
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
            summary: 'Erro:',
            detail: 'Erro ao buscar atividades',
            life: 2500
          })
        }
      });
    }
  }

  getReportDatas(): void {
    if(!this.selectedProjectId || isNaN(this.selectedProjectId)
      || !this.selectedActivityId || isNaN(this.selectedActivityId)
      || this.selectedProjectId === null || this.selectedActivityId === null) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção:',
        detail: 'Preencha os campos',
        life: 2500
      });
      return;
    }

    this.reportService.getActivityReport(this.selectedActivityId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response) {
          this.reportDatas = response;
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro:',
          detail: 'Erro ao buscar relatório',
          life: 2500
        })
      }
    });
  }

  getSeverityStatus(status: string): "success"  | "info" | "warning" | "danger" {
    const statusMap: { [key: string]: "success" | "info" | "warning" | "danger" } = {
      'ABERTA': 'info',
      'PAUSADA': 'danger',
      'EM_ANDAMENTO': 'warning',
      'CONCLUIDA': 'success',
    };
    return statusMap[status] || "info";
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
