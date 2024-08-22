import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdetailPaymentComponent } from './viewdetail-payment.component';

describe('ViewdetailPaymentComponent', () => {
  let component: ViewdetailPaymentComponent;
  let fixture: ComponentFixture<ViewdetailPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewdetailPaymentComponent]
    });
    fixture = TestBed.createComponent(ViewdetailPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
