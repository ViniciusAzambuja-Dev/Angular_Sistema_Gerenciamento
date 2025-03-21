import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

import { ProjectResponse } from '../../../../models/interfaces/project/ProjectResponse';
import { ReportProject } from '../../../../models/interfaces/report/Project/ReportProject';
import { ReportService } from '../../../../services/report/report.service';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrl: './project-report.component.scss'
})
export class ProjectReportComponent implements OnInit, OnDestroy{
  @Input() projectsDatas: ProjectResponse[] = []
  private destroy$ : Subject<void> = new Subject;
  public selectedProjectId!: number;
  public reportDatas!: ReportProject;

  public barChartDatas!: ChartData;
  public barChartOptions!: ChartOptions;

  constructor(
    private reportService: ReportService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
  }

  getReportDatas(): void {
    if(!this.selectedProjectId || isNaN(this.selectedProjectId)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção:',
        detail: 'Selecione um projeto',
        life: 2500
      });
      return;
    }
    this.reportService.getProjectReport(this.selectedProjectId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response) {
          this.reportDatas = response;
          if(this.reportDatas.dadosGraficoBarras.length > 0) {
            this.setChartConfig();
          }
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

  setChartConfig(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barChartDatas = {
      labels: this.reportDatas.dadosGraficoBarras.map((element) => element?.nome),
      datasets: [
        {
          label: 'Quantidade',
          backgroundColor: documentStyle.getPropertyValue('--home-image-background'),
          borderColor: documentStyle.getPropertyValue('--home-image-background'),
          hoverBackgroundColor: documentStyle.getPropertyValue('--chart-hover-color'),
          data: this.reportDatas.dadosGraficoBarras.map((element) => element?.totalHoras),
          barThickness: 18,
        },
      ]
    };
    this.barChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1.3,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
          }
        }
      }
    };
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
