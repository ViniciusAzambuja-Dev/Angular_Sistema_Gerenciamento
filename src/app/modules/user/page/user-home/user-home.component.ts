import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserResponse } from '../../../../models/interfaces/user/UserResponse';
import { UserService } from '../../../../services/user/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent {
  private destroy$: Subject<void> = new Subject;
  public usersDatas: Array<UserResponse> = [];
  private ref!: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserDatas();
  }

  getUserDatas(): void {
    this.userService
    .getAllUsers()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.usersDatas = response;
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar usuários',
          life: 2500,
        });
        this.router.navigate(['/dashboard']);
      },
    });
  }

  handleUserAction(event: EventAction): void {
    if(event) {
      this.ref = this.dialogService.open(UserFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: { overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event.action,
          usersDatas: this.usersDatas,
        },
      });
      this.ref.onClose
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.getUserDatas(),
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
