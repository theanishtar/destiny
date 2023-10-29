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
  addComment(){
    this.$contentCommnet = $('#comment-input');
    this.idPost = this.modalService.idPostCmt;
    this.idUser = this.modalService.idUser;
    if (this.$contentCommnet.val() != null) {
      this.modalService.sendNotify(this.$contentCommnet.val(),this.idPost,this.idUser, 'COMMENT');
    }
    this.comment_input = '';

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

  closeModalComment() {
    this.modalService.closeModalComment();
  }

  
  checkTagCmt(event: KeyboardEvent) {
    // Ví dụ sử dụng với một trường nhập liệu có id là "messageInput"
    const messageInput = document.getElementById("comment-input") as HTMLInputElement;
    const dropdown = document.getElementById("dropdown") as HTMLUListElement;

    messageInput.addEventListener("input", (event: Event) => {
      const inputValue = messageInput.value;

      if (inputValue.includes("@")) {
        // Nếu có "@" trong giá trị nhập vào
        // Hiển thị dropdown menu
        dropdown.classList.remove("hidden");
      } else {
        // Ngược lại, ẩn dropdown menu
        dropdown.classList.add("hidden");
      }
    });

  }
}




