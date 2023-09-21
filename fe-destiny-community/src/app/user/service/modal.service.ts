import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isOpenCreatePost = new BehaviorSubject<boolean>(false);
  isOpenCreatePost$ = this.isOpenCreatePost.asObservable();

  private isOpenComment = new BehaviorSubject<boolean>(false);
  isOpenComment$ = this.isOpenComment.asObservable();

  openModalCreatePost() {
    this.isOpenCreatePost.next(true);
  }

  closeModalCreatePost() {
    this.isOpenCreatePost.next(false);
  }
  openModalComment() {
    this.isOpenComment.next(true);
  }

  closeModalComment() {
    this.isOpenComment.next(false);
  }
  
  constructor() { }
}
