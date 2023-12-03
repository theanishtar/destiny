import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeConfirmComponent } from './change-confirm.component';

describe('ChangeConfirmComponent', () => {
  let component: ChangeConfirmComponent;
  let fixture: ComponentFixture<ChangeConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeConfirmComponent]
    });
    fixture = TestBed.createComponent(ChangeConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
