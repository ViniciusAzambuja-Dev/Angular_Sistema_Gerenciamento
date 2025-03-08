import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-period-report',
  templateUrl: './period-report.component.html',
  styleUrl: './period-report.component.scss'
})
export class PeriodReportComponent implements OnInit, OnDestroy {
  private destroy$ : Subject<void> = new Subject;
  public selectedEntity!: string;

  public entities = [
    {name: "Projetos"},
    {name: "Atividades"},
    {name: "Horas lançadas"}
  ]

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
