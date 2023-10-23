import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { liquid } from "../../../assets/js/utils/liquidify.js";
// import { tns } from '../../../assets/js/vendor/ti';
import { avatarHexagons } from '../../../assets/js/global/global.hexagons.js';
import { tooltips } from '../../../assets/js/global/global.tooltips.js';
import { popups } from '../../../assets/js/global/global.popups.js';
import { headers } from '../../../assets/js/header/header.js';
import { sidebars } from '../../../assets/js/sidebar/sidebar.js';
import { content } from '../../../assets/js/content/content.js';
import { form } from '../../../assets/js/form/form.utils.js';
import 'src/assets/js/utils/svg-loader.js';
import { DatePipe } from '@angular/common';
declare var toast: any;
// 
import { ModalService } from '../service/modal.service';
import { InteractPostsService } from '../service/interact-posts.service';
import { ProfileService } from '../service/profile.service';
import { FollowsService } from '../service/follows.service';

@Component({
  selector: 'app-profile-timeline',
  templateUrl: './profile-timeline.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/vendor/simplebar.css`,
    `../../css/vendor/tiny-slider.css`,
    './profile-timeline.component.css'
  ]
})
export class ProfileTimelineComponent implements OnInit {
  postId = '123'; // Mã số của bài viết (có thể là mã số duy nhất của mỗi bài viết)
  dataProfileTimeline: any;
  listSuggested: any[] = [];
  checkData1: boolean = false;
  check: boolean = true
  dateJoin: string | null
  isLoading = true;
  idLocal: any;
  ngOnInit() {
    // this.loadDataHeader(0);
    
    this.checkSrcoll();
    liquid.liquid();
    avatarHexagons.avatarHexagons();
    tooltips.tooltips();
    popups.popup();
    popups.picturePopup();
    headers.headers();
    sidebars.sidebars();
    content.contentTab();
    form.formInput();
   
  }
  dataFollows: any
  listPostPr: any;
  listUserPr: any[];
  listCountPr: any;
  constructor(
    public modalService: ModalService,
    public interactPostsService: InteractPostsService,
    private profileService: ProfileService,
    private datePipe: DatePipe, //Định dạng ngày
    public followsService: FollowsService,
  ) {
    // this.idLocal = localStorage.getItem("idSelected")
    this.idLocal = parseInt((localStorage.getItem("idSelected") + '')?.trim());
    this.profileService.loadDataTimeline(this.idLocal);
    
      this.dataProfileTimeline = this.profileService.getDataHeader();
      this.dataFollows = this.profileService.dataFollows;
      this.listPostPr = this.profileService.listPostPr;
      this.listUserPr = this.profileService.listUserPr;
      this.listCountPr = this.profileService.listCountPr;
      this.dateJoin = this.profileService.dateJoin;
      // this.isLoading = false
    // })
   
    this.listSuggested = this.followsService.getDataSuggested();
  }

  addFollow(id: number) {
    this.followsService.addFollow(id).subscribe((res) => {
      // this.loadDataSuggest();
      new toast({
        title: 'Thông báo!',
        message: 'Đã theo dõi',
        type: 'success',
        duration: 3000,
      })
      // location.reload();
    });
  }

/* ============template============= */
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


  @ViewChild('elementToScroll', { static: false }) elementToScroll: ElementRef;

  scrollToTop() {
    console.log(this.elementToScroll); // In ra để kiểm tra ElementRef
    if (this.elementToScroll && this.elementToScroll.nativeElement) {
      this.elementToScroll.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  checkSrcoll() {
    const scrollableDiv = document.getElementById('scrollableDiv')!;
    const scrollButton = document.getElementById('scrollButton')!;

    // Thêm sự kiện lắng nghe lướt cho thẻ div
    scrollableDiv.addEventListener('scroll', () => {
      // Kiểm tra vị trí cuộn
      if (scrollableDiv.scrollTop > 100) {
        // Hiển thị nút scroll khi cuộn đến vị trí cụ thể (ở đây là 100)
        scrollButton.style.display = 'block';
      } else {
        // Ẩn nút scroll nếu không đủ cuộn
        scrollButton.style.display = 'none';
      }
    });
  }

  toggleLike() {
    this.interactPostsService.toggleLike(this.postId);
  }

  isLiked(postId: string) {
    return this.interactPostsService.isLiked(postId);
  }

  openModalComment(idPost) {
    this.modalService.openModalComment(49);
  }
  closeModalComment() {
    this.modalService.closeModalComment();
  }
}
