import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartWindowComponent } from './start-window.component';

describe('StartWindowComponent', () => {
  let component: StartWindowComponent;
  let fixture: ComponentFixture<StartWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartWindowComponent]
    });
    fixture = TestBed.createComponent(StartWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
