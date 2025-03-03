import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisponibilityComponent } from './list-disponibility.component';

describe('ListDisponibilityComponent', () => {
  let component: ListDisponibilityComponent;
  let fixture: ComponentFixture<ListDisponibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDisponibilityComponent]
    });
    fixture = TestBed.createComponent(ListDisponibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
