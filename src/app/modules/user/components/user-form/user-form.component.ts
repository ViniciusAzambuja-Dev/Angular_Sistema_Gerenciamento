import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../../services/user/user.service';
import { MessageService } from 'primeng/api';
import { SignUpRequest } from '../../../../models/interfaces/user/signUp/SignUpRequest';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  private destroy$: Subject<void> = new Subject;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService : MessageService
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

  submitSignUpForm(): void {
    if(this.signupForm.value && this.signupForm.valid) {
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
}
