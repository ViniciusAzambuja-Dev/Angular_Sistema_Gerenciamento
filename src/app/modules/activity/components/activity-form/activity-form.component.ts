import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from '../../../../services/project/project.service';
import { UserService } from '../../../../services/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserResponse } from '../../../../models/interfaces/user/UserResponse';
import { ProjectResponse } from '../../../../models/interfaces/project/ProjectResponse';
import { ActivityRequest } from '../../../../models/interfaces/activity/ActivityRequest';
import { ActivityService } from '../../../../services/activity/activity.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.scss'
})
export class ActivityFormComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  public usersDatas: Array<UserResponse> = [];
  public projectsDatas: Array<ProjectResponse> = [];
  public filterDatas: Array<UserResponse> = [];

  public status = [
    { name: 'ABERTA' },
    { name: 'EM_ANDAMENTO' },
    { name: 'CONCLUIDA' },
    { name: 'PAUSADA' },
  ];

  public addActivityForm = this.formBuider.group({
    nome: ['', [Validators.required, Validators.maxLength(50)]],
    descricao: ['', Validators.maxLength(200)],
    data_inicio: ['', Validators.required],
    data_fim: ['', Validators.required],
    status: ['', Validators.required],
    projetoId: ['', Validators.required],
    usuarioId: ['', Validators.required],
    integrantesIds: [[] as UserResponse[], Validators.required]
  })

  constructor(
    private activityService: ActivityService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private userService: UserService,
    private formBuider: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllProjects();
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

  getAllProjects(): void {
    this.projectService.getAllProjects()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.projectsDatas = response;
        }
      },
    });
  }

  submitActivityForm() {
    if(this.addActivityForm?.value && this.addActivityForm?.valid) {
      const integrantesIds = this.addActivityForm.value.integrantesIds?.map(user => user.id);

      const activityRequest: ActivityRequest = {
        nome: this.addActivityForm.value.nome as string,
        descricao: this.addActivityForm.value.descricao as string || '',
        data_inicio: this.addActivityForm.value.data_inicio as string,
        data_fim: this.addActivityForm.value.data_fim as string,
        status: this.addActivityForm.value.status as string,
        projetoId: Number(this.addActivityForm.value.projetoId),
        usuarioId: Number(this.addActivityForm.value.usuarioId),
        integrantesIds: integrantesIds as number[]
      }

      this.activityService.createActivity(activityRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.addActivityForm.reset();

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Atividade cadastrada com sucesso`,
            life: 2500,
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao criar atividade`,
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
