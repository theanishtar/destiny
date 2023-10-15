import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {

  private getAdminAvartarAPI = environment.baseUrl + 'v1/admin/checkAdminLog';
  private getAdminProfileAPI = environment.baseUrl + 'v1/admin/profile';
  private getAllGenDerAPI = environment.baseUrl + 'v1/admin/getAllGender';
  private getAllProvinceNameAPI = environment.baseUrl + 'v1/admin/getAllProvinceName';
  private getAllDistrictNameAPI = environment.baseUrl + 'v1/admin/getAllDistrictName/';
  private getAllWardNameAPI = environment.baseUrl + 'v1/admin/getAllWardName/';

  private updateProfileAPI = environment.baseUrl + 'v1/admin/updateProfile';
  private checkPasswordAPI = environment.baseUrl + 'v1/admin/checkPassword';
  private changePasswordAPI = environment.baseUrl + 'v1/admin/changePassword';

  private admin: any;
  private api: string;
  private genders: any[];
  private provinces: any[];
  private districts: any[];
  private wards: any[];
  private resultCheckPassword: number;

  constructor(
    private http: HttpClient,

  ) { }

  loadAdminData(action: string) {
    if(action.match("getAvartar")){
      this.api = this.getAdminAvartarAPI;
    }else{
      this.api = this.getAdminProfileAPI;
    }

    return this.http.get<any>(this.api).pipe(
      tap((response) => {
        this.admin = JSON.parse(JSON.stringify(response));
        this.setAdmin(this.admin);
      }),
    )
  }

  loadAllGender(){
    return this.http.get<any>(this.getAllGenDerAPI).pipe(
      tap((response) => {
        this.genders = JSON.parse(JSON.stringify(response));
        this.setAllGender(this.genders);
      }),
    )
  }

  loadAllProvince(){
    return this.http.get<any>(this.getAllProvinceNameAPI).pipe(
      tap((response) => {
        this.provinces = JSON.parse(JSON.stringify(response));
        this.setAllProvince(this.provinces);
      }),
    )
  }

  loadAllDistrict(province: string){
    return this.http.get<any>(this.getAllDistrictNameAPI + province).pipe(
      tap((response) => {
        this.districts = JSON.parse(JSON.stringify(response));
        this.setAllDistrict(this.districts);
      }),
    )
  }

  loadAllWard(district: string){
    return this.http.get<any>(this.getAllWardNameAPI + district).pipe(
      tap((response) => {
        this.wards = JSON.parse(JSON.stringify(response));
        this.setAllWard(this.wards);
      }),
    )
  }

  updateProfile(data: any): Observable<any> {
    return this.http.post(this.updateProfileAPI, data).pipe(

        catchError(error => of([]))
    );
  }

  checkPassword(data: any): Observable<any> {
    return this.http.post<number>(this.checkPasswordAPI, data).pipe(
      tap((response) =>{
        this.resultCheckPassword = response;
        this.setResultCheckPassword(this.resultCheckPassword);
      })
    );
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(this.changePasswordAPI, data);
  }

  //getter
  getAdmin(): any {
    return this.admin;
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

  getResultCheckPassword(): number {
    return this.resultCheckPassword;
  }

  //   Setter
  setAdmin(data: any): void {
    this.admin = data;
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

  setResultCheckPassword(data: number): void {
    this.resultCheckPassword = data;
  }

}
