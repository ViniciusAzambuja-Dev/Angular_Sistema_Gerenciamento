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
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { ActivityResponse } from '../../../../models/interfaces/activity/ActivityResponse';
import { ActivityUpdate } from '../../../../models/interfaces/activity/ActivityUpdate';
import { ActivityEvent } from '../../../../models/enums/activity/ActivityEvent';

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
  public activityAction!: {
    event: EventAction;
    activitiesDatas: Array<ActivityResponse>
  };
  public activitySelectedDatas!: ActivityResponse;

  public status = [
    { name: 'ABERTA' },
    { name: 'EM_ANDAMENTO' },
    { name: 'CONCLUIDA' },
    { name: 'PAUSADA' },
  ];

  public addActivityForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.maxLength(50)]],
    descricao: ['', Validators.maxLength(200)],
    data_inicio: ['', Validators.required],
    data_fim: ['', Validators.required],
    status: ['', Validators.required],
    projetoId: [0, Validators.required],
    usuarioId: [0, Validators.required],
    integrantesIds: [[] as UserResponse[], Validators.required]
  })

  public editActivityForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.maxLength(50)]],
    descricao: ['', Validators.maxLength(200)],
    data_inicio: ['', Validators.required],
    data_fim: ['', Validators.required],
    status: ['', Validators.required],
    atividadeId: [0, Validators.required],
    projetoId: [0, Validators.required],
    usuarioId: [0, Validators.required],
  });

  public addActivityAction = ActivityEvent.ADD_ACTIVITY_EVENT;
  public editActivityAction = ActivityEvent.EDIT_ACTIVITY_EVENT;

  constructor(
    private activityService: ActivityService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.activityAction = this.ref.data;

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

          if(this.activityAction?.event?.action === this.editActivityAction && this.activityAction?.activitiesDatas) {
            this.getActivitySelectedDatas(Number(this.activityAction?.event?.id))
          }
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
    if(this.addActivityForm?.value
      && this.addActivityForm?.valid
      && this.addActivityForm.value.nome?.trim() !== ""
    ) {
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

  submitEditActivity(): void {
    if(this.editActivityForm.value
      && this.editActivityForm.valid
      && this.activityAction.event.id
      && this.editActivityForm.value.nome?.trim() !== ""
    ) {
      const requestEditActivity : ActivityUpdate = {
        nome: this.editActivityForm.value.nome as string,
        descricao: this.editActivityForm.value.descricao as string || '',
        data_inicio: this.editActivityForm.value.data_inicio as string,
        data_fim: this.editActivityForm.value.data_fim as string,
        status: this.editActivityForm.value.status as string,
        atividadeId: Number(this.editActivityForm.value.atividadeId),
        projetoId: Number(this.editActivityForm.value.projetoId),
        usuarioId: Number(this.editActivityForm.value.usuarioId)
      };

      this.activityService
      .editActivity(requestEditActivity)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Atividade editada com sucesso`,
            life: 2500,
          });
          this.editActivityForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao editar atividade`,
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

  getActivitySelectedDatas(activityId: number): void {
    const allActivities = this.activityAction?.activitiesDatas;

    if(allActivities.length > 0) {
      const activityFiltered = allActivities.filter(
        (element) => element?.id === activityId
      );

      if(activityFiltered) {
        this.activitySelectedDatas = activityFiltered[0];

        const userSelected = this.usersDatas.find(
          (element) => element.nome === this.activitySelectedDatas.nomeUsuario
        );

        this.editActivityForm.patchValue({
          nome: this.activitySelectedDatas?.nome,
          descricao: this.activitySelectedDatas?.descricao,
          data_inicio: this.activitySelectedDatas?.data_inicio,
          data_fim: this.activitySelectedDatas?.data_fim,
          status: this.activitySelectedDatas?.status,
          atividadeId: this.activitySelectedDatas?.id,
          usuarioId: userSelected?.id || null
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
