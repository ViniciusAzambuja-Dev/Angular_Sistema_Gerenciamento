import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../../services/user/user.service';
import { MessageService } from 'primeng/api';
import { SignUpRequest } from '../../../../models/interfaces/user/signUp/SignUpRequest';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { UserResponse } from '../../../../models/interfaces/user/UserResponse';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserEvent } from '../../../../models/enums/user/UserEvent';
import { UserUpdate } from '../../../../models/interfaces/user/UserUpdate';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject;
  public userAction!: {
    event: EventAction;
    usersDatas: Array<UserResponse>
  };
  public userSelectedDatas!: UserResponse;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService : MessageService,
    private ref: DynamicDialogConfig
  ) {
  }

  public profiles = [
    { name: 'ADMIN' },
    { name: 'USUARIO' }
  ];

  public signupForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', Validators.required],
    senha: ['', [Validators.required, Validators.maxLength(15)]],
    perfil: ['', Validators.required],
  });

  public editUserForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', Validators.required],
    senha: ['', [Validators.required, Validators.maxLength(15)]],
    perfil: ['', Validators.required],
    usuarioId: [0, Validators.required]
  })

  public addUserAction = UserEvent.ADD_USER_EVENT;
  public editUserAction = UserEvent.EDIT_USER_EVENT;

  ngOnInit(): void {
    this.userAction = this.ref.data;

    if(this.userAction?.event?.action === this.editUserAction && this.userAction?.usersDatas) {
      this.getUserSelectedDatas(Number(this.userAction?.event?.id))
    }
  }

  submitSignUpForm(): void {
    if(this.signupForm.value
      && this.signupForm.valid
      && this.signupForm.value.nome?.trim() !== ""
      && this.signupForm.value.email?.trim() !== ""
      && this.signupForm.value.senha?.trim() !== ""
    ) {
      this.userService.signupUser(this.signupForm.value as SignUpRequest)
      .pipe (
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
            this.signupForm.reset();

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Usuário cadastrado com sucesso`,
              life: 2500,
            });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao cadastrar usuário`,
            life: 2500,
          });
        },
      });
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro - Verifique se:',
        detail: `Os campos estão preenchidos corretamente `,
        life: 2500,
      });
    }
  }

  submitEditUser(): void {
    if(this.editUserForm.value
      && this.editUserForm.valid
      && this.userAction.event.id
      && this.editUserForm.value.nome?.trim() !== ""
      && this.editUserForm.value.email?.trim() !== ""
      && this.editUserForm.value.senha?.trim() !== ""
       ) {

      const requestEditUser : UserUpdate = {
        nome: this.editUserForm.value.nome as string,
        email: this.editUserForm.value.email as string,
        senha: this.editUserForm.value.senha as string,
        perfil: this.editUserForm.value.perfil as string,
        usuarioId: Number(this.editUserForm.value.usuarioId)
      };

      this.userService
      .editUser(requestEditUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Usuário editado com sucesso`,
            life: 2500,
          });
          this.editUserForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao editar usuário`,
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

  getUserSelectedDatas(userId: number): void {
    const allUsers = this.userAction?.usersDatas;

    if(allUsers.length > 0) {
      const userFiltered = allUsers.filter(
        (element) => element?.id === userId
      );

      if(userFiltered) {
        this.userSelectedDatas = userFiltered[0];

        this.editUserForm.patchValue({
          nome: this.userSelectedDatas?.nome,
          email: this.userSelectedDatas?.email,
          perfil: this.userSelectedDatas?.perfil,
          usuarioId: this.userSelectedDatas?.id,
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
