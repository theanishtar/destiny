import { Component } from '@angular/core';
import { ModalService } from '@app/user/service/modal.service';
import { PostService } from '@app/user/service/post.service';

@Component({
  selector: 'app-images-message',
  templateUrl: './images-message.component.html',
  styleUrls: ['./images-message.component.css']
})
export class ImagesMessageComponent {
  slideIndex: number = 1;
  slidesLength: string;
  listPosts: any[] = [];
  images: string[]
  constructor(
    public modalService: ModalService,
    public postService: PostService
  ) {
  }

  ngOnInit() {
    this.showSlides(1);
  }

  /* ============template============= */
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

  // Trong component.ts
  goToSlide(index: number) {
    this.slideIndex = index + 1; // Biến currentSlide là biến trong component để theo dõi slide hiện tại
    this.showSlides(this.slideIndex);
  }
}
