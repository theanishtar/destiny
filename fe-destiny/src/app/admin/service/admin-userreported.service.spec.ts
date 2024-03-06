import { TestBed } from '@angular/core/testing';

import { AdminUserreportedService } from './admin-userreported.service';

describe('AdminUserreportedService', () => {
  let service: AdminUserreportedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUserreportedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
