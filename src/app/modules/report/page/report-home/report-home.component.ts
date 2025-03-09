import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrl: './report-home.component.scss'
})
export class ReportHomeComponent implements OnInit, OnDestroy{
  private destroy$ : Subject<void> = new Subject;
  public tabs: { title: string, content: string }[] = [];

  constructor() {}

  ngOnInit(): void {
    this.tabs = [
      { title: 'Projetos', content: 'project-report' },
      { title: 'Atividades', content: 'activity-report' },
      { title: 'Período', content: 'period-report'},
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
