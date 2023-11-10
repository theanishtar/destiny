import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import '../../../assets/toast/main.js';
declare var toast: any;
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment'
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private loadDataTimelineUrl = environment.baseUrl + 'v1/user/profile/data/timeline';
  private loadDataPostTimelineUrl = environment.baseUrl + 'v1/user/profile/post/timeline';
  private loadDataHeaderUrl = environment.baseUrl + 'v1/user/profile/data/header';
  private loadDataEditProfileUrl = environment.baseUrl + 'v1/user/profile/load/data';
  private updateProfileUrl = environment.baseUrl + 'v1/user/profile/update';
  private updatePasswordUrl = environment.baseUrl + 'v1/user/profile/change/password';
  private chanegMailUrl = environment.baseUrl + 'v1/user/profile/change/email';
  private changeTokenUrl = environment.baseUrl + 'v1/user/profile/change/email/confirm';

  private contactUrl = environment.baseUrl + 'v1/user/contact';

  private getAllGenderAPI = environment.baseUrl + 'v1/user/getAllGender';
  private getAllProvinceNameAPI = environment.baseUrl + 'v1/user/getAllProvinceName';
  private getAllDistrictNameAPI = environment.baseUrl + 'v1/user/getAllDistrictName/';
  private getAllWardNameAPI = environment.baseUrl + 'v1/user/getAllWardName/';

  private getCheckPotsApi = environment.baseUrl + 'v1/user/load/checkpost';

  public dataHeader: any[];
  public dataTimeLine: any[];
  public dataTimeLinePost: any[];
  public dataEditProfile: any;

  private genders: any[];
  private provinces: any[];
  private districts: any[];
  private wards: any[];
  private userLogined: any[] = [];
  isLoading = true;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private datePipe: DatePipe, //Định dạng ngày
  ) { 
  }

  /* ============Timeline============= */
  dataFollows: any
  listPostPr: any;
  listUserPr: any[];
  listCountPr: any;
  listHashTag: any;
  dataProfileTimeline: any;
  header: any;
  dateJoin: string | null;
  currentPage: number = 1;
  loadDataTimeline(data: any) {
    localStorage.setItem("idSelected", data);
    return this.http.post<any[]>(this.loadDataTimelineUrl, data).pipe(
      tap((response) => {
        this.dataTimeLine = response;
        this.setdataTimeLine(this.dataTimeLine);
      }),
    );
  }
  public checkData: boolean;
  loadDataProfileTimeline(id) {
    this.setCheckData(false) ;
    let data = {
      toProfile: id,
      page: this.currentPage
    }
    this.loadDataProfileHeader(id);
    this.loadDataTimeline(id).subscribe((response) => {
      if (response != null) {
        this.setdataTimeLine(response);
        this.dataProfileTimeline = this.getdataTimeLine();
        this.dateJoin = this.datePipe.transform(this.dataProfileTimeline.dateJoin, 'dd/MM/yyyy');
      }

    })
    this.loadDataTimelinePost(data).subscribe((res: any) => {
      this.listPostPr = res; // Lưu dữ liệu ban đầu vào mảng
      this.setCheckData(true);
      
    
    });
    // this.router.navigate(['profile']);
    // window.location.href = 'http://localhost:4200/profile';
  }

  loadDataTimelinePost(data: any) {
    return this.http.post<any[]>(this.loadDataPostTimelineUrl, data).pipe(
      tap((response) => {
        this.dataTimeLinePost = response;
        this.setdataTimeLinePost(this.dataTimeLinePost);
      }),
    );
  }


  loadDataHeader(data: any) {
    localStorage.setItem("idSelected", data);
    return this.http.post<any[]>(this.loadDataHeaderUrl, data).pipe(
      tap((response) => {
        this.dataHeader = response;
        this.setdataHeader(this.dataHeader);
      }),
    );
  }

  loadDataProfileHeader(id) {
    this.loadDataHeader(id).subscribe((res) => {
      if (res != null) {
        this.setdataHeader(res);
        this.header = this.getdataHeader();
      }
    })

  }


  /* ============Edit-profile============= */
  loadDataEditProfile() {
    return this.http.get<any>(this.loadDataEditProfileUrl).pipe(
      tap((response) => {
        this.dataEditProfile = response;
        this.setDataEditProfile(this.dataEditProfile);
      }),
    );
  }

  updateProfile(data: any): Observable<any> {
    return this.http.post(this.updateProfileUrl, data).pipe(
      tap((response) => {
        this.userLogined = JSON.parse(JSON.stringify(response));
        this.setDataEditProfile(this.userLogined);
      }),

      catchError((error: HttpErrorResponse) => {
        console.log("error.status 2: " + JSON.stringify(error))
        if (error.status === 200) {
          return [];
        } else if (error.status === 401) {
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Mật khẩu không đúng',
              type: 'error',
              duration: 1500,
            })
          );
        } else {
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

  /* ============Data combobox address============= */
  loadAllGender() {
    return this.http.get<any>(this.getAllGenderAPI).pipe(
      tap((response) => {
        this.genders = JSON.parse(JSON.stringify(response));
        this.setAllGender(this.genders);
      }),
    )
  }

  loadAllProvince() {
    return this.http.get<any>(this.getAllProvinceNameAPI).pipe(
      tap((response) => {
        this.provinces = JSON.parse(JSON.stringify(response));
        this.setAllProvince(this.provinces);
      }),
    )
  }

  loadAllDistrict(province: string) {
    return this.http.get<any>(this.getAllDistrictNameAPI + province).pipe(
      tap((response) => {
        this.districts = JSON.parse(JSON.stringify(response));
        this.setAllDistrict(this.districts);
      }),
    )
  }

  loadAllWard(district: string) {
    return this.http.get<any>(this.getAllWardNameAPI + district).pipe(
      tap((response) => {
        this.wards = JSON.parse(JSON.stringify(response));
        this.setAllWard(this.wards);
      }),
    )
  }


  /* ============Change-password============= */
  private isOpenChangePass = new BehaviorSubject<boolean>(false);
  isOpenChangePass$ = this.isOpenChangePass.asObservable();

  openModalChangePass() {
    this.isOpenChangePass.next(true);
  }

  closeModalChangePass() {
    this.isOpenChangePass.next(false);
  }

  updatePassword(data: any): Observable<any> {
    return this.http.post(this.updatePasswordUrl, data).pipe(
      tap(() => {

      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error.status 2: " + JSON.stringify(error))
        if (error.status === 200) {
          // if (res == "OK") {
          this.closeModalChangePass();
          new toast({
            title: 'Thành công!',
            message: 'Cập nhật thành công!',
            type: 'success',
            duration: 2000,
          });
          // }
          return [];
        } else if (error.status === 300) {
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Mật khẩu cũ không đúng',
              type: 'error',
              duration: 1500,
            })
          );
        } else if (error.status === 301) {
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Mật khẩu mới trùng với mật khẩu cũ',
              type: 'error',
              duration: 1500,
            })
          );
        } else if (error.status === 301) {
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Mật khẩu mới trùng với mật khẩu cũ',
              type: 'error',
              duration: 1500,
            })
          );
        }
        else {
          // Handle other errors
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Mật khẩu trùng với mật khẩu cũ hoặc không hợp lệ!!',
              type: 'warning',
              duration: 3000,
            })
          );
        }
      })
    );
  }

  /* ============Change-email============= */
  private isOpenChangeEmail = new BehaviorSubject<boolean>(false);
  isOpenChangeEmail$ = this.isOpenChangeEmail.asObservable();

  openModalChangeMail() {
    this.isOpenChangeEmail.next(true);
  }

  closeModalChangeMail() {
    this.isOpenChangeEmail.next(false);
  }
  checkSendMail: boolean = false;
  changeMailApi(data: any) {
    return this.http.post<any>(this.chanegMailUrl, data).pipe(
      tap(() => {
        let timerInterval;
        Swal.fire({
          title: 'Thông báo!',
          html: 'Quá trình sẽ diễn ra trong vài giây!',
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            new toast({
              title: 'Thông báo!',
              message: 'Vui lòng kiểm tra Email',
              type: 'success',
              duration: 3000,
            })
          }
        });
        
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error.status 2: " + JSON.stringify(error.status))
        if (error.status === 300) {
          // this.checkSendMail = false;
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Mật khẩu không đúng',
              type: 'error',
              duration: 1500,
            }),
          );
        } else if (error.status === 301) {
          // this.checkSendMail = false;
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'Emai mới trùng với email cũ',
              type: 'error',
              duration: 1500,
            }),
          );
        } else {
          return throwError(
            // this.checkSendMail = false,
            new toast({
              title: 'Server hiện không hoạt động!',
              message: 'Vui lòng quay lại sau, DaviTickets chân thành xin lỗi vì bất tiện này!',
              type: 'warning',
              duration: 1500,
            })
          );
        }
      })
    );
  }

  changeToken(code: string): Observable<any> {
    const url = `${this.changeTokenUrl}?code=${code}`;
    return this.http.post(url, {}).pipe(
      tap(() => {

      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error.status 2: " + error.status)
        if (error.status === 200) {
          // this.router.navigate(['setting']);
          return throwError(
            new toast({
              title: 'Thông báo!',
              message: 'Email đã được thay đổi',
              type: 'success',
              duration: 3000,
            })
          );
        } else if (error.status === 300) {
          return throwError(
            new toast({
              title: 'Thất bại!',
              message: 'dịch vụ dừng, vui lòng thử lại sau',
              type: 'error',
              duration: 1500,
            }),
          );
        } else {
          return throwError(
            new toast({
              title: 'Server hiện không hoạt động!',
              message: 'Vui lòng quay lại sau, DaviTickets chân thành xin lỗi vì bất tiện này!',
              type: 'warning',
              duration: 1500,
            })
          );
        }
      })
    );
  }

  /* ============Contact============= */
  contactApi(data: any): Observable<any> {
    return this.http.post(this.contactUrl, data).pipe(
      tap(() => {

      })
    );
  }

  /* ============Contact============= */
  loadCheckPost(data: any) {
    return this.http.post<any>(this.getCheckPotsApi, data).pipe(
      tap((response) => {
        // if(response == undefined){
         
        // }
        // else{
        //   console.warn("reponse2: " + response);
        // }

      }),
    );
  }

  /* ============Getter - Setter============= */
  getdataTimeLine(): any[] {
    return this.dataTimeLine;
  }
  setdataTimeLine(data: any[]): void {
    this.dataTimeLine = data;
  }
  getdataTimeLinePost(): any[] {
    return this.dataTimeLinePost;
  }
  setdataTimeLinePost(data: any[]): void {
    this.dataTimeLinePost = data;
  }
  getdataHeader(): any[] {
    return this.dataHeader;
  }
  setdataHeader(data: any[]): void {
    this.dataHeader = data;
  }

  getDataEditProfile(): any {
    return this.dataEditProfile;
  }
  setDataEditProfile(data: any): void {
    this.dataEditProfile = data;
  }
  getAllGender(): any[] {
    return this.genders;
  }

  getAllProvince(): any[] {
    return this.provinces;
  }

  getAllDistrict(): any[] {
    return this.districts;
  }

  getAllWard(): any[] {
    return this.wards;
  }

  setAllGender(data: any[]): void {
    this.genders = data;
  }

  setAllProvince(data: any[]): void {
    this.provinces = data;
  }

  setAllDistrict(data: any[]): void {
    this.districts = data;
  }

  setAllWard(data: any[]): void {
    this.wards = data;
  }

  // Getter
  getUserLog(): any[] {
    return this.userLogined;
  }

  //   Setter
  setUserLog(data: any[]): void {
    this.userLogined = data;
  }
  setCheckData(value: boolean) {
    this.checkData = value;
  }

  getCheckData(): Promise<boolean> {
    // Trả về một Promise
    return new Promise<boolean>((resolve) => {
      // Thực hiện logic của bạn ở đây và sau khi hoàn thành, gọi resolve với giá trị kết quả
      setTimeout(() => {
        resolve(true); // Thay true bằng giá trị bạn muốn trả về
      }, 5500); // Ví dụ: đợi 2 giây trước khi trả kết quả
    });
  }
  

}
