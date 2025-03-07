import { TestBed } from '@angular/core/testing';

import { PaymentMethodeService } from './payment-methode.service';

describe('PaymentMethodeService', () => {
  let service: PaymentMethodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentMethodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
