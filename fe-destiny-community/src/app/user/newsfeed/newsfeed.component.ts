import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';

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
import { ReportService } from '../service/report.service';
import { DatePipe } from '@angular/common';
import '../../../assets/toast/main.js';
import { UIServiveService } from '../service/ui-servive.service';
import { TranslateService } from '../service/translate.service';
import { CustomTimePipe } from '@app/custom-time.pipe';
import { call } from '../../../assets/js/video-call/script.js'
import { forEach } from 'angular';
import { async } from 'rxjs';
declare var toast: any;

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    // `../../css/dark/dark.min.css`,
    `../../css/vendor/simplebar.css`,
    `../../css/vendor/tiny-slider.css`,
    './newsfeed.component.css',
  ],
})
export class NewsfeedComponent implements OnInit {
  userDisplayName = '';
  currentUserId = this.cookieService.get('id');
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
  datePost: string | null;
  mapIntersted = new Map<number, boolean>();
  checkRequest: boolean = true;
  check: boolean = true;
  checkCountPosts: boolean = true;

  ngOnInit() {
    // this.reportService.openReportPost();
    this.userDisplayName = this.cookieService.get('full_name');
    // this.loadPosts();
    this.checkLoad();
    // this.modalService.openModalSuggest();
    this.modalService.dataUpdatedPost.subscribe(() => {
      // Đây là nơi bạn đặt mã để xử lý khi dữ liệu đã được cập nhật.
      // Chuyển dữ liệu từ Map thành một mảng.
      this.loadPosts();
      this.modalService.closeModalSuggest();
      this.modalService.checkAddFollow = false;
    });

    this.checkScroll();
    // this.translate();
    liquid.liquid();
    avatarHexagons.avatarHexagons();
    tooltips.tooltips();
    popups.popup();
    popups.picturePopup();
    headers.headers();
    sidebars.sidebars();
    // content.contentTab();
    form.formInput();

    this.uiServiveService.loadMode();
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
    private renderer: Renderer2,
    public reportService: ReportService,
    public uiServiveService: UIServiveService,
    public translateService: TranslateService,
    public customTimePipe: CustomTimePipe
  ) { }
  checkLoad() {
    let body_news = document.getElementById('body-news')!;
    body_news.style.display = 'none';
    this.profileService.loadCheckPost(1).subscribe((res) => {
      if (res === null) {
        this.modalService.openModalSuggest();
      } else if (res == 'success') {
        this.loadPosts();
      }
    });
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
      if (
        Array.isArray(this.listSuggested) &&
        this.listSuggested.length === 0
      ) {
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
    'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Credits-Tycoon.png',
    'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Platinum-User.png',
    'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Platinum-User.png',
    'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Silver-User.png',
    'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Bronze-User.png',
  ];

  listCupUser = [
    'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Ruler-of-Masses.png',
    'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Ruler-of-Masses.png',
    'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Platinum-Cup.png',
    'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Gold-Cup.png',
    'https://odindesignthemes.com/vikinger-theme/wp-content/uploads/2020/09/Bronze-Cup.png',
  ];

  /* ============Post============= */
  currentPage: number = 1;
  async loadPosts() {
    let body_news = document.getElementById('body-news')!;
    body_news.style.display = 'none';
    try {
      this.listTop5User = await this.postService.loadTop5User();
      this.listTop5Post = await this.postService.loadTop5Post();
      await this.loadDataSuggest();
      this.postService
        .loadPostNewsFeed(this.currentPage)
        .subscribe((data: any) => {
          this.listPosts = data; // Lưu dữ liệu ban đầu vào mảng
          setTimeout(() => {
            this.isLoading = false;
            body_news.style.display = 'grid';
            this.currentPage++;
          }, 1000);
        });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  /* ============Interested============= */

  checkInterested(post_id: number, interested: any[]): boolean {
    this.mapIntersted.set(post_id, false);
    for (let user of interested) {
      if (user.user_id == this.currentUserId) {
        this.mapIntersted.set(post_id, true);
        return true;
      }
    }
    return false;
  }

  checkRequesNum: number = 0;
  async interestedPost(post_id, toUser, positon) {
    if (this.checkRequesNum == 0) {
      this.checkRequesNum++;
      let i = positon + 1;
      // let page = Math.ceil(i / 5);
      let checkType = true;
      let check = this.mapIntersted.get(post_id);
      let element = this.el.nativeElement.querySelector('#interest-' + post_id);
      let id_user: any = this.cookieService.get('id');
      let fullname: any = this.cookieService.get('full_name');
      const data:any = [{ user_id: id_user, fullname: fullname }];

      if (check && this.checkRequest) {
        let interested = document.getElementById('interested-' + post_id);
        if (interested) {
          this.renderer.removeClass(element, 'active');
          let count: string | undefined;
          count = '' + interested.textContent?.trim();
          let num = parseInt(count) - 1;
          interested!.innerText = num + '';
          let i= 0;
          this.listPosts[positon].userInterested.forEach((k)=>{
            if(k.user_id==id_user){
              this.listPosts[positon].userInterested.splice(i,1);
            }
            i++;
          });
        }
        try {
          await this.interactPostsService.deleleInterestedApi(post_id);
          
          this.mapIntersted.set(post_id, false);
          this.checkRequest = false;
          checkType = false;
        } catch (error) {
          console.log('Error:', error);
        }
      } else {
        // Set count interestedPost
        let interested = document.getElementById('interested-' + post_id);
        if (interested) {
          let count: string | undefined;
          count = '' + interested.textContent?.trim();
          let num = parseInt(count) + 1;
          interested!.innerText = num + '';
        }
        this.renderer.addClass(element, 'active');
        this.interactPostsService.interestedPost(post_id, toUser);
        // Load dữ liệu người vừa quan tâm
        this.listPosts[positon].userInterested = [...this.listPosts[positon].userInterested, ...JSON.parse(JSON.stringify(data))];
        this.mapIntersted.set(post_id, true);
        this.checkRequest = true;
        checkType = true;
      }
      // this.listPost = await this.postService.reloadPostNewsFeed(post_id, page);
      // if (checkType == true) {
      //   this.listPost.countInterested++;
      // }
      // this.listPosts[positon] = this.listPost;
      this.checkRequesNum = 0;
    }
  }
  /* ============template============= */

  content: any;
  translate(id, check, content_post) {
    const translateButton = document.getElementById(
      'translate-button-' + id
    ) as HTMLButtonElement;
    const backButton = document.getElementById(
      'back-button-' + id
    ) as HTMLButtonElement;
    const originalContent = document.getElementById(
      'original-content-' + id
    ) as HTMLElement;
    const translatedContent = document.getElementById(
      'translated-content-' + id
    ) as HTMLElement;
    if (translateButton && check == true) {
      originalContent.style.display = 'none';
      translatedContent.style.display = 'block';
      this.customTimePipe.translatePost(content_post)
        .then(result => {
          this.content = result;
          localStorage.setItem("translate", result);
        })
        .catch(error => {
          console.error(error);
        });
    }
    if (backButton && check == false) {
      originalContent.style.display = 'block';
      translatedContent.style.display = 'none';
    }
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
  checkTemp: boolean = false;
  checkLoadingdata: boolean = true;
  async checkScroll() {
    const scrollableDiv = document.getElementById('scrollableDiv')!;
    const scrollButton = document.getElementById('scrollButton')!;

    scrollableDiv.addEventListener('scroll', async () => {
      if (scrollableDiv.scrollTop > 100) {
        scrollButton.style.display = 'block';
      } else {
        scrollButton.style.display = 'none';
      }
      let epsilon = '0';
      if (scrollableDiv.scrollTop.toString().indexOf('.') > 0) {
        epsilon =
          '0' +
          scrollableDiv.scrollTop
            .toString()
            .substring(scrollableDiv.scrollTop.toString().indexOf('.'));
      }
      if (
        scrollableDiv.scrollHeight -
        scrollableDiv.clientHeight -
        (scrollableDiv.scrollTop - parseFloat(epsilon)) <=
        1 &&
        this.checkCountPosts &&
        !this.setCurrentPage.has(this.currentPage)
      ) {
        this.setCurrentPage.add(this.currentPage);
        this.checkLoadingdata = true;

        let data: any = await this.postService
          .loadPostNewsFeed(this.currentPage)
          .toPromise();
        this.listPosts = [...this.listPosts, ...data];
        this.checkLoadingdata = false;
        this.currentPage++;

        if (data.length < 5) {
          this.checkCountPosts = false;
          this.checkLoadingdata = false;
        }
      }
    });
  }
  // setCurrentPage = new Map<number,boolean>();
  setCurrentPage = new Set();

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
