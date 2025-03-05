import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrl: './report-home.component.scss'
})
export class ReportHomeComponent implements OnInit, OnDestroy{
  private destroy$ : Subject<void> = new Subject;
  public tabs: { title: string, content: string }[] = [];

  public priorityProject = [
    { name: 'ALTA' },
    { name: 'MEDIA' },
    { name: 'BAIXA' },
  ];

  public statusProject = [
    { name: 'PLANEJADO' },
    { name: 'EM_ANDAMENTO' },
    { name: 'CONCLUIDO' },
    { name: 'CANCELADO' },
  ];

  public statusActivity = [
    { name: 'ABERTA' },
    { name: 'EM_ANDAMENTO' },
    { name: 'CONCLUIDA' },
    { name: 'PAUSADA' },
  ];

  constructor(
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.tabs = [
      { title: 'Projetos', content: 'project-table' },
      { title: 'Atividades', content: 'activity-table' },
      { title: 'Horas lançadas', content: 'hour-table' }
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
