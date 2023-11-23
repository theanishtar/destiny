import { Component, OnInit, ElementRef, Input, Renderer2, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { liquid } from "../../../assets/js/utils/liquidify.js";
import { avatarHexagons } from '../../../assets/js/global/global.hexagons.js';
import { tooltips } from '../../../assets/js/global/global.tooltips.js';
import { popups } from '../../../assets/js/global/global.popups.js';
import { headers } from '../../../assets/js/header/header.js';
import { sidebars } from '../../../assets/js/sidebar/sidebar.js';
import { content } from '../../../assets/js/content/content.js';
import { form } from '../../../assets/js/form/form.utils.js';
import 'src/assets/js/utils/svg-loader.js';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
// 
import { ModalService } from '../service/modal.service';
import { MessageService } from '../service/message.service';
import { environment } from '../../../environments/environment'
import { UserModel } from '../Model/UserModel.js';
import { ReportService } from '../service/report.service';

// import { CustomTimePipe } from '@app/custom-time.pipe';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/vendor/simplebar.css`,
    './message.component.css'
  ],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MessageComponent implements OnInit {
  message: string = ''; // Biến để lưu trữ nội dung nhập
  checkIsOnline: boolean = true
  sender: any;
  checkListChat: boolean = false;
  listFriendss: any;
  mapUser = new Map<string, UserModel>();
  isOnline: string | undefined;
  image: string | undefined;
  fullname: string | undefined;
  id: string = '';
  $chatHistory: any;
  $mess: any;
  $button: any;
  $textarea: any;
  $chatHistoryList: any;
  userFromLoginCustom: number = 0;
  userToLoginCustom: number = 0;
  usersTemplateHTML: string;
  count: number = 0;
  isLoading = true;
  data: any;
  mapTemp: any;
  searchResult: any[] = [];
  searchTerm: string = '';
  noResults: boolean = false; // Biến để kiểm tra xem có kết quả hay không
  checkLoadingdata: boolean = true;
  checkBlock: boolean = false;
  checkClick: boolean = true;
  listMessages: any[] = [];

  ngOnInit() {

    this.messageService.isOriginal = true;
    this.isLoading = this.messageService.isLoading;

    if (this.messageService.mapUser != null || this.mapTemp != null) {
      this.mapUser = this.messageService.mapUser;
      this.data = Array.from(this.messageService.mapUser.values());
      this.mapTemp = this.messageService.mapUser;
    }
    this.messageService.dataUpdated.subscribe(() => {
      // Đây là nơi bạn đặt mã để xử lý khi dữ liệu đã được cập nhật.
      // Chuyển dữ liệu từ Map thành một mảng.

      this.data = Array.from(this.messageService.mapUser.values());
      this.mapTemp = this.messageService.mapUser;
      this.cdr.markForCheck();

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
    // this.checkScrollPosition();

  }

  constructor(
    public modalService: ModalService,
    public messageService: MessageService,
    private el: ElementRef,
    private renderer: Renderer2,
    public storage: Storage,
    private cdr: ChangeDetectorRef,
    public reportService: ReportService
    // public customTimePipe: CustomTimePipe
  ) {
  }

  /* ============Message============= */

  search() {
    if (this.searchTerm.trim() === '') {
      // Nếu không có giá trị tìm kiếm, hiển thị toàn bộ danh sách
      this.searchResult = this.data;
      this.noResults = false;
    } else {
      // Nếu có giá trị tìm kiếm, thực hiện tìm kiếm
      this.searchResult = this.data.filter(item => item.fullname.includes(this.searchTerm));
      this.noResults = this.searchResult.length === 0;
    }
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
  currentPage: number = 1;
  idSelected: number;
  async selectedUser(userid) {
    this.currentPage = 1;
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
    this.messageService.listMessages.splice(0, this.messageService.listMessages.length);
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
    
    this.idSelected = parseInt(this.id)
    // this.messageService.loadMessage(this.id, this.currentPage).subscribe((res) => {
    const res = await this.messageService.loadMessage(this.idSelected, this.currentPage);
    if (res != null) {
      if (this.count > 0 && this.checkClick == false) {
        document.querySelectorAll(".chat-widget-speaker, .time-date, .br, .notify-block,.review-img").forEach((e) => {
          e.remove();
        });
        this.count = 0;
        this.checkClick = false;
      }
      this.count++;
      this.$chatHistory = $('.chat-widget-conversation');
      this.messageService.listMessages = JSON.parse(JSON.stringify(res));
      this.messageService.checkScroll = 1;
      this.checkLoadingdata = false;
      this.checkClick = true;
      this.cdr.markForCheck();
      if (chatContainer && !this.checkLoadingdata) {
        chatContainer.style.opacity = '1';
      }
      this.scrollToBottom();
      // });
      this.$textarea = $('#chat-widget-message-text-2');
      this.$textarea.val('');
    }

  }

  // trackByFn(index: number, item: any): any {
  //   return item[0]; // Sử dụng một giá trị duy nhất từ mỗi mục
  // }

  trackByFn(index: number, item: any): any {
    return index; // hoặc return item.id; nếu có một trường id duy nhất cho mỗi item
  }

  addMessage() {
    this.$textarea = $('#chat-widget-message-text-2');
    if (this.$textarea.val().trim() !== '' || this.file.length > 0) {
      this.sendMessage(this.$textarea.val());
    }
  }
  addMessageEnter(event) {
    if (event.keyCode === 13) {
      this.addMessage();
    }
  }
  async sendMessage(message) {
    let username = localStorage.getItem("chatUserId");
    this.sender = JSON.parse(JSON.stringify(this.messageService.getSender()));
    let avatar = this.sender.avatar;
    this.$chatHistory = $('.chat-widget-conversation');
    this.$textarea = $('#chat-widget-message-text-2');


    if (message.trim() !== '' || this.file.length > 0) {
      let type = '';
      let images: string[] = [];
      this.messageService.loaddingBall = true;
      this.messageService.listImages = this.listImg;
      if (this.file.length > 0) {
        this.imageSources = [];
        type = 'image';
        for (let img of this.file) {
          await this.addData(img);
        }
        images = this.listImg;
        this.listImg = [];
      }
      if (this.messageService.checkUserBlock === false) {
        this.messageService.sendMsg(username, message, avatar, type, images);
        this.file = {};
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

  /* ===================Thu hồi tin nhắn================================= */
  async messageRecall(id: number, position) {
    let from = parseInt(localStorage.getItem("chatUserId") + '');
    let to = parseInt(this.messageService.selectedUser + '');
    const newListMessage = await this.messageService.messageRecallApi(id, position, from, to);
    console.log('newListMessage: ' + JSON.stringify(newListMessage));
    this.messageService.listMessages.splice(position, 1, ...JSON.parse('[' + JSON.stringify(newListMessage) + ']'));
    let textLastMess = document.getElementById('last-message-' + this.selectedUser);
    if (textLastMess) textLastMess!.innerText = 'Bạn đã thu hồi tin nhắn';
    this.cdr.markForCheck();
    this.hideAllDropdowns();
  }

  /* ============send image============= */
  listImg: any[] = [];
  imageSources: string[] = [];
  file: any = {};

  uploadImg(event: any) {
    let newFiles = event.target.files;
    if (this.imageSources.length <= 0) {
      this.file = newFiles;
    } else {
      this.file = [...this.file, ...newFiles];
    }

    const blobs = this.toBlob(this.file);
    this.imageSources = blobs.map(blob => URL.createObjectURL(blob));
  }

  toBlob(files: File[]): Blob[] {
    const blobs: Blob[] = [];

    for (const file of files) {
      blobs.push(file);
    }

    return blobs;
  }
  createFileList(array) {
    const dataTransfer = new DataTransfer();
    for (const file of array) {
      dataTransfer.items.add(file);
    }
    return dataTransfer.files;
  }

  async addData(file: any) {
    return new Promise<void>((resolve) => {
      const storageRef = ref(this.storage, 'message-image/' + file.name);
      //sử dụng Firebase Storage để tải lên tệp (file) vào lưu trữ Firebase
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => { },
        (error) => {
          console.log(error.message);
          resolve();
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.listImg.push(downloadURL);
            resolve();
          });
        }
      );
    });
  }
  deleteImg(event: any, i) {
    if (i >= 0 && i < this.file.length) {
      // Tạo một mảng thường
      const newArray = Array.from(this.file);
      // Xóa phần tử từ mảng thường
      newArray.splice(i, 1);
      // Cập nhật this.file từ mảng thường
      this.file = this.createFileList(newArray);
      // Sau khi xóa, tạo lại danh sách blobs và image sources
      const blobs = this.toBlob(this.file);
      this.imageSources = blobs.map(blob => URL.createObjectURL(blob));
    }
  }


  /* ============template============= */
  checkLoadingWait: boolean = false;
  checkCountPosts: boolean = true;
  scrollToBottom() {
    this.$chatHistory = $('.chat-widget-conversation')!;
    this.$chatHistory.scrollTop(this.$chatHistory[0]!.scrollHeight);
    // alert(this.$chatHistory[0]!.scrollHeight);
  }

  // async checkScrollPosition() {
  //   const scrollableDiv = document.getElementById('chatContainer')!;
  //   const scrollButton = document.getElementById('scrollToBottomButton')!;
  //   // console.warn("scrollableDiv.scrollHeight: " + scrollableDiv.scrollHeight);
  //   // console.warn("scrollableDiv.clientHeight: " + scrollableDiv.clientHeight);
  //   console.warn("scrollableDiv.scrollTop: " + scrollableDiv.scrollTop);
  //   // Thêm sự kiện lắng nghe lướt cho thẻ div
  //   scrollableDiv.addEventListener('scroll', async () => {
  //     this.hideAllDropdowns();
  //     // Kiểm tra vị trí cuộn
  //     if ((scrollableDiv.scrollHeight - scrollableDiv.clientHeight - scrollableDiv.scrollTop) > 1) {
  //       // Hiển thị nút scroll khi cuộn đến vị trí cuối cùng (điều kiện kiểm tra lúc này có thể khác)
  //       scrollButton.style.display = 'block';
  //     } else {
  //       // Ẩn nút scroll nếu không cuộn xuống
  //       scrollButton.style.display = 'none';
  //     }
  //     if(scrollableDiv.scrollTop === 0 && this.checkCountPosts){
  //       this.checkLoadingWait = true;
  //       try {
  //         this.currentPage++;
  //         const data = await this.messageService.loadMessage(this.idSelected, this.currentPage);
  //         this.messageService.listMessages = [...data, ...this.messageService.listMessages];
  //         this.checkLoadingdata = false;
  //         if (data.length < 50) {
  //           this.checkCountPosts = false;
  //           this.checkLoadingWait = false;
  //         }
  //         console.warn("this.currentPage: " + this.currentPage)
  //       } catch (error) {
  //       }
  //     }
  //   });
  // }
  async checkScrollPosition() {
    const scrollableDiv = document.getElementById('chatContainer')!;
    const scrollButton = document.getElementById('scrollToBottomButton')!;
  
    scrollableDiv.addEventListener('scroll', async () => {
      this.hideAllDropdowns();
  
      if ((scrollableDiv.scrollHeight - scrollableDiv.clientHeight - scrollableDiv.scrollTop) > 1) {
        scrollButton.style.display = 'block';
      } else {
        scrollButton.style.display = 'none';
      }
  
      // Check if scrollTop is at the top and make the API call only once
      if (scrollableDiv.scrollTop === 0 && this.checkCountPosts && !this.checkLoadingWait) {
        this.checkLoadingWait = true;
  
        try {
          this.currentPage++;
          const data = await this.messageService.loadMessage(this.idSelected, this.currentPage);
          this.messageService.listMessages = [...data, ...this.messageService.listMessages];
          this.checkLoadingWait = false;
  
          if (data.length < 50) {
            this.checkCountPosts = false;
            this.checkLoadingWait = false;
          }
  
          console.warn("this.currentPage: " + this.currentPage)
        } catch (error) {
          // Handle error
        }
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
    const targetElement = event.target as HTMLElement;
    const messageDiv = targetElement.closest('.chat-widget-speaker-message') as HTMLElement;

    const dropdown = document.getElementById(`recall-menu-${messageId}`) as HTMLElement;

    if (dropdown) {
      const isDropdownVisible = dropdown.style.display === 'block';

      this.hideAllDropdowns();

      dropdown.style.display = isDropdownVisible ? 'none' : 'block';

      // Ẩn menu nếu click bên ngoài menu
      document.addEventListener('click', function (event) {
        if (!dropdown.contains(targetElement) && event.target !== messageDiv) {
          dropdown.style.display = 'none';
        }
      });
    }
  }
  hideAllDropdowns() {
    // Ẩn tất cả các dropdown trên trang
    const allDropdowns = document.querySelectorAll('.recall-menu') as NodeListOf<HTMLElement>;
    allDropdowns.forEach(dropdown => (dropdown.style.display = 'none'));
  }


}
