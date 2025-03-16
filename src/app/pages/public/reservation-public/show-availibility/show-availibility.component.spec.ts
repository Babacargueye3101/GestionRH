import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAvailibilityComponent } from './show-availibility.component';

describe('ShowAvailibilityComponent', () => {
  let component: ShowAvailibilityComponent;
  let fixture: ComponentFixture<ShowAvailibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAvailibilityComponent]
    });
    fixture = TestBed.createComponent(ShowAvailibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
