import { TestBed } from '@angular/core/testing';

import { ForgotpasswordService } from './forgotpassword.service';

describe('ForgotpasswordService', () => {
  let service: ForgotpasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotpasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
