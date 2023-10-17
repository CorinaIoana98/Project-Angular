import { TestBed } from '@angular/core/testing';

import { UserServiceFirestoreService } from './firebase.service';

describe('FirebaseService', () => {
  let service: UserServiceFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServiceFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
