import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/enviroment';
import { ActivityResponse } from '../../models/interfaces/activity/ActivityResponse';
import { HourResponse } from '../../models/interfaces/hour/HourResponse';
import { ProjectResponse } from '../../models/interfaces/project/ProjectResponse';
import { ReportActivity } from '../../models/interfaces/report/Activity/ReportActivity';
import { ReportProject } from '../../models/interfaces/report/Project/ReportProject';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USUARIO_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getProjectReport(projectId: number): Observable<ReportProject> {
    return this.http.get<ReportProject>(`${this.API_URL}/relatorio/projetos/${projectId}`,
      this.httpOptions
    );
  }

  getActivityReport(activityId: number): Observable<ReportActivity> {
    return this.http.get<ReportActivity>(`${this.API_URL}/relatorio/atividades/${activityId}`,
      this.httpOptions
    );
  }

  getProjectsByPeriod(periodoInicial: string, periodoFinal: string): Observable<Array<ProjectResponse>> {
    return this.http.get<Array<ProjectResponse>>(`${this.API_URL}/relatorio/periodo/projetos`,
      {
        ...this.httpOptions, params: {
          periodoInicial, periodoFinal
        }
      }
    );
  }

  getActivitiesByPeriod(periodoInicial: string, periodoFinal: string): Observable<Array<ActivityResponse>> {
    return this.http.get<Array<ActivityResponse>>(`${this.API_URL}/relatorio/periodo/atividades`,
      {
        ...this.httpOptions, params: {
          periodoInicial, periodoFinal
        }
      }
    );
  }

  getHoursByPeriod(periodoInicial: string, periodoFinal: string, usuarioId?: number): Observable<Array<HourResponse>> {
    let params = new HttpParams()
    .set('periodoInicial', periodoInicial)
    .set('periodoFinal', periodoFinal);
    if(usuarioId) {
      params = params.set('usuarioId', usuarioId);
    }

    return this.http.get<Array<HourResponse>>(`${this.API_URL}/relatorio/periodo/horas`,
      {
        ...this.httpOptions, params: params
      }
    );
  }
}
