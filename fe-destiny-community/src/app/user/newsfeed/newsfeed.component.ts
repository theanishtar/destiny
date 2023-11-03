import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { liquid } from '../../../assets/js/utils/liquidify.js';
// import { tns } from '../../../assets/js/vendor/ti';
import { avatarHexagons } from '../../../assets/js/global/global.hexagons.js';
import { tooltips } from '../../../assets/js/global/global.tooltips.js';
import { popups } from '../../../assets/js/global/global.popups.js';
import { headers } from '../../../assets/js/header/header.js';
import { sidebars } from '../../../assets/js/sidebar/sidebar.js';
import { content } from '../../../assets/js/content/content.js';
import { form } from '../../../assets/js/form/form.utils.js';
import 'src/assets/js/utils/svg-loader.js';

//
import { ModalService } from '../service/modal.service';
import { InteractPostsService } from '../service/interact-posts.service';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginService } from '@app/service/login.service';
import { FollowsService } from '../service/follows.service';
import { LoadingService } from '../service/loading.service';
import { PostService } from '../service/post.service';
import { MessageService } from '@app/user/service/message.service';
import { ProfileService } from '../service/profile.service';
import { DatePipe } from '@angular/common';
import '../../../assets/toast/main.js';
import { forEach } from 'angular';
declare var toast: any;
@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/vendor/simplebar.css`,
    `../../css/vendor/tiny-slider.css`,
    './newsfeed.component.css',
  ],
})
export class NewsfeedComponent implements OnInit {
  userDisplayName = '';
  currentUserId = this.cookieService.get("id");
  postId: string; // Mã số của bài viết (có thể là mã số duy nhất của mỗi bài viết)
  listSuggested: any[] = [];
  listTop5User: any[] = [];
  listTop5Post: any[] = [];
  listPosts: any;
  listPost: any;
  listUser: any[];
  listCount: any;
  isLoading = true;
  isFollowing: boolean = false;
  checkData1: boolean = false;
  checkData2: boolean = false;
  checkData3: boolean = false;
  checkData4: boolean = false;
  datePost: string | null
  mapIntersted = new Map<number, boolean>();
  checkRequest: boolean = true;
  check: boolean = true
  checkCountPosts: boolean = true;

  ngOnInit() {
    this.userDisplayName = this.cookieService.get('full_name');
    this.loadPosts();
    this.loadData();
    this.checkScroll();
    this.translate();
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

  constructor(
    public modalService: ModalService,
    public interactPostsService: InteractPostsService,
    private cookieService: CookieService,
    private loginService: LoginService,
    private router: Router,
    public followsService: FollowsService,
    public loadingService: LoadingService,
    public postService: PostService,
    public messageService: MessageService,
    private datePipe: DatePipe, //Định dạng ngày,
    public profileService: ProfileService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }

  /* ============Suggested============= */
  async loadDataSuggest() {
    if (!Array.isArray(this.listSuggested) || this.listSuggested.length === 0) {
      // Gọi API chỉ khi dữ liệu chưa tồn tại.
      await new Promise<void>((resolve) => {
        this.followsService.loadDataSuggest().subscribe(() => {
          this.listSuggested = this.followsService.getDataSuggested();
          this.check = false;
          resolve();
        });
      });
    } else {
      // Sử dụng dữ liệu đã lưu trữ.
      this.listSuggested = this.followsService.getDataSuggested();
      this.check = false;
      if (Array.isArray(this.listSuggested) && this.listSuggested.length === 0) {
        this.checkData1 = true;
        this.check = false;
      }
    }
  }

  addFollow(id: number) {
    this.modalService.sendNotify(' ', 0, id, 'FOLLOW', 0);
    this.loadDataSuggest();
    new toast({
      title: 'Thông báo!',
      message: 'Đã theo dõi',
      type: 'success',
      duration: 3000,
    });
  }
  /* ============Top 5============= */
  listCupPost = [
    "https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Credits-Tycoon.png",
    "https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Platinum-User.png",
    "https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Platinum-User.png",
    "https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Silver-User.png",
    "https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Bronze-User.png",
  ];

  listCupUser = [
    "https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Ruler-of-Masses.png",
    "https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Ruler-of-Masses.png",
    "https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Platinum-Cup.png",
    "https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Gold-Cup.png",
    "https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Bronze-Cup.png",
  ];

  /* ============Post============= */
  currentPage: number = 1;
  async loadPosts() {
    try {
      this.listTop5User = await this.postService.loadTop5User();
      this.listTop5Post = await this.postService.loadTop5Post();
      await this.loadDataSuggest();
      this.postService.loadPostNewsFeed(this.currentPage).subscribe((data: any) => {
        this.listPosts = data; // Lưu dữ liệu ban đầu vào mảng
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  /* ============Interested============= */

  checkInterested(post_id: number, interested: any[]): boolean {
    this.mapIntersted.set(post_id, false);
    for (let user of interested) {
      // if (user[0] == this.currentUserId && user[2] === post_id) {
      if (user.user_id == this.currentUserId) {
        this.mapIntersted.set(post_id, true);
        return true;
      }
    }
    return false;
  }

  // Interested and uninterested in the post
  // interestedPost(post_id, toUser) {
  //   let check = this.mapIntersted.get(post_id);
  //   console.log("check: " + check);
  //   console.log("this.checkRequest: " + this.checkRequest);
  //   let element = this.el.nativeElement.querySelector('#interest-' + post_id);
  //   if (check && this.checkRequest) {
  //     this.interactPostsService.deleleInterestedApi(post_id).subscribe(
  //       () => {
  //         console.log("Đã hủy quan tâm");
  //         this.renderer.removeClass(element, 'active');
  //       },
  //       (error) => {
  //         console.log("Error:", error);
  //       }
  //     );
  //     this.mapIntersted.set(post_id, false);
  //     this.checkRequest = false;

  //     // Set count interestedPost 
  //     let interested = document.getElementById("interested-" + post_id);
  //     if (interested) {
  //       let count: string | undefined;
  //       count = '' + interested.textContent?.trim();
  //       let num = parseInt(count) - 1;
  //       interested!.innerText = num + '';
  //     }
  //   } else {
  //     this.renderer.addClass(element, 'active');
  //     this.interactPostsService.interestedPost(post_id, toUser);
  //     // this.mapIntersted.set(post_id, true);
  //     // this.checkRequest = true;

  //     // Set count interestedPost 
  //     let interested = document.getElementById("interested-" + post_id);
  //     if (interested) {
  //       let count: string | undefined;
  //       count = '' + interested.textContent?.trim();
  //       let num = parseInt(count) + 1;
  //       interested!.innerText = num + '';
  //     }

  //     this.mapIntersted.set(post_id, true);
  //     this.checkRequest = true;
  //   }
  // }

  interestedPost(post_id, toUser) {
    
    let check = this.mapIntersted.get(post_id);
    console.log("check: " + check);
    console.log("this.checkRequest: " + this.checkRequest);
    console.log("post_id: " + post_id);
    let element = this.el.nativeElement.querySelector('#interest-' + post_id);

    if (check && this.checkRequest) {
      this.interactPostsService.deleleInterestedApi(post_id).subscribe(
        () => {
          console.log("Đã hủy quan tâm");
          this.renderer.removeClass(element, 'active');
          this.mapIntersted.set(post_id, false);
          this.checkRequest = false;
          console.log("check1: " + check);
          // Set count interestedPost 
          let interested = document.getElementById("interested-" + post_id);
          if (interested) {
            let count: string | undefined;
            count = '' + interested.textContent?.trim();
            let num = parseInt(count) - 1;
            interested!.innerText = num + '';
          }
        },
        (error) => {
          console.log("Error:", error);
        }
      );
    } else {
      this.renderer.addClass(element, 'active');
      this.interactPostsService.interestedPost(post_id, toUser);

      // Set count interestedPost 
      let interested = document.getElementById("interested-" + post_id);
      if (interested) {
        let count: string | undefined;
        count = '' + interested.textContent?.trim();
        let num = parseInt(count) + 1;
        interested!.innerText = num + '';
      }

      this.mapIntersted.set(post_id, true);
      this.checkRequest = true;
      console.log("check2: " + check);
    }
  }

  /* ============template============= */

  loadData() {
    const body_news = document.getElementById('body-news')!;
    body_news.style.display = 'none';
    setTimeout(() => {
      this.isLoading = false;
      body_news.style.display = 'grid';
    }, 1);
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

  @ViewChild('elementToScroll', { static: false }) elementToScroll: ElementRef;

  scrollToTop() {
    if (this.elementToScroll && this.elementToScroll.nativeElement) {
      this.elementToScroll.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }


  async checkScroll() {
    const scrollableDiv = document.getElementById('scrollableDiv')!;
    const scrollButton = document.getElementById('scrollButton')!;
    const loadThreshold = 200; // Ngưỡng khoảng cách từ cuối trang để gọi API

    scrollableDiv.addEventListener('scroll', async () => {
      if (scrollableDiv.scrollTop > 100) {
        scrollButton.style.display = 'block';
      } else {
        scrollButton.style.display = 'none';
      }
      let epsilon = '0';
      if (scrollableDiv.scrollTop.toString().indexOf('.') > 0) {
        epsilon = '0' + scrollableDiv.scrollTop.toString().substring(scrollableDiv.scrollTop.toString().indexOf('.'));
      }
      if (
        scrollableDiv.scrollHeight - scrollableDiv.clientHeight - (scrollableDiv.scrollTop - parseFloat(epsilon)) <= 1 &&
        this.checkCountPosts
      ) {
        try {
          this.currentPage++;
          const data: any = await this.postService.loadPostNewsFeed(this.currentPage).toPromise();
          this.listPosts = [...this.listPosts, ...data];

          if (data.length < 5) {
            this.checkCountPosts = false;
          }
          // console.log("data.length: " + data.length);
        } catch (error) {
          // console.error("Error loading data:", error);
        }

        // console.log("hết nè: " + this.currentPage);
      }
    });
  }


  // toggleLike() {
  //   this.postService.toggleLike(this.postId);
  // }

  // isLiked(postId: string) {
  //   return this.postService.isLiked(postId);
  // }

  isLogin() {
    return this.loginService.isLogin();
  }

  logout() {
    return this.loginService.logout();
  }

  // Modal
  openModalCreatePost() {
    this.modalService.openModalCreatePost();
  }
}
