import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { LoginRequest } from '../../models/interfaces/usuario/auth/LoginRequest';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/interfaces/usuario/auth/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  autenticaUsuario(loginRequest: LoginRequest) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/usuarios/auth/login`, loginRequest);
  }
}
