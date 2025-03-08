import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ReportProject } from '../../models/interfaces/report/Project/ReportProject';
import { Observable } from 'rxjs';
import { ReportActivity } from '../../models/interfaces/report/Activity/ReportActivity';
import { ProjectResponse } from '../../models/interfaces/project/ProjectResponse';

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
}
