import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdminComponent } from './profile-admin.component';

describe('ProfileAdminComponent', () => {
  let component: ProfileAdminComponent;
  let fixture: ComponentFixture<ProfileAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileAdminComponent]
    });
    fixture = TestBed.createComponent(ProfileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
