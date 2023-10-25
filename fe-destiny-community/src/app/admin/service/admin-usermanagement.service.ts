import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminUsermanagementService {

  private getTOP4UserAPI = environment.baseUrl + 'v1/admin/getTOP4User';

  private listTOP4User: any[] = [];


  constructor(
    private http: HttpClient

  ) { }

  loadTOP4User() {
    return this.http.get<any>(this.getTOP4UserAPI).pipe(
      tap((response) => {
        this.listTOP4User = JSON.parse(JSON.stringify(response));;
        this.setTOP4User(this.listTOP4User);
      }),
    )
  }


  //   Getter
  getTOP4User(): any[] {
    return this.listTOP4User;
  }

  //   Setter
  setTOP4User(data: any[]): void {
    this.listTOP4User = data;
  }





}
