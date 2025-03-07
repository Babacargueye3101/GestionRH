import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodeComponent } from './payment-methode.component';

describe('PaymentMethodeComponent', () => {
  let component: PaymentMethodeComponent;
  let fixture: ComponentFixture<PaymentMethodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodeComponent]
    });
    fixture = TestBed.createComponent(PaymentMethodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
