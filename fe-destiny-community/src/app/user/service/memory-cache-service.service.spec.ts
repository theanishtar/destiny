import { TestBed } from '@angular/core/testing';

import { MemoryCacheServiceService } from './memory-cache-service.service';

describe('MemoryCacheServiceService', () => {
  let service: MemoryCacheServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoryCacheServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
