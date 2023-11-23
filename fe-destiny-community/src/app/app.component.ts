import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './user/service/message.service';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FE_Destiny';
  sender: any;
  ngOnInit() {
    // // Bắt sự kiện thoát trang
    // window.addEventListener('beforeunload', (event) => {
    //   // Thực hiện các xử lý trước khi trang thoát
    //   // Ví dụ: Lưu dữ liệu, xác nhận thoát, v.v.
    //   this.loginService.triggerExitEvent();
      
    //   // Hủy bỏ sự kiện thoát nếu cần thiết
    //   // event.returnValue = true;
    // });
  }

  constructor(
    private translateService: TranslateService,
    public messageService: MessageService,
    private cookieService: CookieService,
    private loginService: LoginService
  ) {

  }

  public selectLg(event: any) {
    this.translateService.use(event.target.value);
  }

  // Check internet
  check: boolean = true;
  loading: boolean = true;

  @HostListener('window:load', ['$event'])
  checkInternetStatus() {
    this.check = navigator.onLine;
    this.loading = false; // Set loading to false when the window is loaded
  }
}
