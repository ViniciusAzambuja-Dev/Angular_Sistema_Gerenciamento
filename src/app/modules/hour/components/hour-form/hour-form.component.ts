import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ActivityService } from '../../../../services/activity/activity.service';
import { ActivityResponse } from '../../../../models/interfaces/activity/ActivityResponse';
import { HourService } from '../../../../services/hour/hour.service';
import { HourRequest } from '../../../../models/interfaces/hour/HourRequest';
import { UserService } from '../../../../services/user/user.service';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { HourResponse } from '../../../../models/interfaces/hour/HourResponse';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { HourEvent } from '../../../../models/enums/hour/HourEvent';
import { HourUpdate } from '../../../../models/interfaces/hour/HourUpdate';

@Component({
  selector: 'app-hour-form',
  templateUrl: './hour-form.component.html',
  styleUrl: './hour-form.component.scss'
})
export class HourFormComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  public activitiesDatas: Array<ActivityResponse> = [];
  public dropdownDatas: Array<{ id: number, nome: string }> = [];
  private usuarioId!: number;
  public hourAction!: {
    event: EventAction;
    hoursDatas: Array<HourResponse>
  };
  public hourSelectedDatas!: HourResponse;

  constructor(
    private hourService: HourService,
    private activityService: ActivityService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private ref: DynamicDialogConfig
  ) {}

  public addHourForm = this.formBuilder.group({
    descricao: ['', [Validators.required, Validators.maxLength(200)]],
    data_inicio: ['', Validators.required],
    data_fim: ['', Validators.required],
    atividadeId: ['', Validators.required]
  })

  public editHourForm = this.formBuilder.group({
    descricao: ['', [Validators.required, Validators.maxLength(200)]],
    data_inicio: ['', Validators.required],
    data_fim: ['', Validators.required],
    horaId: [0, Validators.required],
    atividadeId: [0, Validators.required]
  })

  public addHourAction = HourEvent.ADD_HOUR_EVENT;
  public editHourAction = HourEvent.EDIT_HOUR_EVENT;

  ngOnInit(): void {
    this.usuarioId = Number(this.userService.getLoggedUserId());
    this.hourAction = this.ref.data;

    this.getAllActivities();
  }

  getAllActivities(): void {
    this.activityService.getAllActivities()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.activitiesDatas = response;

          this.dropdownDatas = response.map(activity => ({
            id: activity.id,
            nome: `[${activity.nomeProjeto}] ${activity.nome}`
          }));

          if(this.hourAction?.event?.action === this.editHourAction && this.hourAction?.hoursDatas) {
            this.getHourSelectedDatas(Number(this.hourAction?.event?.id))
          }
        }
      },
    });
  }

  submitHourForm(): void {
    if(this.addHourForm?.value && this.addHourForm?.valid) {
      const data_inicio = this.formatHour(this.addHourForm.value.data_inicio as string);
      const data_fim = this.formatHour(this.addHourForm.value.data_fim as string);

      if(!this.isHourValid(data_inicio, data_fim)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Horário inicial deve ser menor que o horário final`,
          life: 2500,
        });
        return;
      }

      const hourRequest: HourRequest = {
        descricao: this.addHourForm.value.descricao as string,
        data_inicio: data_inicio,
        data_fim: data_fim,
        atividadeId: Number(this.addHourForm.value.atividadeId),
        usuarioId: this.usuarioId,
      }

      this.hourService.createHour(hourRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.addHourForm.reset();

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Hora lançada com sucesso`,
            life: 2500,
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao lançar hora`,
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

  submitEditHour(): void {
    if(this.editHourForm.value && this.editHourForm.valid &&
      this.hourAction.event.id && this.editHourForm.value.descricao?.trim() !== ""
    ) {
      const data_inicio = this.formatHour(this.editHourForm.value.data_inicio as string);
      const data_fim = this.formatHour(this.editHourForm.value.data_fim as string);

      if(!this.isHourValid(data_inicio, data_fim)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Horário inicial deve ser menor que o horário final`,
          life: 2500,
        });
        return;
      }

      const requestEditHour : HourUpdate = {
        descricao: this.editHourForm.value.descricao as string,
        data_inicio: data_inicio,
        data_fim: data_fim,
        horaId: Number(this.editHourForm.value.horaId),
        atividadeId: Number(this.editHourForm.value.atividadeId),
      };

      this.hourService
      .editHour(requestEditHour)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Hora lançada editada com sucesso`,
            life: 2500,
          });
          this.editHourForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao editar hora lançada`,
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

  getHourSelectedDatas(hourId: number): void {
    const allHours = this.hourAction?.hoursDatas;

    if(allHours.length > 0) {
      const hourFiltered = allHours.filter(
        (element) => element?.id === hourId
      );

      if(hourFiltered) {
        this.hourSelectedDatas = hourFiltered[0];

        const activitySelected = this.activitiesDatas.find(
          (element) => element.nome === this.hourSelectedDatas.nomeAtividade
        );

        this.editHourForm.patchValue({
          descricao: this.hourSelectedDatas?.descricao,
          horaId: this.hourSelectedDatas?.id,
          atividadeId: activitySelected?.id || null,
        });
      }
    }
  }

  formatHour(dateString: string): string {
    const date = new Date(dateString);

    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hour}:${minutes}`;
  }

  isHourValid(startDate: string, endDate: string) : boolean {
    const [startHour, startMinute] = startDate.split(":").map(Number);
    const [endHour, endMinutes] = endDate.split(":").map(Number);

    const startTotal = startHour * 60 + startMinute;
    const endTotal = endHour * 60 + endMinutes;

    if(startTotal >= endTotal) {
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
