import { TestBed } from '@angular/core/testing';

import { OptaplannerService } from './optaplanner.service';

describe('OptaplannerService', () => {
  let service: OptaplannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptaplannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
