import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReportComponent } from './post-report.component';

describe('PostReportComponent', () => {
  let component: PostReportComponent;
  let fixture: ComponentFixture<PostReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostReportComponent]
    });
    fixture = TestBed.createComponent(PostReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
