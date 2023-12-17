import { TestBed } from '@angular/core/testing';

import { ModerManagenentService } from './moder-managenent.service';

describe('ModerManagenentService', () => {
  let service: ModerManagenentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModerManagenentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
