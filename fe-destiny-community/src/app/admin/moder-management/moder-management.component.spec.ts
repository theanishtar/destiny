import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerManagementComponent } from './moder-management.component';

describe('ModerManagementComponent', () => {
  let component: ModerManagementComponent;
  let fixture: ComponentFixture<ModerManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModerManagementComponent]
    });
    fixture = TestBed.createComponent(ModerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
