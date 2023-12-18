import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReportdetailComponent } from './post-reportdetail.component';

describe('PostReportdetailComponent', () => {
  let component: PostReportdetailComponent;
  let fixture: ComponentFixture<PostReportdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostReportdetailComponent]
    });
    fixture = TestBed.createComponent(PostReportdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
