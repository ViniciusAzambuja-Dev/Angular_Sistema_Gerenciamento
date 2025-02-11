import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from '../../../../services/project/project.service';
import { MessageService } from 'primeng/api';
import { ProjectResponse } from '../../../../models/interfaces/project/ProjectResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrl: './project-home.component.scss'
})
export class ProjectHomeComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject;
  public projectsDatas: Array<ProjectResponse> = [];

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjectDatas();
  }

  getProjectDatas(): void {
    this.projectService
    .getAllProjects()
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
          summary: 'Erro',
          detail: 'Erro ao buscar projetos',
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
