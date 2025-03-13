import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

import { ProjectEvent } from '../../../../models/enums/project/ProjectEvent';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { ProjectRequest } from '../../../../models/interfaces/project/ProjectRequest';
import { ProjectResponse } from '../../../../models/interfaces/project/ProjectResponse';
import { ProjectUpdate } from '../../../../models/interfaces/project/ProjectUpdate';
import { UserResponse } from '../../../../models/interfaces/user/UserResponse';
import { ProjectService } from '../../../../services/project/project.service';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject();
  public usersDatas: Array<UserResponse> = [];
  public projectAction!: {
    event: EventAction;
    projectsDatas: Array<ProjectResponse>;
  }
  public projectSelectedDatas!: ProjectResponse;

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private userService: UserService,
    private ref: DynamicDialogConfig
  ) {}

  public priorities = [
    { name: 'ALTA' },
    { name: 'MEDIA' },
    { name: 'BAIXA' }
  ];

  public status = [
    { name: 'PLANEJADO' },
    { name: 'EM_ANDAMENTO' },
    { name: 'CONCLUIDO' },
    { name: 'CANCELADO' },
  ];

  public addProjectForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.maxLength(50)]],
    descricao: ['', Validators.maxLength(200)],
    data_inicio: ['', Validators.required],
    data_fim: ['', Validators.required],
    status: ['', Validators.required],
    prioridade: ['', Validators.required],
    usuarioId: [0, Validators.required],
    integrantesIds: [[] as UserResponse[], Validators.required]
  })

  public editProjectForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.maxLength(50)]],
    descricao: ['', Validators.maxLength(200)],
    data_inicio: ['', Validators.required],
    data_fim: ['', Validators.required],
    status: ['', Validators.required],
    prioridade: ['', Validators.required],
    projetoId: [0, Validators.required],
    usuarioId: [0, Validators.required],
  });

  public addProjectAction = ProjectEvent.ADD_PROJECT_EVENT;
  public editProjectAction = ProjectEvent.EDIT_PROJECT_EVENT;

  ngOnInit(): void {
    this.projectAction = this.ref.data;

    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.usersDatas = response;

          if(this.projectAction?.event?.action === this.editProjectAction && this.projectAction?.projectsDatas) {
            this.getProjectSelectedDatas(Number(this.projectAction?.event?.id))
          }
        }
      },
    });
  }

  submitProjectForm(): void {
    if(this.addProjectForm?.value
      && this.addProjectForm?.valid
      && this.addProjectForm.value.nome?.trim() !== ""
    ) {

      if(!this.isDateValid(
        this.addProjectForm.value.data_inicio as string,
        this.addProjectForm.value.data_fim as string
      )) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Data inicial deve ser menor que a data final`,
          life: 2500,
        });
        return;
      }

      const integrantesIds = this.addProjectForm.value.integrantesIds?.map(user => user.id);
      const data_inicio = this.formatDate(this.addProjectForm.value.data_inicio as string);
      const data_fim = this.formatDate(this.addProjectForm.value.data_fim as string);

      const projectRequest: ProjectRequest = {
        nome: this.addProjectForm.value.nome as string,
        descricao: this.addProjectForm.value.descricao as string || '',
        data_inicio: data_inicio,
        data_fim: data_fim,
        status: this.addProjectForm.value.status as string,
        prioridade: this.addProjectForm.value.prioridade as string,
        usuarioId: Number(this.addProjectForm.value.usuarioId),
        integrantesIds: integrantesIds as number[]
      }

      this.projectService.createProject(projectRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.addProjectForm.reset();

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Projeto cadastrado com sucesso`,
            life: 2500,
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao criar projeto`,
            life: 2500,
          });
        },
      });
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: `Campos inválidos`,
        life: 2500,
      });
    }
  }

  submitEditProject(): void {
    if(this.editProjectForm.value
      && this.editProjectForm.valid
      && this.projectAction.event.id
      && this.editProjectForm.value.nome?.trim() !== ""
      && this.editProjectForm.value.data_inicio
      && this.editProjectForm.value.data_fim
    ) {

      if(!this.isDateValid(
        this.editProjectForm.value.data_inicio as string,
        this.editProjectForm.value.data_fim as string
      )) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Data inicial deve ser menor que a data final`,
          life: 2500,
        });
        return;
      }
      const data_inicio = typeof this.editProjectForm.value.data_inicio === "string"
      ? this.editProjectForm.value.data_inicio
      : this.formatDate(this.editProjectForm.value.data_inicio as string);

      const data_fim = typeof this.editProjectForm.value.data_fim === "string"
      ? this.editProjectForm.value.data_fim
      : this.formatDate(this.editProjectForm.value.data_fim as string);

      const requestEditProject : ProjectUpdate = {
        nome: this.editProjectForm.value.nome as string,
        descricao: this.editProjectForm.value.descricao as string || '',
        data_inicio: data_inicio,
        data_fim: data_fim,
        status: this.editProjectForm.value.status as string,
        prioridade: this.editProjectForm.value.prioridade as string,
        projetoId: Number(this.editProjectForm.value.projetoId),
        usuarioId: Number(this.editProjectForm.value.usuarioId)
      };

      this.projectService
      .editProject(requestEditProject)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Projeto editado com sucesso`,
            life: 2500,
          });
          this.editProjectForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao editar projeto`,
            life: 2500,
          });
        }
      });
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: `Campos inválidos`,
        life: 2500,
      });
    }
  }

  getProjectSelectedDatas(projectId: number): void {
    const allProjects = this.projectAction?.projectsDatas;

    if(allProjects.length > 0) {
      const projectFiltered = allProjects.filter(
        (element) => element?.id === projectId
      );

      if(projectFiltered) {
        this.projectSelectedDatas = projectFiltered[0];

        const userSelected = this.usersDatas.find(
          (element) => element.nome === this.projectSelectedDatas.nomeUsuario
        );

        this.editProjectForm.setValue({
          nome: this.projectSelectedDatas?.nome,
          descricao: this.projectSelectedDatas?.descricao,
          status: this.projectSelectedDatas?.status,
          data_inicio: this.projectSelectedDatas?.data_inicio,
          data_fim: this.projectSelectedDatas?.data_fim,
          prioridade: this.projectSelectedDatas?.prioridade,
          projetoId: this.projectSelectedDatas?.id,
          usuarioId: userSelected?.id || null
        });
      }
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');

    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  isDateValid(startDate: string, endDate: string) : boolean {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if(start > end) {
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
