import { Component, OnInit, ElementRef, HostListener, Renderer2 } from '@angular/core';
declare var io: any;
import { call } from '../../../assets/js/video-call/script.js'
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../service/message.service';
@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent {
  public roomForm!: FormGroup;
  socket: any;
  roomName: string = '';
  avatar: any
  checkHideBtn: boolean = false;
  left = 0;
  top = 0;
  isDragging = false;
  dragStartY = 0;
  width = 400;
  height = 300;
  isResizing = false;
  resizeStartX = 0;
  resizeStartY = 0;
  private originalWidth: number = 0;
  private originalHeight: number = 0;

  ngOnInit() {
    this.updateAudioSource();
    var localVideoElement = document.getElementById("local-video");
    if (localVideoElement) {
      localVideoElement.hidden = true;
    }

    this.originalWidth = 690;
    this.originalHeight = 520;
  }

  constructor(
    private formbuilder: FormBuilder,
    // private cookieService: CookieService,
    private el: ElementRef,
    private renderer: Renderer2,
    public messageService: MessageService,
    private elementRef: ElementRef
  ) {
    this.avatar = localStorage.getItem('avatar');
    

  }

  joinRoom() {
    let btnJoin = document.getElementById("btnJoin");
    let btnRefese = document.getElementById("btnRefese");
    let fromUser = this.messageService.fromUser;
    let toUser = this.messageService.toUser;

    call.joinRoom(fromUser + "" + toUser);
    clearInterval(this.messageService.interval);
    if (btnJoin && btnRefese) {
      btnJoin.style.display = 'none';
      btnRefese.style.display = 'none';
      this.checkHideBtn = true;
    }
    this.messageService.checkReceiveCall();
    this.messageService.checkOpenCam = true;
    // this.messageService.audio_ring.pause();
    var audio = document.getElementById("audio") as HTMLAudioElement;
    if (audio) {
      audio.pause();
    }
  }

  cancelCall(value) {
    // call.turnOffCamera(value);
    // call.turnOffMicro(value);
    let toUser = parseInt(localStorage.getItem('chatUserId')?.trim() + '');
    let id = this.messageService.selectedUser;
    if (this.messageService.fromUser != undefined) {
      id = this.messageService.fromUser;
    }
    console.warn("id: " + id)
    this.checkHideBtn = false;
    // this.messageService.checkCall = false;
    this.messageService.checkRefuseCall(id, 'disconnect-call');
    var audio = document.getElementById("audio") as HTMLAudioElement;
    if (audio) {
      audio.pause();
    }
    call.offCame();
    this.messageService.checkOpenCam = false;
  }

  startScreenShare() {
    call.startScreenShare();
  }

  turnOnCamera(value) {
    this.messageService.checkOpenCam = true;
    call.turnOnCamera(value);
    // let off = document.getElementById("off-camera-" + value);
    // let on = document.getElementById("on-camera-" + value);
    // if(off && on){
    //   off.style.display = "block";
    //   on.style.display = "none";
    // }
  }

  turnOffCamera(value) {
    this.messageService.checkOpenCam = false;
    call.turnOffCamera(value);
  }

  turnOnMicro(value) {
    call.turnOnMicro(value);
  }

  turnOffMicro(value) {
    call.turnOffMicro(value);
  }

  updateAudioSource(): void {
    const selectedAudio = this.messageService.getAudioSource();
    this.messageService.audio_ring.src = selectedAudio;
    // Cập nhật giá trị src và chạy lại audio nếu cần
    this.messageService.audio_ring.load(); // Có thể cần load lại audio để áp dụng thay đổi src
    // this.messageService.audio_ring.play(); // Có thể cần play lại audio nếu bạn muốn nó tự động phát
  }

  // ==========Thả chuột sau resize===============
  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.isResizing) {
      // Khi nhả chuột sau khi thực hiện resize
      this.isResizing = false;
      this.resizeStartX = 0;
      this.resizeStartY = 0;
      this.originalWidth = this.elementRef.nativeElement.clientWidth;
      this.originalHeight = this.elementRef.nativeElement.clientHeight;
    }
  }

  // ==========Nhấn chuột===============
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const isResizeHandle = (event.target as HTMLElement).classList.contains('resize-handle');

    if (isResizeHandle) {
      // Khi nhấn chuột trên phần có class 'resize-handle', bắt đầu quá trình resize
      this.isResizing = true;
      this.resizeStartX = event.clientX;
      this.resizeStartY = event.clientY;
      this.originalWidth = this.elementRef.nativeElement.clientWidth;
      this.originalHeight = this.elementRef.nativeElement.clientHeight;
    }
  }

  // ==========Di chuyển===============
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isResizing) {
      // Khi di chuyển chuột sau khi đã bắt đầu resize
      const newWidth = this.originalWidth + (event.clientX - this.resizeStartX);
      const newHeight = this.originalHeight + (event.clientY - this.resizeStartY);

      // Set kích thước mới của modal, với giới hạn kích thước tối thiểu
      const minWidth = 318;
      const minHeight = 238;

      this.elementRef.nativeElement.style.width = `${Math.max(newWidth, minWidth)}px`;
      this.elementRef.nativeElement.style.height = `${Math.max(newHeight, minHeight)}px`;
    }
  }

  private constrainModalPosition() {
    const bodyWidth = document.body.clientWidth;
    const bodyHeight = document.body.clientHeight;

    // Giữ modal không di chuyển ra khỏi cạnh trái hoặc phải của cửa sổ
    this.left = Math.max(0, Math.min(this.left, bodyWidth - this.width));

    // Giữ modal không di chuyển ra khỏi cạnh trên hoặc dưới của cửa sổ
    this.top = Math.max(0, Math.min(this.top, bodyHeight - this.height));
  }
  onScroll() {
    if (this.isDragging) {
      // Giữ modal không di chuyển ra khỏi cạnh trên hoặc dưới của cửa sổ
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      this.top = this.dragStartY + scrollPosition;

      // Giữ modal không di chuyển ra khỏi giới hạn
      this.constrainModalPosition();
    }
  }

  getTransform() {
    return `translate(100px, 100px)`;
  }

  // 

  // starTimer(){
  //   this.$start.on("click",(e) => {
  //     e.preventDefault();
  //     this.beginTimer(60000); // 60 seconds
      
  //     this.$start.hide();	
  //     this.$pause.show();	
  //   });
    
  //   this.$pause.on("click", (e) => {
  //     e.preventDefault();
  //     clearTimeout(window.t);
      
  //     this.clockPause(1,true);
      
  //     this.$timer.addClass("half_opacity");
  //     $(this).hide();
  //     this.$continue.show();
  //   });
    
  //   this.$continue.on("click", (e) => {
  //     e.preventDefault();
  //     this.$timer.removeClass("half_opacity");
      
  //     this.clockPause(1,false);
      
  //     // Restart clock once opacity has reversed
  //     setTimeout(() => {
  //       this.beginTimer(window.intOffset);
  //     },350);
      
  //     $(this).hide();
  //     this.$pause.show();
  //   });
    
  //   // Start clock face on page load
  //   this.beginTimer(60000);
  // };
  
  // // Change timer face colour
  // colourChanger(intAngle)
  // {
  //   // RGB values
  //   // Green: 	 51 153  0
  //   // Orange:	244 138  0
  //   // Red:		255   0  0
    
  //   intAngle = 6.29 - intAngle;
    
  //   if(Math.floor(72+55*intAngle) < 255 || Math.floor(214+14*intAngle) < 255)
  //   {
  //     // Animate from green to amber
  //     return 'rgb(' + Math.floor(72+55*intAngle) + ',' + Math.floor(214+14*intAngle) + ',0)';	
  //   } else {
  //     // Animate from amber to red
  //     return 'rgb(' + Math.floor(255) + ',' + Math.floor(597-(90*intAngle)) + ',0)';
  //   }
  // }
  
  // // Get the ball rolling...
  // beginTimer(timer)
  // {
  //   // Get our start time
  //   var dteStart = new Date();
  //   dteStart = dteStart.getTime();
    
  //   // Call countdown clock function
  //   this.countDownClock(dteStart,timer);
    
  //   // Reset elements to their defaults
  //   this.$clock.show();
  //   this.$timer.show();
  // }
  
  // // Build our countdown clock
  // countDownClock(dteStart,timer)
  // {
  //   // Time started, minus time now, subtracked from 60 seconds
  //   var d = new Date();
  //   window.intOffset = timer - (d.getTime() - dteStart);
    
  //   // Whole number to use as countdown time
  //   this.$timer.html(Math.ceil(window.intOffset / 1000));
    
  //   // Angle to use, defined by 1 millisecond
  //   window.intAngle = 0.1048335*0.001*window.intOffset;
            
  //   // Set up our canvas
  //   var canvas = document.getElementById("clock");
    
  //   if (canvas.getContext) // Does the browser support canvas?
  //   {
  //     var ctx = canvas.getContext("2d");
      
  //     // Clear canvas before re-drawing
  //     ctx.clearRect(0,0,300,300);
      
  //     // Grey background ring
  //     ctx.beginPath();
  //     ctx.globalAlpha = 1;
  //     ctx.arc(150,150,140,0,6.283,false);
  //     ctx.arc(150,150,105,6.283,((Math.PI*2)),true);
  //     ctx.fillStyle = "#bbb";
  //     ctx.fill();
  //     ctx.closePath();
      
  //     // Clock face ring
  //     ctx.beginPath();
  //     ctx.globalAlpha = 1;
  //     ctx.arc(150,150,140.1,-1.57,(-1.57 + window.intAngle),false);
  //     ctx.arc(150,150,105,(-1.57 + window.intAngle),((Math.PI*2) -1.57),true);
  //     ctx.fillStyle = this.colourChanger(window.intAngle);
  //     ctx.fill();
  //     ctx.closePath();
      
  //     // Centre circle
  //     ctx.beginPath();
  //     ctx.arc(150,150,105,0,6.283,false);
  //     ctx.fillStyle = "#fff";
  //     ctx.fill();
  //     ctx.closePath();
      
  //   } else {
  //     // Put fallback for browsers that don't support canvas here...
  //   }
            
  //   if(window.intOffset <= 0) // If time is up
  //   this.timeUp();	
  //   else // Resersive ahoy!
  //     window.t = setTimeout("countDownClock(" + dteStart + "," + timer + ")",50);
  // }
  
  // // Pause clock and animate our centre circle
  // clockPause(timeElapsed,pause)
  // {		
  //   // Duration of pause animation
  //   pauseTime = 100;
    
  //   diff = timeElapsed / pauseTime;
    
  //   if(pause) // Pause the clock
  //   {
  //     percentage = 1 - diff;
  //     if(percentage < 0)
  //       percentage = 0;
  //   } else { // Resume the clock
  //     percentage = diff;
  //     if(percentage > 1)
  //       percentage = 1;
  //   }				
              
  //   // Set up our canvas
  //   var canvas = document.getElementById("clock");
    
  //   if (canvas.getContext) // Does the browser support canvas?
  //   {
  //     var ctx = canvas.getContext("2d");
      
  //     // Clear canvas before re-drawing
  //     ctx.clearRect(0,0,300,300);
      
  //     // Grey background ring
  //     ctx.beginPath();
  //     ctx.globalAlpha = 1;
  //     ctx.arc(150,150,140,0,6.283,false);
  //     ctx.arc(150,150,105,6.283,((Math.PI*2)),true);
  //     ctx.fillStyle = "#bbb";
  //     ctx.fill();
  //     ctx.closePath();
      
  //     // Clock face ring
  //     ctx.beginPath();
  //     ctx.globalAlpha = 1;
  //     ctx.arc(150,150,140.1,-1.57,(-1.57 + window.intAngle),false);
  //     ctx.arc(150,150,105,(-1.57 + window.intAngle),((Math.PI*2) -1.57),true);
  //     ctx.fillStyle = this.colourChanger(window.intAngle);
  //     ctx.fill();
  //     ctx.closePath();
      
  //     // Centre circle
  //     ctx.beginPath();
  //     ctx.arc(150,150,(105 * percentage),0,6.283,false);
  //     ctx.fillStyle = "#fff";
  //     ctx.fill();
  //     ctx.closePath();
      
  //     // Recursive until time has elapsed
  //     if(timeElapsed < pauseTime)
  //     {
  //       setTimeout(() => {
  //         this.clockPause((timeElapsed + 10),pause);
  //       },10);
  //     }
  //   } else {
  //     // Put fallback for browsers that don't support canvas here...
  //   }
  // }
  
  // // Time up - reset buttons
  // timeUp()
  // {
  //   this.$start.show();	
  //   this.$pause.hide();	
  //   this.$continue.hide();	
  // }

}
