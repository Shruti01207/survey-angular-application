import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private http = inject(HttpClient);

  constructor() { }


  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>('https://localhost:7286/api/Questions');
  }


}
