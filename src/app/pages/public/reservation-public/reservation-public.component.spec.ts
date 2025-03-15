import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPublicComponent } from './reservation-public.component';

describe('ReservationPublicComponent', () => {
  let component: ReservationPublicComponent;
  let fixture: ComponentFixture<ReservationPublicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationPublicComponent]
    });
    fixture = TestBed.createComponent(ReservationPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
