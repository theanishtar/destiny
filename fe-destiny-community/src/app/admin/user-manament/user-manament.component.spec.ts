import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManamentComponent } from './user-manament.component';

describe('UserManamentComponent', () => {
  let component: UserManamentComponent;
  let fixture: ComponentFixture<UserManamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserManamentComponent]
    });
    fixture = TestBed.createComponent(UserManamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
