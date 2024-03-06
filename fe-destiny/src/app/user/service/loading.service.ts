import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading = false;

  showLoading() {
    this.loading = true;
  }

  hideLoading() {
    this.loading = false;
  }

  isLoading(): boolean {
    return this.loading;
  }
  constructor() { }
}
