import { TestBed } from '@angular/core/testing';

import { CryptingService } from './crypting.service';

describe('CryptingService', () => {
  let service: CryptingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
