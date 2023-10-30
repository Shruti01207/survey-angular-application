import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';
import { Response } from '../models/response.model';
import { ResponseService } from '../services/response.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.questionServiceSubcription?.unsubscribe();
    this.responseServiceSubcription?.unsubscribe();
  }

  questions: Question[] = [
    {
      id: "1",
      feedbackQue: 'How is your experience with us?',
      type: 'scale',
      options: [1, 2, 3, 4, 5]
    }
  ];
  currIndex: number = 0;
  number: number = 1;
  selectedRating: number = 0;
  answerArray: string[] = [];
  userResponse?: Response;
  sessionCompleted: boolean = false;
  private questionService = inject(QuestionService);
  private responseService = inject(ResponseService);
  private activatedRoute = inject(ActivatedRoute);
  private sessionService = inject(SessionService);


  private route = inject(Router);

  private SessionId: string | null = null;
  private questionServiceSubcription?: Subscription;
  private responseServiceSubcription?: Subscription;
  private sessionServiceSubcription?: Subscription;

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.SessionId = params.get('id');
      }
    })

    //get the session status from the database
    if (this.SessionId)
      this.sessionServiceSubcription = this.sessionService.getSessionStatus(this.SessionId).
        subscribe({
          next: (response) => {
            console.log(response);
            this.sessionCompleted = response.isCompleted;
            console.log("session completed", this.sessionCompleted);
          }
        });


    this.questionServiceSubcription = this.questionService.getQuestions().subscribe({
      next: (response) => {
        this.questions = response;
        if (this.questions) {
          this.number = this.questions.length;
          if (localStorage.getItem(this.SessionId as string) == null) {
            this.answerArray = new Array(this.number);
            localStorage.setItem(this.SessionId as string, JSON.stringify(this.answerArray));
          }
          else
            this.answerArray = JSON.parse(localStorage.getItem(this.SessionId as string) as string);
          // store the response
        }
        console.log(this.questions);
        this.addOptions();
      }
    });


  }

  onNext() {
    if (this.questions) {
      this.number = this.questions.length;
      this.currIndex = (this.currIndex + 1) % this.number;
    }
    //this.addActiveClass();
  }

  onPrev() {
    if (this.questions) {
      this.number = this.questions.length;
      this.currIndex = ((this.currIndex - 1) + this.number) % this.number;
    }
    //await this.addActiveClass();
  }



  select(e: Event, num?: number) {
    if (num && this.questions[this.currIndex].type == 'scale') {
      this.answerArray[this.currIndex] = num.toString();
    }
    else {
      if (e.target)
        this.answerArray[this.currIndex] = (e.target as HTMLInputElement).value;
    }
    localStorage.setItem(this.SessionId as string, JSON.stringify(this.answerArray));
    // console.log("answer array", this.answerArray);
  }

  addOptions() {
    for (let i = 0; i < this.number; i++) {
      if (this.questions && this.questions[i].type == "scale") {
        if (i < 3)
          this.questions[i].options = [1, 2, 3, 4, 5];
        else
          this.questions[i].options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      }
    }
  }


  submitResponse() {
    for (let i = 0; i < this.number; i++) {

      this.userResponse = {
        sessionId: this.SessionId as string,
        questionId: this.questions[i].id,
        answer: this.answerArray[i]
      }
      this.responseServiceSubcription = this.responseService.saveResponse(this.userResponse).
        subscribe({
          next: (response) => {
            console.log("response added sucessfully", i);
          }
        });
    }
    this.setIsCompleted();
  }

  setIsCompleted() {
    if (this.SessionId)
      this.sessionServiceSubcription = this.sessionService.setSessionStatus(this.SessionId).
        subscribe({
          next: (response) => {
            this.sessionCompleted = true;
          }
        });
    setInterval(() => {
      this.route.navigateByUrl('/');
    }, 6000);
  }

}





