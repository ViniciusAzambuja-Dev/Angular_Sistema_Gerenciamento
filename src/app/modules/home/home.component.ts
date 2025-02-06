import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

import { LoginRequest } from '../../models/interfaces/usuario/auth/LoginRequest';
import { UsuarioService } from './../../services/usuario/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy{
  private destroy$ = new Subject<void>();

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    senha: ['', [Validators.required, Validators.maxLength(15)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private cookieService: CookieService,
    private messageService : MessageService) {
  }


  submitLoginForm(): void {
    if(this.loginForm.value && this.loginForm.valid) {
      this.usuarioService.autenticaUsuario(this.loginForm.value as LoginRequest)
        .subscribe({
          next: (response) => {
            if(response) {
              this.cookieService.set('USUARIO_INFO', response?.token);
              this.loginForm.reset();

              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Login efetuado com sucesso!`,
                life: 2000,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Email ou senha incorretos`,
              life: 2000,
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
