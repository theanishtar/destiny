import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostManamentComponent } from './post-manament.component';

describe('PostManamentComponent', () => {
  let component: PostManamentComponent;
  let fixture: ComponentFixture<PostManamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostManamentComponent]
    });
    fixture = TestBed.createComponent(PostManamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
