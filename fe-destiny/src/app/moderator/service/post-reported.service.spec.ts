import { TestBed } from '@angular/core/testing';

import { PostReportedService } from './post-reported.service';

describe('PostReportedService', () => {
  let service: PostReportedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostReportedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
