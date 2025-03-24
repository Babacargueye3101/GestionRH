import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHoraireComponent } from './create-horaire.component';

describe('CreateHoraireComponent', () => {
  let component: CreateHoraireComponent;
  let fixture: ComponentFixture<CreateHoraireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHoraireComponent]
    });
    fixture = TestBed.createComponent(CreateHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
