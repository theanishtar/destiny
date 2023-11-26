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

        this.setDarkMode(null);
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


    setDarkMode(darkMode: boolean | null): void {
        const body = document.body;

        if (darkMode === null) {
            // Nếu dữ liệu đầu vào là null, lấy từ local storage
            const savedDarkMode = localStorage.getItem('dark-mode');
            let checkbox = document.getElementById("dn") as HTMLInputElement;
            let eActive = document.querySelector('.form-switch');
            if (savedDarkMode === 'true') {
                body.classList.add('dark');
                eActive?.classList.add('active');
                checkbox.checked = false;
            } else {
                body.classList.remove('dark');
                eActive?.classList.remove('active');
                checkbox.checked = true;
            }
        } else {
            // Nếu dữ liệu đầu vào không phải null
            if (darkMode) {
                // Nếu là true, thêm class 'dark' vào body
                body.classList.add('dark');
            } else {
                // Nếu là false, xóa class 'dark' khỏi body
                body.classList.remove('dark');
            }

            // Lưu trạng thái dark mode vào local storage
            localStorage.setItem('dark-mode', darkMode.toString());
        }
    }

    mode() {
        let checkbox = document.getElementById("dn") as HTMLInputElement;
        var e = !checkbox.checked;
        this.setDarkMode(e);
    }
}
