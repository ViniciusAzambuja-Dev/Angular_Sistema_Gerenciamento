import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ProjectService } from '../../../../services/project/project.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject();
  public usersDatas: Array<void> = [];

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
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
    descricao: ['', Validators.required, Validators.maxLength(200)],
    data_inicio: ['', Validators.required],
    data_fim: ['', Validators.required],
    status: ['', Validators.required],
    prioridade: ['', Validators.required],
    usuarioId: ['', Validators.required]
  })

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {}

  submitProjectForm(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
