import { Component, OnInit, inject } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { Session } from '../models/session.model';

@Component({
  selector: 'app-start-window',
  templateUrl: './start-window.component.html',
  styleUrls: ['./start-window.component.css']
})
export class StartWindowComponent implements OnInit {

  ngOnInit(): void {
    this.loader = false;
    console.log(this.loader);
  }

  loader: boolean = false;
  private sessionService = inject(SessionService);
  private route = inject(Router);

  newSession: Session = {
    isCompleted: false
  };

  createNewSession() {
    this.loader = true;
    this.sessionService.getSessionId(this.newSession).subscribe({
      next: (response) => {
        console.log("response", response);
        this.route.navigateByUrl(`/session/${response.id}`);
      }
    });
  }





}
