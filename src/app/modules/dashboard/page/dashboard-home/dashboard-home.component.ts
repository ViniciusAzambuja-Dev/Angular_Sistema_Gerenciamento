import { AuthGuardService } from './../../../../guards/auth-guard.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HourService } from '../../../../services/hour/hour.service';
import { HourResponse } from '../../../../models/interfaces/hour/HourResponse';
import { MessageService } from 'primeng/api';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { DashboardAdmin } from '../../../../models/interfaces/dashboard/DashboardAdmin';
import { ChartData, ChartOptions } from 'chart.js';
import { DashboardGeneral } from '../../../../models/interfaces/dashboard/DashboardGeneral';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject;
  public hoursDatas: Array<HourResponse> = [];
  public dashboardAdminDatas!: DashboardAdmin;
  public dashboardGeneralData!: DashboardGeneral;
  public chartDatas!: ChartData;
  public chartOptions!: ChartOptions;

  public dataFirstDoughnut!: ChartData;
  public dataSecondDoughnut!: ChartData;
  public dataThirdDoughnut!: ChartData;
  public doughnutOptions: any;

  public userRole!: string[];
  public userId!: number;

  constructor(
    private authGuardService: AuthGuardService,
    private hourService: HourService,
    private dashboardService: DashboardService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.userRole = this.authGuardService.getUserRoles();
    this.userId = Number(this.authGuardService.getLoggedUserId());

    if(this.userRole[0] === 'ADMIN'){
      this.getDashboardAdminDatas();
    }
    this.getHoursByUserAndMonth();
    this.getDashboardGeneralData();
  }

  setChartConfig(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartDatas = {
      labels: this.dashboardAdminDatas.chartDatas.map((element) => element?.nomeProjeto),
      datasets: [
        {
          label: 'Quantidade',
          backgroundColor: documentStyle.getPropertyValue('--home-image-background'),
          borderColor: documentStyle.getPropertyValue('--home-image-background'),
          hoverBackgroundColor: documentStyle.getPropertyValue('--chart-hover-color'),
          data: this.dashboardAdminDatas.chartDatas.map((element) => element?.totalHoras),
          barThickness: 25,
        },
      ]
    };
    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
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

  setDoughnutConfig() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const coresPrioridade: { [key: string]: string } = {
      BAIXA: documentStyle.getPropertyValue('--severity-second-color'),
      MEDIA: documentStyle.getPropertyValue('--severity-third-color'),
      ALTA: documentStyle.getPropertyValue('--severity-fourth-color')
    };

    const coresStatusProjetos: { [key: string]: string } = {
      CONCLUIDO: documentStyle.getPropertyValue('--severity-first-color'),
      PLANEJADO: documentStyle.getPropertyValue('--severity-second-color'),
      EM_ANDAMENTO: documentStyle.getPropertyValue('--severity-third-color'),
      CANCELADO: documentStyle.getPropertyValue('--severity-fourth-color')
    }

    const coresStatusAtividades: { [key: string]: string } = {
      CONCLUIDA: documentStyle.getPropertyValue('--severity-first-color'),
      ABERTA: documentStyle.getPropertyValue('--severity-second-color'),
      EM_ANDAMENTO: documentStyle.getPropertyValue('--severity-third-color'),
      PAUSADA: documentStyle.getPropertyValue('--severity-fourth-color')
    };

    this.dataFirstDoughnut = this.dashboardGeneralData.projPorPrioridade.length > 0
    ? {
      labels: this.dashboardGeneralData.projPorPrioridade.map(element => element.prioridade),
      datasets: [
        {
          label: 'Quantidade',
          data: this.dashboardGeneralData.projPorPrioridade.map(element => element.totalProjetos),
          backgroundColor: this.dashboardGeneralData.projPorPrioridade
            .map(element => coresPrioridade[element.prioridade]),
        }
      ]
    }
    : {
      labels: ['Nenhum dado'],
      datasets: [
        {
          data: [1],
          backgroundColor: ['#CCCCCC'],
        }
      ]
    };

    this.dataSecondDoughnut = this.dashboardGeneralData.projPorStatus.length > 0
    ? {
      labels: this.dashboardGeneralData.projPorStatus.map(p => p.status),
      datasets: [
        {
          label: 'Quantidade',
          data: this.dashboardGeneralData.projPorStatus.map(p => p.totalProjetos),
          backgroundColor: this.dashboardGeneralData.projPorStatus
          .map(element => coresStatusProjetos[element.status]),
        }
      ]
    }
    : {
      labels: ['Nenhum dado'],
      datasets: [
        {
          data: [1],
          backgroundColor: ['#CCCCCC'],
        }
      ]
    };

    this.dataThirdDoughnut = this.dashboardGeneralData.ativPorStatus.length > 0
    ? {
      labels: this.dashboardGeneralData.ativPorStatus.map(a => a.status),
      datasets: [
        {
          label: 'Quantidade',
          data: this.dashboardGeneralData.ativPorStatus.map(a => a.totalAtividades),
          backgroundColor: this.dashboardGeneralData.ativPorStatus
          .map(element => coresStatusAtividades[element.status]),
        }
      ]
    }
    : {
      labels: ['Nenhum dado'],
      datasets: [
        {
          data: [1],
          backgroundColor: ['#CCCCCC'],
        }
      ]
    };

    this.doughnutOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1.8,
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }

  getHoursByUserAndMonth(): void {
    this.hourService.getHoursByUserAndMonth(this.userId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.hoursDatas = response
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar horas lançadas',
          life: 2500
        });
      }
    });
  }

  getDashboardAdminDatas(): void {
    this.dashboardService.getDashboardAdminDatas()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response) {
          this.dashboardAdminDatas = response;
          this.setChartConfig();
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar métricas',
          life: 2500
        });
      }
    });
  }

  getDashboardGeneralData(): void {
    this.dashboardService.getDashboardGeneralData(this.userId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response) {
          this.dashboardGeneralData = response;
          this.setDoughnutConfig();
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar métricas gerais',
          life: 2500
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
