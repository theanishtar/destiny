import { TestBed } from '@angular/core/testing';

import { AdminPostdetailService } from './admin-postdetail.service';

describe('AdminPostdetailService', () => {
  let service: AdminPostdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPostdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
