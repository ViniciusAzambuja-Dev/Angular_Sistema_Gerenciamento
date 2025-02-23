import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ActivityService } from '../../../../services/activity/activity.service';
import { ActivityResponse } from '../../../../models/interfaces/activity/ActivityResponse';
import { HourService } from '../../../../services/hour/hour.service';
import { HourRequest } from '../../../../models/interfaces/hour/HourRequest';
import { UserService } from '../../../../services/user/user.service';

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

  constructor(
    private hourService: HourService,
    private activityService: ActivityService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {}

  public addHourForm = this.formBuilder.group({
    descricao: ['', [Validators.required, Validators.maxLength(200)]],
    data_inicio: ['', Validators.required],
    data_fim: ['', Validators.required],
    atividadeId: ['', Validators.required]
  })

  ngOnInit(): void {
    this.usuarioId = Number(this.userService.getLoggedUserId());

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
