import { TestBed } from '@angular/core/testing';

import { FirestoreCredentialsService } from './firestore-credentials.service';

describe('FirestoreCredentialsService', () => {
  let service: FirestoreCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
