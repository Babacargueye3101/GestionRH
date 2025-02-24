import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceSalonComponent } from './create-service-salon.component';

describe('CreateServiceSalonComponent', () => {
  let component: CreateServiceSalonComponent;
  let fixture: ComponentFixture<CreateServiceSalonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateServiceSalonComponent]
    });
    fixture = TestBed.createComponent(CreateServiceSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
