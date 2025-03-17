import { TestBed } from '@angular/core/testing';

import { AbonnementPublicService } from './abonnement-public.service';

describe('AbonnementPublicService', () => {
  let service: AbonnementPublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbonnementPublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
