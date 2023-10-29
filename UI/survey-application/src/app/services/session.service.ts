import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../models/session.model';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private http = inject(HttpClient);

  constructor() { }



  getSessionId(newSession: Session): Observable<Session> {
    return this.http.post<Session>('https://localhost:7286/api/Sessions', newSession);
  }

  getSessionStatus(id: string): Observable<Session> {
    return this.http.get<Session>(`https://localhost:7286/api/Sessions/${id}`);
  }

  setSessionStatus(id:string): Observable<void> {
    return this.http.post<void>(`https://localhost:7286/api/Sessions/${id}`, '');
  }









}
