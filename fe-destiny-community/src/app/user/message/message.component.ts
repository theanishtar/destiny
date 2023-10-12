import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

import { liquid } from "../../../assets/js/utils/liquidify.js";
import { avatarHexagons } from '../../../assets/js/global/global.hexagons.js';
import { tooltips } from '../../../assets/js/global/global.tooltips.js';
import { popups } from '../../../assets/js/global/global.popups.js';
import { headers } from '../../../assets/js/header/header.js';
import { sidebars } from '../../../assets/js/sidebar/sidebar.js';
import { content } from '../../../assets/js/content/content.js';
import { form } from '../../../assets/js/form/form.utils.js';
import 'src/assets/js/utils/svg-loader.js';

// 
import { ModalService } from '../service/modal.service';
import { MessageService } from '../service/message.service';
import { environment } from '../../../environments/environment'
import { UserModel } from '../service/UserModel.js';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/vendor/simplebar.css`,
    './message.component.css'
  ]
})
export class MessageComponent implements OnInit {
  // isLoading = false;
  sender: any;
  checkListChat: boolean = false;
  listFriendss: any;
  listMess: any;
  mapUser = new Map<string, UserModel>();
  isOnline: string | undefined;
  // isOriginal: boolean = true;
  image: string | undefined;
  fullname: string | undefined;
  id: string = '';
  $chatHistory: any;
  $button: any;
  $textarea: any;
  $chatHistoryList: any;
  userFromLoginCustom: number = 0;
  userToLoginCustom: number = 0;
  usersTemplateHTML: string;
  count: number = 0;

  ngOnInit() {
    this.messageService.isLoading = true;
    if (this.messageService.mapUser != null) {
      this.mapUser = this.messageService.mapUser;
      this.messageService.isLoading = false;
    }
    this.messageService.dataUpdated.subscribe(() => {
      // Đây là nơi bạn đặt mã để xử lý khi dữ liệu đã được cập nhật.
      this.mapUser = this.messageService.mapUser;

      console.log("Dữ liệu đã cập nhật");
      // Thực hiện các thao tác cần thiết sau khi dữ liệu đã được cập nhật.
    });


    liquid.liquid();
    avatarHexagons.avatarHexagons();
    tooltips.tooltips();
    popups.popup();
    popups.picturePopup();
    headers.headers();
    sidebars.sidebars();
    content.contentTab();
    form.formInput();
  }

  constructor(
    public modalService: ModalService,
    public messageService: MessageService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  /* ============template============= */

  checkIsOnline: boolean = true

  selectedUser(userid) {
    if (this.id != '') {
      this.renderer.removeClass(this.el.nativeElement.querySelector('#chat-widget-message-' + this.id), 'active');
    }
    if (this.count > 0) {
      document.querySelectorAll(".chat-widget-speaker, .time-date").forEach((e) => {
        e.remove();
      });
      this.count = 0;
    }
    this.messageService.selectedUser = userid;
    this.id = userid;
    this.messageService.isOriginal = false;
    this.image = this.mapUser.get(this.id)?.avatar;
    this.fullname = this.mapUser.get(this.id)?.fullname;

    if (this.mapUser.get(this.id)?.type == 'LEAVE') {
      this.isOnline = 'Offline';
      this.checkIsOnline = false;
    } else {
      this.isOnline = 'Online';
      this.checkIsOnline = true;
    }
    //Xử lý sự kiện khi click vào chat
    let element = this.el.nativeElement.querySelector('#chat-widget-message-' + userid); // Lấy phần tử dựa trên ID
    if (element) {
      this.renderer.addClass(element, 'active'); // Thêm class "active" vào phần tử khi click
    }
    if (this.messageService.newMessage.get(userid)?.message != undefined) {
      let message = this.messageService.newMessage.get(userid)?.message;
      let img = this.messageService.newMessage.get(userid)?.avatar;
      this.messageService.render(message, userid, img);
      this.messageService.newMessage.clear();
    }
    let datetemp = "";
      // function delay(ms: number) {
      //   return new Promise(function (resolve) {
      //     setTimeout(resolve, ms);
      //   });
      // }

    this.messageService.loadMessage(this.id).subscribe((res) => {
      if (res == null)
        return;
      this.$chatHistory = $('.chat-widget-conversation');
      this.listMess = JSON.parse(JSON.stringify(res));
      console.log("this.listMess: " + this.listMess);
      for (let m of this.listMess) {
        if (datetemp.substring(0,10).toString() !== m[2].substring(0,10).toString() || datetemp=='') {
          this.$chatHistory.append(this.showDate(m[2]));
          datetemp = m[2];
        }
        if (m[3] == this.id) {
          this.$chatHistory.append(
            '<div class="chat-widget-speaker left" style="padding: 0 26px 0 36px; display: flex; flex-flow: column; position: relative; margin-bottom: 1rem !important;">' +
            '<a class="user-avatar small user-status-avatar no-border no-outline avatar-mess" href="profile" style="position: absolute;left: -10px;top: -8px; width: 40px;height: 44px; display: block;"> ' +
            '<div class="hexagon-container" style="width: 35px; height: 38px; position: relative; margin: 0 auto;background: white;clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); "> ' +
            '<div class="hexagon user-avatar-content" style="top: 6px;left: 5px;position: absolute;z-index: 3;width: 40px;height: 44px;overflow: hidden;">  ' +
            '<div class="hexagon-image" ' +
            'style="background-image: url(' + m[4] + '); width: 20px; height: 23px;position: relative; z-index: 3;background-size: cover;clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);left: 4%;top: 2%;"></div>' +
            '</div>' +
            '<div class="hexagon user-avatar-border" style="position: absolute;top: 0;left: 0;z-index: 1;">' +
            '<div style="position: absolute; top: 0; left: 0; z-index: 1; content: \'\'; width: 32px; height: 36px; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); left: 1px; top: 0px; background-image: linear-gradient(to right, #41efff, #615dfa); display: block;"></div>' +
            '<div class="hexagon-border"></div>' +
            '</div>' +
            '<div class="hexagon user-avatar-progress-border" style="margin-left: 11%;margin-top: 10.3%; width: 26px;height: 29px;top: 0;left: 0;z-index: 2;position: absolute;background: white;clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);">' +
            '  <div class="user-avatar-progress" style="top: 0;left: 0;z-index: 3;position: absolute;"></div>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '<p class="chat-widget-speaker-message" style="border-top-left-radius: 0; display: inline-block;padding: 12px;border-radius: 10px;background-color: #f5f5fa;font-size: 0.875rem;font-weight: 600; line-height: 1.1428571429em;width: fit-content;color: #3e3f5e;font-family: Helvetica, Arial, sans-serif;margin: 0;">' +
            m[1] +
            '</p>' +
            '<p class="chat-widget-speaker-timestamp" style="margin-top: 12px !important;color: #adafca;font-size: 0.75rem;font-weight: 500;font-family: Helvetica, Arial, sans-serif;line-height: 1em;margin: 0;">'
            + this.customTime(m[2]) + '</p>' +
            '</div>	'
          );
        } else {
          this.$chatHistory.append(
            '<div class="chat-widget-speaker right" style="margin-top: 16px; padding-left: 64px; align-items: flex-end; display: flex; flex-flow: column; position: relative;">' +
            ' <p class="chat-widget-speaker-message" style="border-top-right-radius: 0; background-color: #615dfa !important; font-family: Helvetica, Arial, sans-serif !important; margin-bottom: 0 !important; color: #fff;display: inline-block;padding: 12px;border-radius: 10px;background-color: #f5f5fa;font-size: 0.875rem;font-weight: 600;line-height: 1.1428571429em;width: fit-content;">'
            + m[1] +
            '</p>' +
            '<p class="chat-widget-speaker-timestamp" style="margin-top: 12px; margin-bottom: 0 !important; color: #adafca;font-size: 0.75rem;font-weight: 500; font-family: Helvetica, Arial, sans-serif !important;line-height: 1em;">'
            + this.customTime(m[2]) +
            '</p>' +
            '</div>'
          );
        }
      }
    });
    this.count++;
  }


  addMessage() {
    this.$textarea = $('#chat-widget-message-text-2');
    if (this.$textarea.val() != null) {
      this.sendMessage(this.$textarea.val());
    }
  }
  addMessageEnter(event) {
    if (event.keyCode === 13) {
      this.addMessage();
    }
  }
  sendMessage(message) {
    let username = localStorage.getItem("chatUserId");
    this.sender = JSON.parse(JSON.stringify(this.messageService.getSender()));
    let avatar = this.sender.avatar;
    this.$chatHistory = $('.chat-widget-conversation');
    this.$textarea = $('#chat-widget-message-text-2');
    if (message.trim() !== '') {
      this.messageService.sendMsg(username, message, avatar);
      this.scrollToBottom();

      this.$chatHistory.append(
        '<div class="chat-widget-speaker right" style="margin-top: 16px; padding-left: 64px; align-items: flex-end; display: flex; flex-flow: column; position: relative;">' +
        ' <p class="chat-widget-speaker-message" style="border-top-right-radius: 0; background-color: #615dfa !important; font-family: Helvetica, Arial, sans-serif !important; margin-bottom: 0 !important; color: #fff;display: inline-block;padding: 12px;border-radius: 10px;background-color: #f5f5fa;font-size: 0.875rem;font-weight: 600;line-height: 1.1428571429em;width: fit-content;">'
        + message +
        '</p>' +
        '<p class="chat-widget-speaker-timestamp" style="margin-top: 12px; margin-bottom: 0 !important; color: #adafca;font-size: 0.75rem;font-weight: 500; font-family: Helvetica, Arial, sans-serif !important;line-height: 1em;">'
        + this.getCurrentTime() +
        '</p>' +
        '</div>'
      );
      this.scrollToBottom();
      this.$textarea.val('');
    }
  }
  scrollToBottom() {
    this.$chatHistory = $('.chat-widget-conversation');
    this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
  }
  getCurrentTime() {
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  }

  customTime(time) {
    let regex = /(\d{2}:\d{2})/;
    let match = time.match(regex);
    if (match) {
      let extractedTime = match[1]; // Extracted "15:43"
      return extractedTime;
    } else {
      console.log("No time found in the string.");
      return null;
    }
  }
  showDate(date: string) {
    let d = '<div class="time-date" style="background: #c1c2c4;color: white;width: fit-content;padding: 4px 5px;border-radius: 8px;position: absolute;z-index: 1;right: 40%;">' +
      '<div class="date-send" style="text-align: center;font-size: 12px;">' +
      this.checkDate(date) +
      '</div>' +
      '</div>';
    return d;
  }
  checkDate(date: string) {
    let d = date.substring(0, 10);
    let date1 = new Date(d);
    let date2 = new Date();
    if (date1 < date2 && (date2.getDate() - 1).toString() == date.substring(8, 10)) {
      return "Hôm qua";
    } else if (date1 > date2) {
      return null;
      console.log('date1 is later than date2');
    } else {
      return "Hôm nay";
    }
  }
}
