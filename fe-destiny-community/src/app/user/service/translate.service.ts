import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalService } from '@app/local.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  // lang = vi, en
  public urlTrans(
    text: string,
    inputLanguage: string,
    outputLanguage: string
  ): string {
    const textEncode = encodeURI(text);
    return `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${textEncode}`;
  }

  constructor(private http: HttpClient, private localService: LocalService) {}

  // translateText(text: string): Observable<any> {
  //   console.log("Origin: "+text)
  //   const curentLang = this.localService.getData('lang') || 'vi'; // en || vi
  //   const targetLang = curentLang === 'vi' ? 'vi ' : 'en';
  //   console.log(this.http.get(this.urlTrans(text, curentLang, targetLang)))
  //   return this.http.get(this.urlTrans(text, curentLang, targetLang));
  // }

  translateApi(text: string, inputLanguage: string, outputLanguage: string): Observable<any> {
    return this.http.get("/translate/translate_a/single?client=gtx&sl=vi&tl=vi &dt=t&q=b%C3%A1n%20m%C3%A8o");
  }
}

/*

REQ: https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=en&dt=t&q=ch%C3%A0o

REQ:
const res = await fetch("https://libretranslate.com/translate", {
	method: "POST",
	body: JSON.stringify({
		q: "chào",
		source: "auto",
		target: "en",
		format: "text",
		api_key: ""
	}),
	headers: { "Content-Type": "application/json" }
});

console.log(await res.json());

RES:
{
    "detectedLanguage": {
        "confidence": 90,
        "language": "vi"
    },
    "translatedText": "hello"
}
*/
