import { TestBed } from '@angular/core/testing';

import { RoleBasedRedirectGuardService } from './role-based-redirect-guard.service';

describe('RoleBasedRedirectGuardService', () => {
  let service: RoleBasedRedirectGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleBasedRedirectGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
