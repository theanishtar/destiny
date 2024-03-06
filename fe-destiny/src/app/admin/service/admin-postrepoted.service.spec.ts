import { TestBed } from '@angular/core/testing';

import { AdminPostrepotedService } from './admin-postrepoted.service';

describe('AdminPostrepotedService', () => {
  let service: AdminPostrepotedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPostrepotedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
