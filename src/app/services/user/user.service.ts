import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/enviroment';
import { LoginRequest } from '../../models/interfaces/user/auth/LoginRequest';
import { LoginResponse } from '../../models/interfaces/user/auth/LoginResponse';
import { SignUpRequest } from '../../models/interfaces/user/signUp/SignUpRequest';
import { UserResponse } from '../../models/interfaces/user/UserResponse';
import { UserUpdate } from '../../models/interfaces/user/UserUpdate';

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

  constructor(private http: HttpClient, private cookie: CookieService) { }

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

  getProjectMembers(projectId: number): Observable<Array<UserResponse>> {
    return this.http.get<Array<UserResponse>>(
      `${this.API_URL}/usuarios/listar/integrantes/${projectId}`,
      this.httpOptions
    )
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/usuarios/deletar/${userId}`,
      this.httpOptions
    )
  }

  editUser(editUserRequest: UserUpdate): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/usuarios/atualizar`,
      editUserRequest,
      this.httpOptions
    );
  }
}
