import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';

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
import { UserModel } from '../Model/UserModel.js';

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
  message: string = ''; // Biến để lưu trữ nội dung nhập
  checkIsOnline: boolean = true
  sender: any;
  checkListChat: boolean = false;
  listFriendss: any;
  listMess: any;
  mapUser = new Map<string, UserModel>();
  isOnline: string | undefined;
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
  isLoading = true;
  data: UserModel[];
  ngOnInit() {
    this.messageService.isOriginal = true;
    this.isLoading = this.messageService.isLoading;

    if (this.messageService.mapUser != null) {
      this.mapUser = this.messageService.mapUser;
      // this.messageService.isLoading = false;
      this.data = Array.from(this.messageService.mapUser.values());
    }
    this.messageService.dataUpdated.subscribe(() => {
      // Đây là nơi bạn đặt mã để xử lý khi dữ liệu đã được cập nhật.
      // Chuyển dữ liệu từ Map thành một mảng.
      this.data = Array.from(this.messageService.mapUser.values());
    });
    if (this.messageService.checkSelected != '') {
      this.selectedUser(this.messageService.checkSelected);
    }
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


  /* ============Message============= */
  selectedUser(userid) {
    if (this.id != '') {
      this.renderer.removeClass(this.el.nativeElement.querySelector('#chat-widget-message-' + this.id), 'active');
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

    let datetemp = "";

    this.messageService.loadMessage(this.id).subscribe((res) => {
      if (this.count > 0) {
        document.querySelectorAll(".chat-widget-speaker, .time-date").forEach((e) => {
          e.remove();
        });
        this.count = 0;
      }
      this.count++;

      this.$chatHistory = $('.chat-widget-conversation');
      this.listMess = JSON.parse(JSON.stringify(res));
      if (res != null) {
        for (let m of this.listMess) {
          if (datetemp.substring(0, 10).toString() !== m[2].substring(0, 10).toString() || datetemp == '') {
            this.$chatHistory.append(this.showDate(m[2]));
            datetemp = m[2];
          }
          let countMessage = document.getElementById('count-mess-' + this.id);
          if (countMessage) {
            countMessage.parentNode?.removeChild(countMessage);
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
              '<p class="chat-widget-speaker-message" style="border-top-left-radius: 0; display: inline-block;padding: 12px;border-radius: 10px;background-color: #f5f5fa;font-size: 0.875rem;font-weight: 600; line-height: 1.1428571429em;width: fit-content; max-width: 250px; word-wrap: break-word; white-space: normal; color: #3e3f5e;font-family: Helvetica, Arial, sans-serif;margin: 0;">' +
              m[1] +
              '</p>' +
              '<p class="chat-widget-speaker-timestamp" style="margin-top: 12px !important;color: #adafca;font-size: 0.75rem;font-weight: 500;font-family: Helvetica, Arial, sans-serif;line-height: 1em;margin: 0;">'
              + this.getCustomTime(m[2]) + '</p>' +
              '</div>	'
            );
          } else {
            this.$chatHistory.append(
              '<div class="chat-widget-speaker right" style=" padding-left: 64px; align-items: flex-end; display: flex; flex-flow: column; position: relative;">' +
              ' <p class="chat-widget-speaker-message" style="border-top-right-radius: 0; background-color: #615dfa !important; font-family: Helvetica, Arial, sans-serif !important; margin-bottom: 0 !important; color: #fff;display: inline-block;padding: 12px;border-radius: 10px;background-color: #f5f5fa;font-size: 0.875rem;font-weight: 600;line-height: 1.1428571429em;width: auto; max-width: 250px; word-wrap: break-word; white-space: normal;">'
              + m[1] +
              '</p>' +
              '<p class="chat-widget-speaker-timestamp" style="margin-top: 12px; margin-bottom: 0 !important; color: #adafca;font-size: 0.75rem;font-weight: 500; font-family: Helvetica, Arial, sans-serif !important;line-height: 1em;">'
              + this.getCustomTime(m[2]) +
              '</p>' +
              '</div>'
            );
          }
        }
      }

      if (this.messageService.newMessage.get(userid)?.message != undefined) {
        let message = this.messageService.newMessage.get(userid)?.message;
        let img = this.messageService.newMessage.get(userid)?.avatar;
        this.messageService.render(message, userid, img);
        this.messageService.newMessage.clear();
      };

      this.scrollToBottomMessage();
    });
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
        '<div class="chat-widget-speaker right" style=" padding-left: 64px; align-items: flex-end; display: flex; flex-flow: column; position: relative;">' +
        ' <p class="chat-widget-speaker-message" style="border-top-right-radius: 0; background-color: #615dfa !important; font-family: Helvetica, Arial, sans-serif !important; margin-bottom: 0 !important; color: #fff;display: inline-block;padding: 12px;border-radius: 10px;background-color: #f5f5fa;font-size: 0.875rem;font-weight: 600;line-height: 1.1428571429em;width: auto; max-width: 250px; word-wrap: break-word; white-space: normal;">'
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
  getCustomTime(time) {
    return new Date(time).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  }

  customTime(time) {
    let regex = /(\d{2}:\d{2})/;
    let match = time.match(regex);
    if (match) {
      let extractedTime = match[1]; // Extracted "15:43"
      return extractedTime;
    } else {
      return null;
    }
  }
  showDate(date: string) {
    let d = '<div class="time-date" style="background: #c1c2c4;color: white;width: fit-content;padding: 4px 5px;border-radius: 8px;position: absolute;z-index: 1;right: 40%;">' +
      '<div class="date-send" style="text-align: center;font-size: 12px;">' +
      this.checkDate(date) +
      '</div>' +
      '</div> <br>';
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
    } else {
      return "Hôm nay";
    }
  }

  /* ============template============= */
  scrollToBottomMessage() {
    const chatContainer = document.getElementById("chatContainer");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
      // Sử dụng hiệu ứng mượt
      // chatContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  checkScrollPosition() {
    const scrollableDiv = document.getElementById('chatContainer')!;
    const scrollButton = document.getElementById('scrollToBottomButton')!;
    // Thêm sự kiện lắng nghe lướt cho thẻ div
    scrollableDiv.addEventListener('scroll', () => {
      // Kiểm tra vị trí cuộn
      if (Math.round(scrollableDiv.scrollTop) < scrollableDiv.scrollHeight - scrollableDiv.clientHeight) {
        // Hiển thị nút scroll khi cuộn đến vị trí cuối cùng (điều kiện kiểm tra lúc này có thể khác)
        scrollButton.style.display = 'block';
      } else {
        // Ẩn nút scroll nếu không cuộn xuống
        scrollButton.style.display = 'none';
      }
    });
  }

  checkEnter(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.addMessage();
    }
  }

}
