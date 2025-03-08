import { ReportService } from './../../../../services/report/report.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ProjectResponse } from '../../../../models/interfaces/project/ProjectResponse';
import { ActivityResponse } from '../../../../models/interfaces/activity/ActivityResponse';

@Component({
  selector: 'app-period-report',
  templateUrl: './period-report.component.html',
  styleUrl: './period-report.component.scss'
})
export class PeriodReportComponent implements OnInit, OnDestroy {
  private destroy$ : Subject<void> = new Subject;
  public projectsDatas: ProjectResponse[] = [];
  public activitiesDatas: ActivityResponse[] = [];
  public selectedEntity!: string;
  public startDate!: Date;
  public endDate!: Date;

  constructor(
    private reportService: ReportService,
    private messageService: MessageService
  ) {
  }

  public entities = [
    {name: "Projetos"},
    {name: "Atividades"},
    {name: "Horas lançadas"}
  ]

  ngOnInit(): void {
  }

  handleFilter(): void {
    if(!this.selectedEntity || this.selectedEntity == ''
      || !this.startDate || !this.endDate
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção:',
        detail: 'Preencha os campos',
        life: 2500
      });
      return;
    }
    if(!this.isDateValid(this.startDate, this.endDate)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro:',
        detail: 'Período inicial deve ser menor que o final',
        life: 2500
      });
      return;
    }

    switch (this.selectedEntity) {
      case "Projetos":
        this.getProjectByPeriod();
        break;
      case "Atividades":
        this.getActivitiesByPeriod();
        break;
      default:
        break;
    }
  }

  getProjectByPeriod(): void {
    const initialPeriod = this.formatDate(this.startDate);
    const finalPeriod = this.formatDate(this.endDate);

    this.reportService.getProjectsByPeriod(initialPeriod, finalPeriod)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.projectsDatas = response
        }
        else {
          this.messageService.add({
            severity: 'info',
            summary: 'Informação:',
            detail: 'Nenhum projeto encontrado',
            life: 2500
          });
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro:',
          detail: 'Erro ao buscar projetos',
          life: 2500
        });
      }
    })
  }

  getActivitiesByPeriod(): void {
    const initialPeriod = this.formatDate(this.startDate);
    const finalPeriod = this.formatDate(this.endDate);

    this.reportService.getActivitiesByPeriod(initialPeriod, finalPeriod)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.activitiesDatas = response
        }
        else {
          this.messageService.add({
            severity: 'info',
            summary: 'Informação:',
            detail: 'Nenhuma atividade encontrada',
            life: 2500
          });
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro:',
          detail: 'Erro ao buscar atividades',
          life: 2500
        });
      }
    })
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');

    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  isDateValid(initialPeriod: Date, finalPeriod: Date) : boolean {
    if(initialPeriod > finalPeriod) {
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
