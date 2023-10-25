import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './user/service/message.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FE_Destiny';
  sender: any;

  constructor(
    private translateService: TranslateService,
    public messageService: MessageService,
    private cookieService: CookieService,
  ) {
<<<<<<< HEAD
    // if (this.cookieService.get("full_name") != '') {
    //   setTimeout(() => {
    //     // this.loadDataSender();
    //   }, 1000);
    // }
=======
    if (this.cookieService.get("full_name") != '') {
      setTimeout(() => {
        this.loadDataSender();
      }, 1000);
    }
>>>>>>> status-online
  }

  public selectLg(event: any) {
    this.translateService.use(event.target.value);
  }

  loadDataSender() {
    this.messageService.loadDataSender().subscribe(() => {
      this.sender = JSON.parse(JSON.stringify(this.messageService.getSender()));
      this.messageService.connectToChat(this.sender.user_id);

    });
  }
}
