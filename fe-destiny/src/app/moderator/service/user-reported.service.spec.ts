import { TestBed } from '@angular/core/testing';

import { UserReportedService } from './user-reported.service';

describe('UserReportedService', () => {
  let service: UserReportedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserReportedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
