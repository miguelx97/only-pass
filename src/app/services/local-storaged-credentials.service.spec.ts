import { TestBed } from '@angular/core/testing';

import { LocalStoragedCredentialsService } from './local-storaged-credentials.service';

describe('LocalStoragedCredentialsService', () => {
  let service: LocalStoragedCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStoragedCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
