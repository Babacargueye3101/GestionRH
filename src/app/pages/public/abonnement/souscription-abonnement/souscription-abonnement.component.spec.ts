import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouscriptionAbonnementComponent } from './souscription-abonnement.component';

describe('SouscriptionAbonnementComponent', () => {
  let component: SouscriptionAbonnementComponent;
  let fixture: ComponentFixture<SouscriptionAbonnementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SouscriptionAbonnementComponent]
    });
    fixture = TestBed.createComponent(SouscriptionAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
