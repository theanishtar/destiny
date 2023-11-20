import { TestBed } from '@angular/core/testing';

import { AdminIndexService } from './admin-index.service';

describe('AdminIndexService', () => {
  let service: AdminIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
