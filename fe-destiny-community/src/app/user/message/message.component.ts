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
  // listMess: any;
  listMessages:any;
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
  // data: UserModel[];
  data: any;
  mapTemp: any;
  searchResult: any[] = [];
  searchTerm: string = '';
  checkLoadingdata: boolean = true;
  checkBlock: boolean = false;

  ngOnInit() {

    this.scrollToBottomMessage();
    this.messageService.isOriginal = true;
    this.isLoading = this.messageService.isLoading;

    if (this.messageService.mapUser != null || this.mapTemp != null) {
      this.mapUser = this.messageService.mapUser;
      // this.messageService.isLoading = false;
      this.data = Array.from(this.messageService.mapUser.values());
      this.mapTemp = this.messageService.mapUser;
    }
    this.messageService.dataUpdated.subscribe(() => {
      // Đây là nơi bạn đặt mã để xử lý khi dữ liệu đã được cập nhật.
      // Chuyển dữ liệu từ Map thành một mảng.
      this.data = Array.from(this.messageService.mapUser.values());
      this.mapTemp = this.messageService.mapUser;
    });
    // this.messageService.dataUpdatedMessages.subscribe(()=>{
    //   this.listMessages=this.messageService.listMessages;
    // });
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

    this.checkScrollPosition();
  }

  constructor(
    public modalService: ModalService,
    public messageService: MessageService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }

  /* ============Message============= */
  search() {
    this.searchResult = this.data.filter(item => item.fullname.includes(this.searchTerm));
  }

  block() {
    let id = parseInt(this.id)
    this.messageService.blockApi(id, false).subscribe(() => {

      this.selectedUser(this.id);
    })
  }

  unBlock() {
    let id = parseInt(this.id)
    this.messageService.blockApi(id, true).subscribe(() => {

      this.selectedUser(this.id);
    })
  }

  selectedUser(userid) {
    this.checkBlock = false;
    this.messageService.checkUserBlock = false;
    let chatContainer = document.getElementById("chatContainer") as HTMLElement;
    if (chatContainer) {
      chatContainer.style.opacity = '0';
      this.checkLoadingdata = true;
    }
    if (this.id != '') {
      this.renderer.removeClass(this.el.nativeElement.querySelector('#chat-widget-message-' + this.id), 'active');
    }
    this.messageService.mapNotification.set(userid, false);
    let mapEntries = Array.from(this.messageService.mapNotification.entries());
    let hasTrueValue = mapEntries.some(([key, value]) => value === true);
    if (!hasTrueValue) {
      this.messageService.notif_mess = false;
    }
    this.messageService.selectedUser = userid;
    this.id = userid;
    this.messageService.isOriginal = false;
    if (this.mapTemp) {
      this.image = this.mapTemp.get(userid)?.avatar;

      this.fullname = this.mapTemp.get(userid)?.fullname;

      if (this.mapTemp.get(userid)?.type == 'LEAVE') {
        this.isOnline = 'Offline';
        this.checkIsOnline = false;
      } else {
        this.isOnline = 'Online';
        this.checkIsOnline = true;
      }
    }

    //Xử lý sự kiện khi click vào chat
    let element = this.el.nativeElement.querySelector('#chat-widget-message-' + userid); // Lấy phần tử dựa trên ID
    if (element) {
      this.renderer.addClass(element, 'active'); // Thêm class "active" vào phần tử khi click
    }

    let datetemp = "";
    let countMessage = document.getElementById('count-mess-' + this.id);
    if (countMessage) {
      countMessage.parentNode?.removeChild(countMessage);
    }

    this.messageService.loadMessage(this.id).subscribe((res) => {
      if (this.count > 0) {
        document.querySelectorAll(".chat-widget-speaker, .time-date, .br, .notify-block").forEach((e) => {
          e.remove();
        });
        this.count = 0;
      }
      this.count++;

      this.$chatHistory = $('.chat-widget-conversation');
      this.messageService.listMessages = JSON.parse(JSON.stringify(res));
      this.checkLoadingdata = false;
      if (chatContainer && !this.checkLoadingdata) {
        chatContainer.style.opacity = '1';
      }
      // this.scrollToBottomMessage();
    });
    this.$textarea = $('#chat-widget-message-text-2');
    this.$textarea.val('');
  }

  trackByFn(index: number, item: any): any {
    return item[0]; // Sử dụng một giá trị duy nhất từ mỗi mục
  }

  async messageRecall(id: number, position) {
    let from =parseInt(localStorage.getItem("chatUserId")+'');
    let to =parseInt(this.messageService.selectedUser+'');
    const newListMessage = await this.messageService.messageRecallApi(id, position, from, to);
    this.messageService.listMessages.splice(position, 1, ...newListMessage);
    let textLastMess = document.getElementById('last-message-' + this.selectedUser);
    if (textLastMess) textLastMess!.innerText = 'Bạn đã thu hồi tin nhắn';
  }
  
  
  addMessage() {
    this.$textarea = $('#chat-widget-message-text-2');
    if (this.$textarea.val().trim() !== '') {
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
      if (this.messageService.checkUserBlock === false) {
        this.messageService.sendMsg(username, message, avatar,'');
        this.scrollToBottom();
      } else {
        this.$chatHistory.append(
          '<div class="notify-block" style="text-align: center;font-size: 14px;font-family: Helvetica, Arial, sans-serif;color: red;font-weight: 700;">Bạn đã bị chặn!</div>'
        );
      }
      message = '';
      this.scrollToBottom();
      this.$textarea.val('');
    }
  }
  scrollToBottom() {
    this.$chatHistory = $('.chat-widget-conversation');
    this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
  }
  getCurrentTime() {
    let date = new Date();
    let hours = (date.getHours() < 10) ? '0' + (date.getHours()) : (date.getHours());
    let minutes = (date.getMinutes() < 10) ? '0' + (date.getMinutes()) : (date.getMinutes());
    let newTime = hours + ':' + minutes;
    return newTime;
  }
  getCustomTime(time) {
    let date = new Date(time);
    let hours = (date.getHours() < 10) ? '0' + (date.getHours()) : (date.getHours());
    let minutes = (date.getMinutes() < 10) ? '0' + (date.getMinutes()) : (date.getMinutes());
    let newTime = hours + ':' + minutes;
    return newTime;
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
  
  checkDate(date: string) {
    let date1 = new Date(date.substring(0,10));
    let d = new Date();
    let day = d.getDate(); // Lấy ngày trong tháng (1-31)
    let month = d.getMonth() + 1; // Lấy tháng (0-11), nên cộng thêm 1
    let year = d.getFullYear();
    let date2 = new Date(year + '-' + month + '-' + day);
    console.log("date1: "+date1);
console.log("date2: "+date2);
   console.log('date1 < date2: '+(date1 < date2));
    if (date1 < date2 && (date2.getDate() - 1) == date1.getDate()) {
      return "Hôm qua";
    } else if (date1 < date2 && (date2.getDate() - 1) > parseInt(date.substring(8, 10))) {
      let year = (date1.getFullYear() < date2.getFullYear()) ? '-' + date1.getFullYear() : '';
      let month = (date1.getMonth() + 1 < 10) ? '0' + (date1.getMonth() + 1) : (date1.getMonth() + 1);
      let day = (date1.getDate() < 10) ? '0' + date1.getDate() : date1.getDate();
      return day + '-' + month + year;
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
    // console.warn("Math.round(scrollableDiv.scrollTop): " + Math.round(scrollableDiv.scrollTop));
    // console.warn("scrollableDiv.scrollHeight: " + scrollableDiv.scrollHeight);
    // console.warn("scrollableDiv.clientHeight: " + scrollableDiv.clientHeight);
    scrollableDiv.addEventListener('scroll', () => {
      // Kiểm tra vị trí cuộn
      if ((scrollableDiv.scrollHeight - scrollableDiv.clientHeight - Math.round(scrollableDiv.scrollTop)) > 1) {
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

  onRightClick(event: MouseEvent, messageId: string) {
    event.preventDefault();

    // Assuming the dropdown is a sibling of the right-clicked element
    const dropdown = document.getElementById(`recall-menu-${messageId}`) as HTMLElement;

    if (dropdown) {
      // Kiểm tra xem dropdown đang hiển thị hay không
      const isDropdownVisible = dropdown.style.display === 'block';

      // Ẩn tất cả các dropdown trước khi hiển thị dropdown hiện tại
      this.hideAllDropdowns();

      // Nếu dropdown đang hiển thị, ẩn nó; nếu không, hiển thị nó
      dropdown.style.display = isDropdownVisible ? 'none' : 'block';

      // Chỉ thêm sự kiện click nếu dropdown đang hiển thị
      if (isDropdownVisible) {
        // Listen for a click outside the dropdown to hide it
        const clickListener = (clickEvent: MouseEvent) => {
          // Check if the click is outside the dropdown
          if (!dropdown.contains(clickEvent.target as Node)) {
            dropdown.style.display = 'none';
            document.removeEventListener('click', clickListener);
          }
        };

        // Add click event listener to the document
        document.addEventListener('click', clickListener);
      }
    }
  }

  hideAllDropdowns() {
    // Ẩn tất cả các dropdown trên trang
    const allDropdowns = document.querySelectorAll('.recall-menu') as NodeListOf<HTMLElement>;
    allDropdowns.forEach(dropdown => (dropdown.style.display = 'none'));
  }


}
