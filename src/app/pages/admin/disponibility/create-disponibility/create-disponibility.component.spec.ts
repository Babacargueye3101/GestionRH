import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDisponibilityComponent } from './create-disponibility.component';

describe('CreateDisponibilityComponent', () => {
  let component: CreateDisponibilityComponent;
  let fixture: ComponentFixture<CreateDisponibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDisponibilityComponent]
    });
    fixture = TestBed.createComponent(CreateDisponibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
