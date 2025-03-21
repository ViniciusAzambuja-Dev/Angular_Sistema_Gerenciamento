import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/enviroment';
import { ProjectRequest } from '../../models/interfaces/project/ProjectRequest';
import { ProjectResponse } from '../../models/interfaces/project/ProjectResponse';
import { ProjectUpdate } from '../../models/interfaces/project/ProjectUpdate';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USUARIO_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getAllProjects(): Observable<Array<ProjectResponse>> {
    return this.http.get<Array<ProjectResponse>>(
      `${this.API_URL}/projetos/listar`,
      this.httpOptions
    );
  }

  getProjectByUser(userId: number): Observable<Array<ProjectResponse>>{
    return this.http.get<Array<ProjectResponse>>(
      `${this.API_URL}/projetos/listar/usuario/${userId}`,
      this.httpOptions
    );
  }

  createProject(projectRequest: ProjectRequest): Observable<void> {
    return this.http.post<void>(
      `${this.API_URL}/projetos/registrar`,
      projectRequest,
      this.httpOptions
    );
  }

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/projetos/deletar/${projectId}`,
      this.httpOptions
    )
  }

  editProject(editProjectRequest: ProjectUpdate): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/projetos/atualizar`,
      editProjectRequest,
      this.httpOptions
    );
  }
}
