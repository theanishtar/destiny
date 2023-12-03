import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesMessageComponent } from './images-message.component';

describe('ImagesMessageComponent', () => {
  let component: ImagesMessageComponent;
  let fixture: ComponentFixture<ImagesMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesMessageComponent]
    });
    fixture = TestBed.createComponent(ImagesMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
