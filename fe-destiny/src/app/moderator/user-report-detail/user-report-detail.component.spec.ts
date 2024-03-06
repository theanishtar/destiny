import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportDetailComponent } from './user-report-detail.component';

describe('UserReportDetailComponent', () => {
  let component: UserReportDetailComponent;
  let fixture: ComponentFixture<UserReportDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReportDetailComponent]
    });
    fixture = TestBed.createComponent(UserReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
