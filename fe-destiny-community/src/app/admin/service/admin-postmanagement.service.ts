import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminPostmanagementService {

  private getTOP4PostAPI = environment.baseUrl + 'v1/admin/getTOP4Post';
  private getTOP3ProductAPI = environment.baseUrl + 'v1/admin/getTOP3Product';


  private listTOP4Post: any[] = [];
  private listTOP3Product: any[] = [];

  constructor(
    private http: HttpClient

  ) { }

  loadTOP4Post() {
    return this.http.get<any>(this.getTOP4PostAPI).pipe(
      tap((response) => {
        this.listTOP4Post = JSON.parse(JSON.stringify(response));;
        this.setTOP4Post(this.listTOP4Post);
      }),
    )
  }

  loadTOP3Product() {
    return this.http.get<any>(this.getTOP3ProductAPI).pipe(
      tap((response) => {
        this.listTOP3Product = JSON.parse(JSON.stringify(response));;
        this.setTOP3Product(this.listTOP3Product);
      }),
    )
  }

  //   Getter
  getTOP4Post(): any[] {
    return this.listTOP4Post;
  }

  getTOP3Product(): any[] {
    return this.listTOP3Product;
  }

  //   Setter
  setTOP4Post(data: any[]): void {
    this.listTOP4Post = data;
  }

  setTOP3Product(data: any[]): void {
    this.listTOP3Product = data;
  }

}
