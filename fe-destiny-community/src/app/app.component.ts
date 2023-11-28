import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { UIServiveService } from './user/service/ui-servive.service';
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
        this.setMode();
    }

    constructor(
        private translateService: TranslateService,
        public messageService: MessageService,
        private cookieService: CookieService,
        private loginService: LoginService,
        private renderer: Renderer2,
        private UIService: UIServiveService
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


    setMode(): void {
        const darkMode = localStorage.getItem('dark-mode');

        // let checkbox = document.getElementById("dn") as HTMLInputElement;
        if (darkMode === null) {
            // Nếu dữ liệu đầu vào là null, lấy từ local storage
            localStorage.setItem('dark-mode', 'false');
            this.UIService.toggleDarkStyle(false);
        } 
        else {
            if(darkMode === 'true'){
                document.body.classList.add('dark');
                this.UIService.toggleDarkStyle(true);
            } else {
                this.UIService.toggleDarkStyle(false);
            }
                
        }
    }

}
