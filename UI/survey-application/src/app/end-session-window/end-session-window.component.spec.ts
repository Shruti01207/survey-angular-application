import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndSessionWindowComponent } from './end-session-window.component';

describe('EndSessionWindowComponent', () => {
  let component: EndSessionWindowComponent;
  let fixture: ComponentFixture<EndSessionWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndSessionWindowComponent]
    });
    fixture = TestBed.createComponent(EndSessionWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
