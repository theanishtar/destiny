import { TestBed } from '@angular/core/testing';

import { PostReportedDetailService } from './post-reported-detail.service';

describe('PostReportedDetailService', () => {
  let service: PostReportedDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostReportedDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
