import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

import { LoginRequest } from '../../models/interfaces/user/auth/LoginRequest';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy{
  private destroy$ = new Subject<void>();

  public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    senha: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService : MessageService,
    private router: Router) {
  }

  submitLoginForm(): void {
    if(this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as LoginRequest)
        .pipe (
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            if(response) {
              this.cookieService.set('USUARIO_INFO', response?.token);
              this.loginForm.reset();
              this.router.navigate(['/dashboard']);

              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Login efetuado com sucesso!`,
                life: 2500,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Email ou senha incorretos`,
              life: 2500,
            });
          },
        });
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro:',
        detail: `Os campos não podem estar vazios`,
        life: 2500,
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
