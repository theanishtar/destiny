import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarModeratorComponent } from './sidebar-moderator.component';

describe('SidebarModeratorComponent', () => {
  let component: SidebarModeratorComponent;
  let fixture: ComponentFixture<SidebarModeratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarModeratorComponent]
    });
    fixture = TestBed.createComponent(SidebarModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
