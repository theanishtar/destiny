import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestAfterRegisterComponent } from './suggest-after-register.component';

describe('SuggestAfterRegisterComponent', () => {
  let component: SuggestAfterRegisterComponent;
  let fixture: ComponentFixture<SuggestAfterRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestAfterRegisterComponent]
    });
    fixture = TestBed.createComponent(SuggestAfterRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
