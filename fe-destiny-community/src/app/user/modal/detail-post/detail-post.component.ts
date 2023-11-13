import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal

import { ModalService } from '@app/user/service/modal.service';
import { HistoryService } from '@app/user/service/history.service';
@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: [
    `../css/modal.css`,
    `../../../css/vendor/bootstrap.min.css`,
    `../../../css/styles.min.css`,
    './detail-post.component.css']
})
export class DetailPostComponent {
  slideIndex: number = 1;
  slidesLength: string;
 

  constructor(
    public modalService: ModalService,
    public historyService: HistoryService
  ) { }

  ngOnInit() {
    this.showSlides(1);
  }

 

  $contentCommnet: any;
  idPost: any
  idUser: any
  comment_input: string = '';
  // addComment(){
  //   this.$contentCommnet = $('#comment-input');
  //   this.idPost = this.modalService.idPostCmt;
  //   this.idUser = this.modalService.idUser;
  //   if (this.$contentCommnet.val() != null) {
  //     console.log("this.$contentCommnet.val(): " + this.$contentCommnet.val());
  //     console.log("this.idPost: " + this.idPost);
  //     console.log("this.idUser: " + this.idUser);
  //     this.modalService.sendNotify(this.$contentCommnet.val(), 'COMMENT');
  //   }
  //   this.comment_input = '';

  // }
  addComment(){
    this.$contentCommnet = $('#comment-input');
    this.idPost = this.modalService.idPostCmt;
    this.idUser = this.modalService.idUser;
    if (this.$contentCommnet.val() != null) {
      let type = (this.modalService.repCmtId>0)?'REPCOMMENT':'COMMENT';
      this.modalService.sendNotify(this.$contentCommnet.val(), this.idPost, this.idUser, type,this.modalService.repCmtId);
    }
    this.comment_input = '';

  }

  reply(idCmt: any, name: string) {
    this.comment_input = `${name}`;
    this.modalService.repCmtId=idCmt;
    const input = document.getElementById("comment-input");
    // console.log("this.repCmtId: " + this.repCmtId);
    if (input) {
      input.focus();
    }
  }
  showDropdown: boolean = false;
  onInput(event: any) {
    // Kiểm tra nếu nội dung của trường input trống, đặt repCmtId thành 0
    if (this.comment_input === '') {
      this.modalService.repCmtId = 0;
      // console.log("this.repCmtId: " + this.repCmtId);
    }
    // Kiểm tra nếu nội dung trường input chứa ký tự "@", hiển thị dropdown
    if (this.comment_input.includes('@')) {
      this.showDropdown = true;
    } else {
      this.showDropdown = false;
    }
  }
  /* ============template============= */
  removeSeeMoreCmt(idCmt) {
    document.querySelectorAll(".rep-"+ idCmt).forEach((e) => {
      e.remove();
    });
    this.modalService.checkHideSeeMore.set(idCmt,true);
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  showSlides(n: number) {
    let i: number;
    let slides: HTMLCollectionOf<Element> = document.getElementsByClassName("mySlides");
    const numberText = document.getElementById("numbertext")!;

    this.slidesLength = slides.length.toString();
    // Kiểm tra nếu slideIndex vượt quá giới hạn
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }

    // Ẩn tất cả các slides
    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = "none";
    }
    // Kiểm tra slideIndex có hợp lệ trước khi hiển thị slide và dot tương ứng
    if (this.slideIndex >= 1 && this.slideIndex <= slides.length) {
      (slides[this.slideIndex - 1] as HTMLElement).style.display = "block";
      numberText.textContent = this.slideIndex.toString();
    }
  }

  translate() {
    document.addEventListener('DOMContentLoaded', function () {
      const translateButton = document.querySelector(
        '.translate-button'
      ) as HTMLButtonElement;
      const backButton = document.querySelector(
        '.back-button'
      ) as HTMLButtonElement;
      const originalContent = document.querySelector(
        '.original-content'
      ) as HTMLElement;
      const translatedContent = document.querySelector(
        '.translated-content'
      ) as HTMLElement;

      translateButton.addEventListener('click', function () {
        originalContent.style.display = 'none';
        translatedContent.classList.add('active');
      });

      backButton.addEventListener('click', function () {
        originalContent.style.display = 'block';
        translatedContent.classList.remove('active');
      });
    });
  }
  closeModalComment() {
    this.modalService.closeModalComment();
  }
}
