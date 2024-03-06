import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReportDetailComponent } from './post-report-detail.component';

describe('PostReportDetailComponent', () => {
  let component: PostReportDetailComponent;
  let fixture: ComponentFixture<PostReportDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostReportDetailComponent]
    });
    fixture = TestBed.createComponent(PostReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
