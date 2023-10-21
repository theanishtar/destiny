import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallComponent } from './video-call.component';

describe('VideoCallComponent', () => {
  let component: VideoCallComponent;
  let fixture: ComponentFixture<VideoCallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoCallComponent]
    });
    fixture = TestBed.createComponent(VideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
