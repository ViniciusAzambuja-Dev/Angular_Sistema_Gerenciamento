import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/enviroment';
import { LoginRequest } from '../../models/interfaces/user/auth/LoginRequest';
import { LoginResponse } from '../../models/interfaces/user/auth/LoginResponse';
import { SignUpRequest } from '../../models/interfaces/user/signUp/SignUpRequest';
import { UserResponse } from '../../models/interfaces/user/UserResponse';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USUARIO_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private messageService: MessageService,
    private router: Router) { }

  authUser(loginRequest: LoginRequest) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/usuarios/auth/login`, loginRequest);
  }

  signupUser(signUpRequest: SignUpRequest): Observable<void> {
    return this.http.post<void>(
      `${this.API_URL}/usuarios/registrar`,
      signUpRequest,
      this.httpOptions
    );
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookie.get('USUARIO_INFO');

    return JWT_TOKEN ? true : false;
  }

  getAllUsers(): Observable<Array<UserResponse>> {
    return this.http.get<Array<UserResponse>>(
      `${this.API_URL}/usuarios/listar`,
      this.httpOptions
    )
  }

  decodeToken(): any {
    try {
      const token = this.cookie.get('USUARIO_INFO');
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {

      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Sessão expirada ou token inválido. Faça login novamente.',
        life: 3000,
      });

      this.cookie.delete('USUARIO_INFO');
      this.router.navigate(['/home']);
      return null;
    }
  }

  getLoggedUserId(): string {
    const decodedToken = this.decodeToken();
    return decodedToken?.id;
  }
}
