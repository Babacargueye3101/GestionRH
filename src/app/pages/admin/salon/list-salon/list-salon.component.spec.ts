import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalonComponent } from './list-salon.component';

describe('ListSalonComponent', () => {
  let component: ListSalonComponent;
  let fixture: ComponentFixture<ListSalonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSalonComponent]
    });
    fixture = TestBed.createComponent(ListSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
