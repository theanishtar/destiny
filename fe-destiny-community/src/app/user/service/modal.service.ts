import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();

  private isOpen1 = new BehaviorSubject<boolean>(false);
  isOpen1$ = this.isOpen1.asObservable();

  openModal() {
    this.isOpen.next(true);
  }

  closeModal() {
    this.isOpen.next(false);
  }
  openModal1() {
    this.isOpen1.next(true);
  }

  closeModal1() {
    this.isOpen1.next(false);
  }
  
  constructor() { }
}
