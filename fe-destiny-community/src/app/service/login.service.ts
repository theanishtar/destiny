import { Injectable } from '@angular/core';
//Xử lí bất đồng bộ
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import '../../assets/toast/main.js';
declare var toast: any;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
		private http: HttpClient,
		private cookieService: CookieService,
		private router: Router,
		private route: ActivatedRoute,
		private httpClient: HttpClient
	) { }
}
