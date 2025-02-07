import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/enviroment';
import { LoginRequest } from '../../models/interfaces/usuario/auth/LoginRequest';
import { LoginResponse } from '../../models/interfaces/usuario/auth/LoginResponse';
import { SignUpRequest } from '../../models/interfaces/usuario/signUp/SignUpRequest';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USUARIO_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) { }

  autenticaUsuario(loginRequest: LoginRequest) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/usuarios/auth/login`, loginRequest);
  }

  signupUser(signUpRequest: SignUpRequest): Observable<void> {
    return this.http.post<void>(
      `${this.API_URL}/usuarios/registrar`,
      signUpRequest,
      this.httpOptions
    );
  }
}
