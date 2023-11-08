import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenService {
  private loadDataBadWord = environment.baseUrl + 'v1/moderator/badwords';

  private listBadWord: any[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  // loadDataBadWordApi() {
  //   return this.http.get<any>(this.loadDataBadWord).pipe(
  //     tap((response) => {
  //       this.listBadWord = JSON.parse(JSON.stringify(response));
  //       this.setDataBadWord(this.listBadWord);
  //       console.log("this.listBadWord: " + this.listBadWord)
  //     })
  //   );
  // }

  async loadDataBadWordApi(): Promise<any[]> {
    try {
      const response = await this.http.get<any>(this.loadDataBadWord).toPromise();
      this.listBadWord = JSON.parse(JSON.stringify(response));
      this.setDataBadWord(this.listBadWord);
      // console.log("this.listBadWord: " + this.listBadWord)
      return this.listBadWord;
    } catch (error) {
      throw error;
    }
  }

  /* ============Getter - Setter============= */
  getDataBadWord(): any[] {
    return this.listBadWord;
  }
  setDataBadWord(data: any[]): void {
    this.listBadWord = data;
  }
}
