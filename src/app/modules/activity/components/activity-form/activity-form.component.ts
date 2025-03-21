import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable, Subject, takeUntil } from 'rxjs';

import { ActivityEvent } from '../../../../models/enums/activity/ActivityEvent';
import { ActivityRequest } from '../../../../models/interfaces/activity/ActivityRequest';
import { ActivityResponse } from '../../../../models/interfaces/activity/ActivityResponse';
import { ActivityUpdate } from '../../../../models/interfaces/activity/ActivityUpdate';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { ProjectResponse } from '../../../../models/interfaces/project/ProjectResponse';
import { UserResponse } from '../../../../models/interfaces/user/UserResponse';
import { ActivityService } from '../../../../services/activity/activity.service';
import { ProjectService } from '../../../../services/project/project.service';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.scss'
})
export class ActivityFormComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  public usersDatas: Array<UserResponse> = [];
  public projectsDatas: Array<ProjectResponse> = [];
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

    this.getAllProjects();
  }

  onProjectChange(event: any) {
    if(event) {
      const projectId = event.value;

      this.getProjectMembers(projectId).subscribe({
        next : (response) => {
          if(response.length > 0) {
            this.usersDatas = response
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao buscar dados dos integrantes`,
            life: 2500,
          });
        },
      });
    }
  }

  getProjectMembers(projectId: number): Observable<Array<UserResponse>> {
    return this.userService.getProjectMembers(projectId)
    .pipe(
      takeUntil(this.destroy$)
    );
  }

  getAllProjects(): void {
    this.projectService.getAllProjects()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.projectsDatas = response;

          if(this.activityAction?.event?.action === this.editActivityAction && this.activityAction?.activitiesDatas) {
            this.getActivitySelectedDatas(Number(this.activityAction?.event?.id))
          }
        }
      },
    });
  }

  submitActivityForm() {
    if(this.addActivityForm?.value
      && this.addActivityForm?.valid
      && this.addActivityForm.value.nome?.trim() !== ""
    ) {
      if(!this.isDateValid(
        this.addActivityForm.value.data_inicio as string,
        this.addActivityForm.value.data_fim as string
      )) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Data inicial deve ser menor que a data final`,
          life: 2500,
        });
        return;
      }
      const integrantesIds = this.addActivityForm.value.integrantesIds?.map(user => user.id);
      const data_inicio = this.formatDate(this.addActivityForm.value.data_inicio as string);
      const data_fim = this.formatDate(this.addActivityForm.value.data_fim as string);

      const activityRequest: ActivityRequest = {
        nome: this.addActivityForm.value.nome as string,
        descricao: this.addActivityForm.value.descricao as string || '',
        data_inicio: data_inicio,
        data_fim: data_fim,
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
      && this.editActivityForm.value.data_inicio
      && this.editActivityForm.value.data_fim
    ) {

      if(!this.isDateValid(
        this.editActivityForm.value.data_inicio,
        this.editActivityForm.value.data_fim
      )) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Data inicial deve ser menor que a data final`,
          life: 2500,
        });
        return;
      }

      const data_inicio = typeof this.editActivityForm.value.data_inicio === "string"
      ? this.editActivityForm.value.data_inicio
      : this.formatDate(this.editActivityForm.value.data_inicio as string);

      const data_fim = typeof this.editActivityForm.value.data_fim === "string"
      ? this.editActivityForm.value.data_fim
      : this.formatDate(this.editActivityForm.value.data_fim as string);

      const requestEditActivity : ActivityUpdate = {
        nome: this.editActivityForm.value.nome as string,
        descricao: this.editActivityForm.value.descricao as string || '',
        data_inicio: data_inicio,
        data_fim: data_fim,
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

        const projectSelected = this.projectsDatas.find(
          (element) => element.nome === this.activitySelectedDatas.nomeProjeto
        );

        this.getProjectMembers(Number(projectSelected?.id)).subscribe({
          next: (response) => {
            if(response.length > 0) {
              this.usersDatas = response

              const userSelected = this.usersDatas.find(
                (element) => element.nome === this.activitySelectedDatas.nomeUsuario
              );

              this.editActivityForm.setValue({
                nome: this.activitySelectedDatas?.nome,
                descricao: this.activitySelectedDatas?.descricao,
                status: this.activitySelectedDatas?.status,
                data_inicio: this.activitySelectedDatas?.data_inicio,
                data_fim: this.activitySelectedDatas?.data_fim,
                atividadeId: this.activitySelectedDatas?.id,
                projetoId: projectSelected?.id || null,
                usuarioId: userSelected?.id || null
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao buscar dados dos integrantes`,
              life: 2500,
            });
          },
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

  isDateValid(startDate: string | Date, endDate: string | Date): boolean {
    const start = typeof startDate === 'string' ? new Date(startDate.split('/').reverse().join('-')) : new Date(startDate);

    const end = typeof endDate === 'string' ? new Date(endDate.split('/').reverse().join('-')) : new Date(endDate);

    return start <= end;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
