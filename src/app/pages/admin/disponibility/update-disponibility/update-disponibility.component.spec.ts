import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDisponibilityComponent } from './update-disponibility.component';

describe('UpdateDisponibilityComponent', () => {
  let component: UpdateDisponibilityComponent;
  let fixture: ComponentFixture<UpdateDisponibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDisponibilityComponent]
    });
    fixture = TestBed.createComponent(UpdateDisponibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
