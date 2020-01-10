import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingMeetingsComponent } from './pending-meetings.component';

describe('PendingMeetingsComponent', () => {
  let component: PendingMeetingsComponent;
  let fixture: ComponentFixture<PendingMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
