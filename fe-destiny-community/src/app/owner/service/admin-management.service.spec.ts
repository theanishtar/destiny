import { TestBed } from '@angular/core/testing';

import { AdminManagementService } from './admin-management.service';

describe('AdminManagementService', () => {
  let service: AdminManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
