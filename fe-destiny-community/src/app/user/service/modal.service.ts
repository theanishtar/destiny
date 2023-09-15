import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();

  openModal() {
    this.isOpen.next(true);
  }

  closeModal() {
    this.isOpen.next(false);
  }
  
  constructor() { }
}
