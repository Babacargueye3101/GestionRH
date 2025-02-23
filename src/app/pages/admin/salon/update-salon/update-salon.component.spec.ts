import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalonComponent } from './update-salon.component';

describe('UpdateSalonComponent', () => {
  let component: UpdateSalonComponent;
  let fixture: ComponentFixture<UpdateSalonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSalonComponent]
    });
    fixture = TestBed.createComponent(UpdateSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
