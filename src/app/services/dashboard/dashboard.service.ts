import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/enviroment';
import { DashboardAdmin } from '../../models/interfaces/dashboard/DashboardAdmin';
import { DashboardGeneral } from '../../models/interfaces/dashboard/DashboardGeneral';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USUARIO_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getDashboardAdminDatas(): Observable<DashboardAdmin> {
    return this.http.get<DashboardAdmin>(`${this.API_URL}/dashboard/dados/admin`,
      this.httpOptions
    );
  }

  getDashboardGeneralData(userId: number): Observable<DashboardGeneral> {
    return this.http.get<DashboardGeneral>(`${this.API_URL}/dashboard/dados/gerais/${userId}`,
      this.httpOptions
    );
  }
}
