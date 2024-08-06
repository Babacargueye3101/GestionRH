import { TestBed } from '@angular/core/testing';

import { CompagnyService } from './compagny.service';

describe('CompagnyService', () => {
  let service: CompagnyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompagnyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
