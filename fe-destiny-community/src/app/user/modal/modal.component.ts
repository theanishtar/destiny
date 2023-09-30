import { Component, OnInit } from '@angular/core';

import { ModalService } from '../service/modal.service';
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
  
  constructor(
    public modalService: ModalService,
  ) { }

  ngOnInit() {
    this.showSlides(1);
  }
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
