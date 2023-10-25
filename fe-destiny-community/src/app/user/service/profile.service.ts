import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import '../../../assets/toast/main.js';
declare var toast: any;
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment'
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private loadDataHeaderUrl = environment.baseUrl + 'v1/user/profile/data/timeline';
  private loadDataEditProfileUrl = environment.baseUrl + 'v1/user/profile/load/data';
  private updateProfileUrl = environment.baseUrl + 'v1/user/profile/update';

  private getAllGenderAPI = environment.baseUrl + 'v1/user/getAllGender';
  private getAllProvinceNameAPI = environment.baseUrl + 'v1/user/getAllProvinceName';
  private getAllDistrictNameAPI = environment.baseUrl + 'v1/user/getAllDistrictName/';
  private getAllWardNameAPI = environment.baseUrl + 'v1/user/getAllWardName/';

  public dataHeader: any[];
  public dataEditProfile: any;

  private genders: any[];
  private provinces: any[];
  private districts: any[];
  private wards: any[];
  private userLogined: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private datePipe: DatePipe, //Định dạng ngày
  ) { }

  /* ============Timeline============= */
  dataFollows: any
  listPostPr: any;
  listUserPr: any[];
  listCountPr: any;
  dataProfileTimeline: any;
  dateJoin: string | null
  loadDataHeader(data: any) {
    localStorage.setItem("idSelected", data);
    return this.http.post<any[]>(this.loadDataHeaderUrl, data).pipe(
      tap((response) => {
        this.dataHeader = response;
        this.setDataHeader(this.dataHeader);
      }),
    );
  }

  loadDataProfileTimeline(id) {
    this.loadDataHeader(id).subscribe((res) => {
      if (res != null) {
        this.setDataHeader(res);
        this.dataProfileTimeline = this.getDataHeader();
        this.dataFollows = this.dataProfileTimeline.dataFollows;
        this.listPostPr = this.dataProfileTimeline.post;
        this.listUserPr = this.dataProfileTimeline.user;
        this.listCountPr = this.dataProfileTimeline.count;
        this.dateJoin = this.datePipe.transform(this.dataProfileTimeline.dateJoin, 'dd/MM/yyyy');
        // this.router.navigate(['/profile']);
      }
    })
  }

  // loadDataTimeline(id) {
  //   this.loadDataHeader(id).subscribe((res) => {
  //     if (res != null) {
  //       this.setDataHeader(res);
  //       this.dataProfileTimeline = this.getDataHeader();
  //       this.dataFollows = this.dataProfileTimeline.dataFollows;
  //       console.warn("this.dataFollows1: " + JSON.stringify(this.dataFollows))
  //       this.listPostPr = this.dataProfileTimeline.post;
  //       this.listUserPr = this.dataProfileTimeline.user;
  //       this.listCountPr = this.dataProfileTimeline.count;
  //       this.dateJoin = this.datePipe.transform(this.dataProfileTimeline.dateJoin, 'dd/MM/yyyy');
  //     }
  //   })
  // }

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
  // async loadAllDistrict(province: string): Promise<any[]> {
  //   try {
  //     const response = await this.http.get<any>(this.getAllDistrictNameAPI + province).toPromise();
  //     this.districts = JSON.parse(JSON.stringify(response));
  //     this.setAllDistrict(this.districts);
  //     return this.districts;
  //   } catch (error) {
  //     // Xử lý lỗi ở đây nếu có
  //     throw error;
  //   }
  // }

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

  /* ============Change-email============= */
  private isOpenChangeEmail = new BehaviorSubject<boolean>(false);
  isOpenChangeEmail$ = this.isOpenChangeEmail.asObservable();

  openModalChangeMail() {
    this.isOpenChangeEmail.next(true);
  }

  closeModalChangeMail() {
    this.isOpenChangeEmail.next(false);
  }

  /* ============Getter - Setter============= */
  getDataHeader(): any[] {
    return this.dataHeader;
  }
  setDataHeader(data: any[]): void {
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

}
