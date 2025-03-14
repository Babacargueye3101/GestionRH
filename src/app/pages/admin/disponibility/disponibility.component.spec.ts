import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilityComponent } from './disponibility.component';

describe('DisponibilityComponent', () => {
  let component: DisponibilityComponent;
  let fixture: ComponentFixture<DisponibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisponibilityComponent]
    });
    fixture = TestBed.createComponent(DisponibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
