import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployementsComponent } from './employements.component';

describe('EmployementsComponent', () => {
  let component: EmployementsComponent;
  let fixture: ComponentFixture<EmployementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployementsComponent]
    });
    fixture = TestBed.createComponent(EmployementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
