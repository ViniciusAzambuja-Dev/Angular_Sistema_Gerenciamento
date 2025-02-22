import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HourResponse } from '../../models/interfaces/hour/HourResponse';

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

    getAllProjects(): Observable<Array<HourResponse>> {
      return this.http.get<Array<HourResponse>>(
        `${this.API_URL}/horas/listar`,
        this.httpOptions
      );
    }
}
