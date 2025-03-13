import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/enviroment';
import { HourRequest } from '../../models/interfaces/hour/HourRequest';
import { HourResponse } from '../../models/interfaces/hour/HourResponse';
import { HourUpdate } from '../../models/interfaces/hour/HourUpdate';

@Injectable({
  providedIn: 'root'
})
export class HourService {

  private API_URL = environment.API_URL;
    private JWT_TOKEN = this.cookie.get('USUARIO_INFO');
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.JWT_TOKEN}`,
      }),
    };

    constructor(private http: HttpClient, private cookie: CookieService) { }

    getAllHours(): Observable<Array<HourResponse>> {
      return this.http.get<Array<HourResponse>>(
        `${this.API_URL}/horas/listar`,
        this.httpOptions
      );
    }

    getHoursByUserAndMonth(userId: number): Observable<Array<HourResponse>> {
      return this.http.get<Array<HourResponse>>(
        `${this.API_URL}/horas/listar/mes/usuario/${userId}`,
        this.httpOptions
      );
    }

    getHourByActivity(activityId: number): Observable<Array<HourResponse>> {
      return this.http.get<Array<HourResponse>>(
        `${this.API_URL}/horas/listar/atividade/${activityId}`,
        this.httpOptions
      );
    }

    getHoursByUser(userId: number): Observable<Array<HourResponse>> {
      return this.http.get<Array<HourResponse>>(
        `${this.API_URL}/horas/listar/usuario/${userId}`,
          this.httpOptions
        )
    }

    createHour(hourRequest: HourRequest): Observable<void> {
      return this.http.post<void>(
        `${this.API_URL}/horas/registrar`,
        hourRequest,
        this.httpOptions
      );
    }

    deleteHour(hourId: number): Observable<void> {
      return this.http.delete<void>(
        `${this.API_URL}/horas/deletar/${hourId}`,
        this.httpOptions
      )
    }

    editHour(editHourRequest: HourUpdate): Observable<void> {
      return this.http.put<void>(
        `${this.API_URL}/horas/atualizar`,
        editHourRequest,
        this.httpOptions
      );
    }
}
