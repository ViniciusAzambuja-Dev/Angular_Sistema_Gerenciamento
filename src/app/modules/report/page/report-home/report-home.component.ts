import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

import { ProjectResponse } from '../../../../models/interfaces/project/ProjectResponse';
import { ProjectService } from '../../../../services/project/project.service';

@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrl: './report-home.component.scss'
})
export class ReportHomeComponent implements OnInit, OnDestroy{
  private destroy$ : Subject<void> = new Subject;
  public tabs: { title: string, content: string }[] = [];
  public projectsDatas: ProjectResponse[] = [];

  constructor(private projectService: ProjectService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.tabs = [
      { title: 'Projetos', content: 'project-report' },
      { title: 'Atividades', content: 'activity-report' },
      { title: 'Período', content: 'period-report'},
    ];

    this.getAllProjects();
  }

  getAllProjects(): void {
    this.projectService.getAllProjects()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.projectsDatas = response;
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro:',
          detail: 'Erro ao buscar projetos',
          life: 2500
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
