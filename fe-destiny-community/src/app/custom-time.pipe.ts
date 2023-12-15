import { Pipe, PipeTransform } from '@angular/core';
import { MessageService } from './user/service/message.service';

import { catchError, map } from 'rxjs/operators';  // Add this import statement
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalService } from '@app/local.service';
import { TranslateService } from './user/service/translate.service';
import { call } from '../assets/js/video-call/script.js';
import { Callbacks } from 'jquery';

@Pipe({
  name: 'customDateTime',
})
export class CustomTimePipe implements PipeTransform {
  $chatHistory: any;
  checkedUsers: any[];
  checkedUsersRep: any[];
  checkUserCalled: boolean = false;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private localService: LocalService,
    private translateService: TranslateService
  ) { }



  private extractTranslation(response: any): string | null {
    console.log(response)
    // Assuming the structure of the response remains consistent
    if (response && response[0] && response[0][0] && response[0][0][0]) {
      console.log(response[0][0][0])
      return response[0][0][0];
    } else {
      return null;
    }
  }

  transform(value: string, type?: 'date' | 'time' | 'translate'): string | any[] {
    if (type === 'date') {
      return this.checkDate(value);
    } else if (type === 'time') {
      return this.getCustomTime(value);
    } else if (type === 'translate') {
      return this.translateText(value);
    }else {
      // return this.getCheckedUsers(value);
      return '';
    }
  }

  getURL(text: string):string{
    const currentLang = this.localService.getData('lang') || 'vi'; // en || vi
      const targetLang = currentLang === 'vi' ? 'vi ' : 'en';
  
      const url = this.translateService.urlTrans(text, currentLang, targetLang);
      return url;
  }

  translateText(text: string): any {
    console.log("Origin: " + text);
  
    const currentLang = this.localService.getData('lang') || 'vi'; // en || vi
      const targetLang = currentLang === 'vi' ? 'vi ' : 'en';
  
      const url = this.translateService.urlTrans(text, currentLang, targetLang);
  
      let r = call.translate(url, function (response) {
        const jsonArray = JSON.parse(response);
        const sellCats = jsonArray[0][0][0];
  
        console.log(sellCats); // Output: sell cats
        return (sellCats);
      });
      return r;
  }

  translatePost(text: string): Promise<any> {
    // console.log("Origin: " + text);

    const currentLang = this.localService.getData('lang') || 'vi'; // en || vi
    const targetLang = currentLang === 'vi' ? 'en' : 'vi';

    const url = this.translateService.urlTrans(text, currentLang, targetLang);
    // console.log("DICH@: "+url);
    return new Promise((resolve, reject) => {
        call.translate(url, function (response) {
            try {
                const jsonArray = JSON.parse(response);
                const sellCats = jsonArray[0][0][0];

                console.log("DICH@: "+sellCats); // Output: sell cats
                resolve(sellCats);
            } catch (error) {
                reject(error);
            }
        });
    });
}

  public checkDate(date: string): string {
    if (date == '' || date == null) return '';
    let date1 = new Date(date.substring(0, 10));

    let d = new Date();
    let day = d.getDate(); // Lấy ngày trong tháng (1-31)
    let month = d.getMonth() + 1; // Lấy tháng (0-11), nên cộng thêm 1
    let year = d.getFullYear();
    let date2 = new Date(year + '-' + month + '-' + day);
    let dateTime = new Date(date);
    let hour =
      dateTime.getHours() < 10
        ? '0' + dateTime.getHours().toString()
        : dateTime.getHours().toString();
    let munite =
      dateTime.getMinutes() < 10
        ? '0' + dateTime.getMinutes().toString()
        : dateTime.getMinutes().toString();
    let time = hour + ':' + munite;
    if (
      date1 < date2 &&
      (month >= date1.getMonth() + 1 || year >= date1.getFullYear()) &&
      date2.getDate() - 1 === date1.getDate()
    ) {
      return time + ' Hôm qua';
    } else if (
      date1 < date2 &&
      (date2.getDate() - 1 > date1.getDate() ||
        month > date1.getMonth() + 1 ||
        year > date1.getFullYear())
    ) {
      let year =
        date1.getFullYear() < date2.getFullYear()
          ? '-' + date1.getFullYear()
          : '';
      let month =
        date1.getMonth() + 1 < 10
          ? '0' + (date1.getMonth() + 1)
          : '' + (date1.getMonth() + 1);
      let day =
        date1.getDate() < 10 ? '0' + date1.getDate() : '' + date1.getDate();
      return time + ' ' + day + '-' + month + year;
    } else {
      return time + ' Hôm nay';
    }
  }

  public getCustomTime(time: string): string {
    if (
      this.messageService.checkScroll ===
      this.messageService.listMessages.length
    ) {
      this.$chatHistory = $('.chat-widget-conversation')!;
      this.$chatHistory.scrollTop(this.$chatHistory[0]!.scrollHeight);
    }
    let date = new Date(time);
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let newTime = hours + ':' + minutes;
    this.messageService.checkScroll++;
    return newTime;
  }
}
