import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDisponibilityComponent } from './view-disponibility.component';

describe('ViewDisponibilityComponent', () => {
  let component: ViewDisponibilityComponent;
  let fixture: ComponentFixture<ViewDisponibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDisponibilityComponent]
    });
    fixture = TestBed.createComponent(ViewDisponibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
