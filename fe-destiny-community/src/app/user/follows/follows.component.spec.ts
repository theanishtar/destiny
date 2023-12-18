import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowsComponent } from './follows.component';

describe('FollowsComponent', () => {
  let component: FollowsComponent;
  let fixture: ComponentFixture<FollowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowsComponent]
    });
    fixture = TestBed.createComponent(FollowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
