import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportdetailComponent } from './user-reportdetail.component';

describe('UserReportdetailComponent', () => {
  let component: UserReportdetailComponent;
  let fixture: ComponentFixture<UserReportdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReportdetailComponent]
    });
    fixture = TestBed.createComponent(UserReportdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
