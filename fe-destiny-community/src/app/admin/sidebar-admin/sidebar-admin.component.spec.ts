import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAdminComponent } from './sidebar-admin.component';

describe('SidebarAdminComponent', () => {
  let component: SidebarAdminComponent;
  let fixture: ComponentFixture<SidebarAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarAdminComponent]
    });
    fixture = TestBed.createComponent(SidebarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
