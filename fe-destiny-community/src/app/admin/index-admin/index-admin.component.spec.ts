import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAdminComponent } from './index-admin.component';

describe('IndexAdminComponent', () => {
  let component: IndexAdminComponent;
  let fixture: ComponentFixture<IndexAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexAdminComponent]
    });
    fixture = TestBed.createComponent(IndexAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
