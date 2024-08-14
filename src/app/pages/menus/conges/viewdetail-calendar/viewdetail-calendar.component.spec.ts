import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdetailCalendarComponent } from './viewdetail-calendar.component';

describe('ViewdetailCalendarComponent', () => {
  let component: ViewdetailCalendarComponent;
  let fixture: ComponentFixture<ViewdetailCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewdetailCalendarComponent]
    });
    fixture = TestBed.createComponent(ViewdetailCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
