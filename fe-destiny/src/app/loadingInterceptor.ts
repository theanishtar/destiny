import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from './user/service/loading.service'; // Tạo một service để quản lý trạng thái loading
import { finalize } from 'rxjs/operators';
@Injectable()
export class loadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Hiển thị biểu tượng loading trước khi gửi yêu cầu
    this.loadingService.showLoading();

    return next.handle(request).pipe(
      // Ẩn biểu tượng loading sau khi nhận được dữ liệu
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }
}
