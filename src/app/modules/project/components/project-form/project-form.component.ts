import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from '../../../../services/project/project.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserResponse } from '../../../../models/interfaces/user/UserResponse';
import { UserService } from '../../../../services/user/user.service';
import { ProjectRequest } from '../../../../models/interfaces/project/ProjectRequest';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject();
  public usersDatas: Array<UserResponse> = [];
  public filterDatas: Array<UserResponse> = [];

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private userService: UserService
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
    usuarioId: ['', Validators.required],
    integrantesIds: [[] as UserResponse[], Validators.required]
  })

  ngOnInit(): void {
    this.getAllUsers();
  }

  searchUsers(event: AutoCompleteCompleteEvent):void {
    const query = event.query.toLowerCase();
    this.filterDatas = this.usersDatas.filter(user =>
      user.nome.toLowerCase().includes(query)
    );
  }

  getAllUsers(): void {
    this.userService.getAllUsers()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.usersDatas = response;
        }
      },
    });
  }

  submitProjectForm(): void {
    if(this.addProjectForm?.value && this.addProjectForm?.valid) {
      const integrantesIds = this.addProjectForm.value.integrantesIds?.map(user => user.id);

      const projectRequest: ProjectRequest = {
        nome: this.addProjectForm.value.nome as string,
        descricao: this.addProjectForm.value.descricao as string || '',
        data_inicio: this.addProjectForm.value.data_inicio as string,
        data_fim: this.addProjectForm.value.data_fim as string,
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
