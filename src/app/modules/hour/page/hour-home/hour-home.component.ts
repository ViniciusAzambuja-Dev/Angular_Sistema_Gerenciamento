import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HourResponse } from '../../../../models/interfaces/hour/HourResponse';
import { HourService } from '../../../../services/hour/hour.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hour-home',
  templateUrl: './hour-home.component.html',
  styleUrl: './hour-home.component.scss'
})
export class HourHomeComponent {
  private destroy$: Subject<void> = new Subject;
  public hoursDatas: Array<HourResponse> = [];

  constructor(
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
