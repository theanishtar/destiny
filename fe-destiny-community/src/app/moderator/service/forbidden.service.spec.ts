import { TestBed } from '@angular/core/testing';

import { ForbiddenService } from './forbidden.service';

describe('ForbiddenService', () => {
  let service: ForbiddenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForbiddenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
