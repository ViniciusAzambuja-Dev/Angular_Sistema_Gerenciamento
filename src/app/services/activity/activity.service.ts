import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/enviroment';
import { ActivityRequest } from '../../models/interfaces/activity/ActivityRequest';
import { ActivityResponse } from '../../models/interfaces/activity/ActivityResponse';
import { ActivityUpdate } from '../../models/interfaces/activity/ActivityUpdate';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USUARIO_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getAllActivities(): Observable<Array<ActivityResponse>> {
      return this.http.get<Array<ActivityResponse>>(
        `${this.API_URL}/atividades/listar`,
        this.httpOptions
      );
  }

  getAllActivitiesByUser(userId: number): Observable<Array<ActivityResponse>> {
    return this.http.get<Array<ActivityResponse>>(
      `${this.API_URL}/atividades/listar/usuario/${userId}`,
        this.httpOptions
      )
  }

  getActivityByProject(projectId: number): Observable<Array<ActivityResponse>> {
    return this.http.get<Array<ActivityResponse>>(
      `${this.API_URL}/atividades/listar/projeto/${projectId}`,
      this.httpOptions
    );
  }

  createActivity(activityRequest: ActivityRequest): Observable<void> {
      return this.http.post<void>(
        `${this.API_URL}/atividades/registrar`,
        activityRequest,
        this.httpOptions
      );
    }

    deleteActivity(activityId: number): Observable<void> {
      return this.http.delete<void>(
        `${this.API_URL}/atividades/deletar/${activityId}`,
        this.httpOptions
      )
    }

    editActivity(editActivityRequest: ActivityUpdate): Observable<void> {
      return this.http.put<void>(
        `${this.API_URL}/atividades/atualizar`,
        editActivityRequest,
        this.httpOptions
      );
    }
}
