import { Component } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { SurveyFormComponent } from './survey-form/survey-form.component';

export const formDeactivateGuard: CanDeactivateFn <SurveyFormComponent>=(Component,currentRoute,cuurentState,nextState)=>{
  console.log(Component.sessionCompleted);
  if(Component.sessionCompleted){
    return true;
  }
  else{
    return false;
  }
}
