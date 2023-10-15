import { TestBed } from '@angular/core/testing';

import { AdminPostmanagementService } from './admin-postmanagement.service';

describe('AdminPostmanagementService', () => {
  let service: AdminPostmanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPostmanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
