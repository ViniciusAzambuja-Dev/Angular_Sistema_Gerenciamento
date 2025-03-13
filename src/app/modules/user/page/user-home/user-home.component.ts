import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

import { DeleteAction } from '../../../../models/interfaces/events/DeleteAction';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { UserResponse } from '../../../../models/interfaces/user/UserResponse';
import { UserService } from '../../../../services/user/user.service';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject;
  public usersDatas: Array<UserResponse> = [];
  private ref!: DynamicDialogRef;

  constructor(
    private confirmationService: ConfirmationService,
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
          event: event,
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

  handleDeleteUserAction(event : DeleteAction): void {
    if(event){
      this.confirmationService.confirm({
        message: `Confirma a exclusão do usuário: ${event?.name}?`,
        header: `Confirmação de exclusão`,
        icon: 'bx bxs-error-circle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteUser(event?.id),
        acceptButtonStyleClass: 'custom-accept-button',
        rejectButtonStyleClass: 'custom-reject-button'
      });
    }
  }

  deleteUser(userId: number) {
    if(userId) {
      this.userService.deleteUser(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successo',
            detail: 'Usuário removido com sucesso!',
            life: 2500,
          });

          this.getUserDatas();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao remover usuário!',
            life: 2500,
          });
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
