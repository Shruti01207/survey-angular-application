import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { StartWindowComponent } from './start-window/start-window.component';
import { EndSessionWindowComponent } from './end-session-window/end-session-window.component';
import { formDeactivateGuard } from './form-deactivate.guard';

const routes: Routes = [
  {
    path:'',
    component: StartWindowComponent
  },
  {
    path:'session/:id',
    component:SurveyFormComponent,
    canDeactivate:[formDeactivateGuard]
  },
  {
    path:'end',
    component:EndSessionWindowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
