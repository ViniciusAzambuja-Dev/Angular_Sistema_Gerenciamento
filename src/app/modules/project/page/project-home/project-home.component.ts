import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

import { DeleteAction } from '../../../../models/interfaces/events/DeleteAction';
import { ProjectResponse } from '../../../../models/interfaces/project/ProjectResponse';
import { ActivityService } from '../../../../services/activity/activity.service';
import { ProjectService } from '../../../../services/project/project.service';
import { ProjectFormComponent } from '../../components/project-form/project-form.component';
import { AuthGuardService } from './../../../../guards/auth-guard.service';
import { EventAction } from './../../../../models/interfaces/events/EventAction';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrl: './project-home.component.scss'
})
export class ProjectHomeComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject;
  private ref!: DynamicDialogRef;
  public projectsDatas: Array<ProjectResponse> = [];
  public filteredDatas: Array<ProjectResponse> = [];
  public userId!: number;

  constructor(
    private authGuardService: AuthGuardService,
    private confirmationService: ConfirmationService,
    private projectService: ProjectService,
    private activityService: ActivityService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.authGuardService.getLoggedUserId());

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
          this.filteredDatas = response;
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

  getProjectByUser(): void {
    this.projectService.getProjectByUser(this.userId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.filteredDatas = response;
        }
        else{
          this.messageService.add({
            severity: 'info',
            summary: 'Atenção',
            detail: 'Usuário não está relacionado a nenhum projeto',
            life: 2500,
          })
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar projetos',
          life: 2500,
        });
      }
    });
  }

  handleGetActivity(projectId: number): void {
    this.activityService.getActivityByProject(projectId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response) {
          const projectIndex = this.projectsDatas.findIndex(project => project.id === projectId)

          this.projectsDatas[projectIndex] = {
            ...this.projectsDatas[projectIndex],
            atividades: response
          }
        }
      },
    });
  }

  handleProjectAction(event: EventAction) : void {
    if(event) {
      this.ref = this.dialogService.open(ProjectFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: { overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
          projectsDatas: this.projectsDatas,
        },
      });
      this.ref.onClose
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.getProjectDatas(),
        });
    }
  }

  handleDeleteProjectAction(event: DeleteAction) {
    if(event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do projeto: ${event?.name}?`,
        header: `Confirmação de exclusão`,
        icon: 'bx bxs-error-circle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteProject(event?.id),
        acceptButtonStyleClass: 'custom-accept-button',
        rejectButtonStyleClass: 'custom-reject-button'
      });
    }
  }

  handleTableDatas(event: string): void {
    if(event) {
      if(event == "Relacionados") {
        this.getProjectByUser();
      }
      else {
        this.filteredDatas = this.projectsDatas;
      }
    }
  }

  deleteProject(projectId: number) {
    if(projectId) {
      this.projectService.deleteProject(projectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successo',
            detail: 'Projeto removido com sucesso!',
            life: 2500,
          });

          this.getProjectDatas();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao remover projeto!',
            life: 2500,
          });
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
