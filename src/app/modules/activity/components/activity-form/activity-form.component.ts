import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from '../../../../services/project/project.service';
import { UserService } from '../../../../services/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserResponse } from '../../../../models/interfaces/user/UserResponse';
import { ProjectResponse } from '../../../../models/interfaces/project/ProjectResponse';
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

  submitActivityForm() {}


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
