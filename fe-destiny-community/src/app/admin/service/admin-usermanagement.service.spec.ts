import { TestBed } from '@angular/core/testing';

import { AdminUsermanagementService } from './admin-usermanagement.service';

describe('AdminUsermanagementService', () => {
  let service: AdminUsermanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUsermanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
