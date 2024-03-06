import { TestBed } from '@angular/core/testing';

import { InteractPostsService } from './interact-posts.service';

describe('InteractPostsService', () => {
  let service: InteractPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteractPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
