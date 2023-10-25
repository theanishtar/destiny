import { Component, OnInit } from '@angular/core';

import { ModalService } from '../service/modal.service';
import { PostService } from '../service/post.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [
    './modal.component.css',
    `./modal-comment.css`,
  ]
})
export class ModalComponent implements OnInit {
  slideIndex: number = 1;
  slidesLength: string;
  listTop5User: any[] = [];

  constructor(
    public modalService: ModalService,
    public postService: PostService
  ) { }

  ngOnInit() {
    this.showSlides(1);
    this.loadDataTop5User();
  }

  listCupUser = [
    "../../../assets/images/posts/book.png",
    "../../../assets/images/posts/chair.png",
    "../../../assets/images/posts/converse.png",
  ];
  
  loadDataTop5User() {
    this.postService.loadTop5User().subscribe(() => {
      this.listTop5User = this.postService.getDataTop5User();
    });
  }

  /* ============template============= */
  opentReplies() {
    const showContainers = document.querySelectorAll(".show-replies");
    showContainers.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const parentContainer = target.closest(".comment__container")!;
        let _id = parentContainer.id;
        if (_id) {
          let childrenContainer = parentContainer.querySelectorAll(
            `[dataset=${_id}]`
          );
          childrenContainer.forEach((child) => child.classList.toggle("opened"));
        }
      })
    );
  }
  // Next/previous controls
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

  openModalCreatePost() {
    this.modalService.openModalCreatePost();
  }
  closeModalCreatePost() {
    this.modalService.closeModalCreatePost();
  }
  openModalComment() {
    this.modalService.openModalComment();
  }
  closeModalComment() {
    this.modalService.closeModalComment();
  }
}
