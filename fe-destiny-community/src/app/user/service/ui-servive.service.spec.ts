import { TestBed } from '@angular/core/testing';

import { UIServiveService } from './ui-servive.service';

describe('UIServiveService', () => {
  let service: UIServiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIServiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
