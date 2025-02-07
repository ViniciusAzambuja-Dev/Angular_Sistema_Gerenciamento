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
  public isLogin = true;

  public profiles = [
    { name: 'ADMIN' },
    { name: 'USUARIO' }
  ];

  public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    senha: ['', [Validators.required, Validators.maxLength(15)]],
  });

  public signupForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', Validators.required],
    senha: ['', [Validators.required, Validators.maxLength(15)]],
    perfil: ['', Validators.required],
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
        summary: 'Erro - Verifique se:',
        detail: `Os campos estão preenchidos. Senha possui até 15 caracteres.`,
        life: 2500,
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
