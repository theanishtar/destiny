import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenWordComponent } from './forbidden-word.component';

describe('ForbiddenWordComponent', () => {
  let component: ForbiddenWordComponent;
  let fixture: ComponentFixture<ForbiddenWordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForbiddenWordComponent]
    });
    fixture = TestBed.createComponent(ForbiddenWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
