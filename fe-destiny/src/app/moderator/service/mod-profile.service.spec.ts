import { TestBed } from '@angular/core/testing';

import { ModProfileService } from './mod-profile.service';

describe('ModProfileService', () => {
  let service: ModProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
