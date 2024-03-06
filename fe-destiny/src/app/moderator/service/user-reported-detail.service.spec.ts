import { TestBed } from '@angular/core/testing';

import { UserReportedDetailService } from './user-reported-detail.service';

describe('UserReportedDetailService', () => {
  let service: UserReportedDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserReportedDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
