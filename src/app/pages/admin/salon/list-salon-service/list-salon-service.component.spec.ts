import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalonServiceComponent } from './list-salon-service.component';

describe('ListSalonServiceComponent', () => {
  let component: ListSalonServiceComponent;
  let fixture: ComponentFixture<ListSalonServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSalonServiceComponent]
    });
    fixture = TestBed.createComponent(ListSalonServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
