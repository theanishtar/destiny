import { Component } from '@angular/core';

import { ModalService } from '@app/user/service/modal.service';
import { PostService } from '@app/user/service/post.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: [
    `../css/modal.css`,
    './comment.component.css'
  ]
})
export class CommentComponent {
  slideIndex: number = 1;
  slidesLength: string;

  constructor(
    public modalService: ModalService,
    public postService: PostService,
  ) { }

  ngOnInit() {
    this.showSlides(1);
  }

  /* ============Add comment============= */
  $contentCommnet: any;
  idPost: any
  idUser: any
  comment_input: string = '';
  addComment() {
    this.$contentCommnet = $('#comment-input');
    this.idPost = this.modalService.idPostCmt;
    this.idUser = this.modalService.idUser;
    if (this.$contentCommnet.val() != null) {
      let type = (this.modalService.repCmtId>0)?'REPCOMMENT':'COMMENT';
      this.modalService.sendNotify(this.$contentCommnet.val(), this.idPost, this.idUser, type,this.modalService.repCmtId);
    }
    this.comment_input = '';
  }


  /* ============template============= */
  removeSeeMoreCmt(idCmt) {
    document.querySelectorAll(".rep-" + idCmt).forEach((e) => {
      e.remove();
    });
    this.modalService.checkHideSeeMore.set(idCmt, true);
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

  closeModalComment() {
    this.modalService.closeModalComment();
    this.modalService.repCmtId = 0;
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
}




