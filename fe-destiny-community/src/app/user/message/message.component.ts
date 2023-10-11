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

  ngOnInit() {
    this.messageService.dataUpdated.subscribe(() => {
      // Đây là nơi bạn đặt mã để xử lý khi dữ liệu đã được cập nhật.
     this.mapUser = this.messageService.mapUser;
      // Thực hiện các thao tác cần thiết sau khi dữ liệu đã được cập nhật.
    });
    this.messageService.isLoading = true;
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
  ) {}

  /* ============template============= */

  checkIsOnline: boolean = true

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
    if (this.messageService.newMessage.get(userid)?.message != undefined) {
      let message = this.messageService.newMessage.get(userid)?.message;
      let img = this.messageService.newMessage.get(userid)?.avatar;
      this.messageService.render(message, userid, img);
      this.messageService.newMessage.clear();
    }
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
}
