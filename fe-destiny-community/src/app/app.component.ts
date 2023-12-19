import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { UIServiveService } from './user/service/ui-servive.service';
import { MessageService } from './user/service/message.service';
import { LoginService } from './service/login.service';
import { LocalService } from '@app/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FE_Destiny';
  sender: any;
  showModal = false;

  ngOnInit() {
    this.setMode();
    this.setLang();
    this.setSource();
    this.messageService.currentShowModal.subscribe((showModal) => {
      this.showModal = showModal;
      // console.warn("this.showModal: " + this.showModal);
    });
  }

  constructor(
    private translateService: TranslateService,
    public messageService: MessageService,
    private UIService: UIServiveService,
    private localService: LocalService
  ) {
    // window.addEventListener('beforeunload', (event) => {
    //   // Thực hiện các hành động trước khi trang được tải lại (refresh)
    //   // Nếu bạn return một giá trị khác ngoài chuỗi, trình duyệt có thể hiển thị một thông báo xác nhận cho người dùng.
    //   // Ví dụ: return "Bạn có chắc chắn muốn rời khỏi trang?";
    //   let id = this.messageService.selectedUser;
    //   if (this.messageService.fromUser != undefined) {
    //     id = this.messageService.fromUser;
    //   }
    //   this.messageService.checkRefuseCall(id, 'cancel');
    // });


    // // Chặn mở dev tool bằng click chuột phải hoặc tổ hợp phím
    // document.addEventListener("keydown", function (e) {
    //   // Chặn F12, Ctrl+Shift+I, và Ctrl+Shift+C trên Windows/Linux
    //   if ((e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C"))) ||
    //     // Chặn Cmd+Opt+I trên Mac
    //     (e.metaKey && e.altKey && e.key === "I")) {
    //     e.preventDefault();
    //   }
    // });

    // document.addEventListener("contextmenu", function (e) {
    //   e.preventDefault();
    // });

    // // Kiểm tra sự kiện khi người dùng thay đổi kích thước cửa sổ
    // window.addEventListener("resize", this.checkDevTools);
  }

  checkDevTools() {
    if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
      // Developer Tools đang mở, đóng nó
      window.location.href = "about:blank"; // Đặt URL thành about:blank để đóng Developer Tools
    }
  }

  openModal() {
    this.messageService.setShowModal(true);
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

  setMode(): void {
    const darkMode = localStorage.getItem('dark-mode');

    // let checkbox = document.getElementById("dn") as HTMLInputElement;
    if (darkMode === null) {
      // Nếu dữ liệu đầu vào là null, lấy từ local storage
      localStorage.setItem('dark-mode', 'false');
      this.UIService.toggleDarkStyle(false);
    } else {
      if (darkMode === 'true') {
        document.body.classList.add('dark');
        this.UIService.toggleDarkStyle(true);
      } else {
        this.UIService.toggleDarkStyle(false);
      }
    }
  }

  setLang(): void {
    const curentLang = this.localService.getData('lang'); // en || vi
    if (curentLang == null) {
      this.localService.saveData('lang', 'vi');
    } else {
      if (curentLang == 'en') this.translateService.use('en-US');
    }
  }

  setSource() {
    const selectedAudio = localStorage.getItem('selectedAudio');
    if (selectedAudio == null) {
      localStorage.setItem('selectedAudio', '../../../assets/js/sound/toy_phone.mp3');
    } else {
      this.messageService.setAudioSource(selectedAudio);
    }
  }
}
