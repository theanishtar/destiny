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

  // loadDataSender() {
  //   this.messageService.loadDataSender().subscribe(() => {
  //     this.sender = JSON.parse(JSON.stringify(this.messageService.getSender()));
  //     this.messageService.connectToChat(this.sender.user_id);

  //   });
  // }
  @HostListener('window:unload', ['$event'])
  unloadHandler(event: any): void {
    // Gọi hàm đăng xuất khi thoát khỏi trang web
    this.loginService.performLogout();
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
