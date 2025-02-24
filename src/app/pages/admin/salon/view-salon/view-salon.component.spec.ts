import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalonComponent } from './view-salon.component';

describe('ViewSalonComponent', () => {
  let component: ViewSalonComponent;
  let fixture: ComponentFixture<ViewSalonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSalonComponent]
    });
    fixture = TestBed.createComponent(ViewSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
