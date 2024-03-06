import { TestBed } from '@angular/core/testing';

import { AdminUserdetailService } from './admin-userdetail.service';

describe('AdminUserdetailService', () => {
  let service: AdminUserdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUserdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
