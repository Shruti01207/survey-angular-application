import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private http = inject(HttpClient);

  constructor() { }

  saveResponse(userResponse: Response): Observable<void> {
    return this.http.post<void>('https://localhost:7286/api/Responses', userResponse);
  }



}
