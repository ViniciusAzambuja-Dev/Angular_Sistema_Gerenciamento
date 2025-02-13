import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ActivityResponse } from '../../models/interfaces/activity/ActivityResponse';

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
}
