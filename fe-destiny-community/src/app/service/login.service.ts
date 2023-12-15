import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//Xử lí bất đồng bộ
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '@app/user/service/message.service';
import Swal from 'sweetalert2';
import '../../assets/toast/main.js';
declare var toast: any;
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { axios } from '../../assets/js/axios.js'
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private userURL = environment.baseUrl + 'v1/oauth/login';
    private userLoginAuth = environment.baseUrl + 'v1/oauth/login/oauh2';
    private userLogout = environment.baseUrl + 'v1/user/logout/chat/';
    private loginQRUrl = environment.baseUrl + 'v1/login/qr/web';

    private userLogined: any[] = [];
    userLogGG: any[] = [];
    idUser: any = this.cookieService.get('id');
    checkLog: boolean = false;

    socket?: WebSocket;
    stompClient?: Stomp.Client;

    loginUser(data: any): Observable<any> {
        return this.http.post<any>(this.userURL, data)
            .pipe(
                tap((response) => {
                    this.userLogined = JSON.parse(JSON.stringify(response));
                    this.setUserLog(this.userLogined);
                    localStorage.setItem(
                        'token',
                        JSON.parse(JSON.stringify(this.getUserLog())).token
                    );
                    localStorage.setItem(
                        'refreshToken',
                        response.refreshToken
                    );
                    this.cookieService.set('full_name', response.name);
                    this.cookieService.set('avatar', response.avatar);
                    this.cookieService.set('id', response.id);
                    this.cookieService.set('role', response.roles[0].authority);
                    // this.cookieService.set('role', JSON.parse(JSON.stringify(this.getUserLog())).roles[0].authority);
                }),
                catchError((error: HttpErrorResponse) => {
                    console.log("error.status: " + error.status)
                    if (error.status === 200) {
                        this.checkLog = false;
                        return [];
                    } else if (error.status === 404) {
                        this.checkLog = false;
                        return throwError(
                            new toast({
                                title: 'Thất bại!',
message: 'Tài khoản không tồn tại',
                                type: 'error',
                                duration: 1500,
                            })
                        );
                    } else if (error.status === 403) {
                        this.checkLog = false;
                        return throwError(
                            new toast({
                                title: 'Tài khoản của bạn đã bị khóa!',
                                message: 'Vui lòng liên hệ admin để được hỗ trợ!',
                                type: 'error',
                                duration: 1500,
                            })
                        );
                    } else if (error.status === 429) {
                        this.checkLog = false;
                        return throwError(
                            new toast({
                                title: 'Vui lòng quay lại sau 1 phút nữa!',
                                message: "Tài khoản đã bị tạm khóa quá tải yêu cầu",
                                type: 'warning',
                                duration: 1500,
                            })
                        );
                    } else if (error.status === 401) {
                        this.checkLog = false;
                        return throwError(
                            new toast({
                                title: 'Thất bại!',
                                message: 'Vui lòng kiểm tra lại thông tin đăng nhập',
                                type: 'error',
                                duration: 1500,
                            })
                        );
                    }
                    else {
                        // Handle other errors
                        return throwError(
                            new toast({
                                title: 'Server hiện không hoạt động!',
                                message: 'Vui lòng quay lại sau, Destiny chân thành xin lỗi vì bất tiện này!',
                                type: 'warning',
                                duration: 3000,
                            })
                        );
                    }
                })
            );
    }

    loginWithGG(token: string, type: string): Observable<any> {
        const params = new HttpParams({ fromObject: { token: token, type: type } });
        return this.http.get<any>(this.userLoginAuth, { params: params }).pipe(
            tap((res) => {
                this.setUserLogGG(JSON.parse(JSON.stringify(res)));
                localStorage.setItem(
                    'token',
                    JSON.parse(JSON.stringify(this.getUserLogGG())).token
                );
                localStorage.setItem(
                    'refreshToken',
                    res.refreshToken
                );
                this.cookieService.set('full_name', res.name);
                this.cookieService.set('avatar', res.avatar);
                this.cookieService.set('id', res.id);
                this.cookieService.set('role', res.roles[0].authority);

            })
        );
    }

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router,
        private route: ActivatedRoute,
        private httpClient: HttpClient,
        private messageService: MessageService,
        private _sanitizer: DomSanitizer,
    ) { }

    isLogin(): boolean {
        if (this.cookieService.get('full_name') == '') {
            return false;
        }
        return true;
    }
    sender: any;
    logout(): void {
        function delay(ms: number) {
            return new Promise(function (resolve) {
                setTimeout(resolve, ms);
            });
        }
        Swal.fire({
            title: 'Bạn muốn đăng xuất?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.get<any>(this.userLogout + this.idUser).subscribe(() => {
                    window.location.href = environment.baseUrlFe + 'home';
                    this.cookieService.deleteAll();
                    localStorage.clear();
                    this.messageService.logout();
                })
            }
        });
    }
    private exitEventSubject = new Subject<void>();

    get exitEvent$() {
        return this.exitEventSubject.asObservable();
    }

    triggerExitEvent() {
        Swal.fire({
            title: 'Bạn muốn đăng xuất?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.get<any>(this.userLogout + this.idUser).subscribe(() => {
                    // this.router.navigate(['home']);
                    window.location.href = environment.baseUrlFe + 'home';
                    this.cookieService.deleteAll();
                    localStorage.clear();
                    this.messageService.logout();
                    this.exitEventSubject.next();
                })
            } else {

                this.exitEventSubject.next();
            }
        });
    }
    autoLogout() {
        this.http.get<any>(this.userLogout + this.idUser).subscribe(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            this.messageService.logout();
        })
    }



    private refreshTokenUrl = environment.baseUrl + 'v1/jwt/get';

    getNewToken(): Observable<any> {
        return axios.getNewToken(this.refreshTokenUrl);
      }

    refreshToken(): Observable<any> {
        console.log('hello');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Authorization': `Bearer ${localStorage.getItem("refreshToken")}`
        });

        const options = { headers: headers };

        return this.http.get<any>(this.refreshTokenUrl, options)
            .pipe(
                tap((res) => {
                    console.log('New token:', res);
                    localStorage.setItem(
                        'token',
                        res.token
                    );
                    localStorage.setItem(
                        'refreshToken',
                        res.refreshToken
                    );
                    this.cookieService.set('full_name', res.name);
                    this.cookieService.set('avatar', res.avatar);
                    this.cookieService.set('id', res.id);
                    this.cookieService.set('role', res.roles[0].authority);
                }),
                catchError((error) => {
                    console.error('Error refreshing token:', error);
                    return throwError(error);
                })
            );
    }

    /* ============Login QR============= */
    imgQR: any = '';
    checkLoadingdata: boolean = true;
    full_name = this.cookieService.get('full_name');
    $time_qr: any;
    private isOpenQRWeb = new BehaviorSubject<boolean>(false);
    isOpenQRWeb$ = this.isOpenQRWeb.asObservable();
    minutesRemaining: any;
    secondsRemaining: any;

    openQRApi() {
        try {
            return this.http.get(this.loginQRUrl);
        } catch (error) {
            console.error('Error img QR:', error);
            throw error; // Rethrow the error for the calling code to handle
        }
    }
    remainingTime: number = 0;
    interval: any;
    checkReQR: boolean = false;

    openQR() {
        this.checkReQR = false;
        if (!this.checkReQR) {
            this.isOpenQRWeb.next(true);
        }
        try {
            this.remainingTime = 5 * 60;
            this.openQRApi().subscribe((res) => {
                this.imgQR = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + res[0]);
                this.checkLoadingdata = false;
                this.connectToLogin(res[1]);
                this.updateTimer();
                this.interval = setInterval(() => {
                    this.updateTimer();
                }, 1000);
            })
        } catch (error) {
            console.error('Error opening QR:', error);
        }
    }

    connectToLogin(id) {
        this.socket = new SockJS(environment.baseUrl + 'login-qr');
        this.stompClient = Stomp.over(this.socket!);
        this.stompClient.connect({}, (frame) => {
this.stompClient?.subscribe('/topic/login/qr-code/' + id, (res) => {
                let data = JSON.parse(res.body);
                if (data == false) {
                    new toast({
                        title: 'Mã của bạn đã hết hạn!',
                        message: 'Vui lòng tạo lại mã',
                        type: 'warning',
                        duration: 3000,
                    });
                } else {
                    localStorage.setItem(
                        'token',
                        // JSON.parse(JSON.stringify(data.data.token)).token
                        data.data.token
                    );
                    localStorage.setItem(
                        'refreshToken',
                        data.data.refreshToken
                    );
                    this.cookieService.set('full_name', data.data.name);
                    this.cookieService.set('avatar', data.data.avatar);
                    this.cookieService.set('id', data.data.id);
                    this.cookieService.set('role', data.data.roles[0].authority);

                    if (data.data.roles[0].authority == 'ROLE_OWNER' || data.data.roles[0].authority == 'ROLE_ADMIN') {
                        window.location.href = environment.baseUrlFe + 'admin';
                    } else if (data.data.roles[0].authority == 'ROLE_MODERATOR') {
                        window.location.href = environment.baseUrlFe + 'moderator/forbidden-word';
                    } else {
                        window.location.href = environment.baseUrlFe + 'newsfeed';
                    }
                }
                this.stompClient?.disconnect((() => {
                    console.log('Disconnected');
                }));
            });
        });
    }

    updateTimer() {
        this.minutesRemaining = (Math.floor(this.remainingTime / 60) < 10) ? '0' + Math.floor(this.remainingTime / 60) : Math.floor(this.remainingTime / 60);
        this.secondsRemaining = (this.remainingTime % 60 < 10) ? '0' + this.remainingTime % 60 : this.remainingTime % 60;

        if (this.remainingTime == 0) {
            this.checkReQR = true;
            clearInterval(this.interval);
            // this.stompClient?.disconnect((() => {
            //     console.log('Disconnected');
            // }));
        }
        this.remainingTime--;
    }

    closeQR() {
        this.checkLoadingdata = true;
        this.checkReQR = true;
        this.isOpenQRWeb.next(false);
    }

    // Getter
    getUserLog(): any[] {
        return this.userLogined;
    }

    //   Setter
    setUserLog(data: any[]): void {
        this.userLogined = data;
    }


    // Getter
    getUserLogGG(): any[] {
        return this.userLogGG;
    }

    //   Setter
    setUserLogGG(data: any[]): void {
        this.userLogGG = data;
    }
}