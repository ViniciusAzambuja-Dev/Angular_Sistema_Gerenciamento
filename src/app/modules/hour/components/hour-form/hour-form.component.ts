import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ActivityService } from '../../../../services/activity/activity.service';

@Component({
  selector: 'app-hour-form',
  templateUrl: './hour-form.component.html',
  styleUrl: './hour-form.component.scss'
})
export class HourFormComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  public activitiesDatas: Array<void> = [];

  constructor(
    private activityService: ActivityService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {}

  public addHourForm = this.formBuilder.group({
    descricao: ['', Validators.maxLength(200)],
    data_inicio: ['', Validators.required],
    data_fim: ['', Validators.required],
    atividadeId: ['', Validators.required],
    usuarioId: ['', Validators.required]
  })

  ngOnInit(): void {
    this.getAllActivities();
  }

  getAllActivities(): void {

  }

  submitHourForm(): void {}


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
