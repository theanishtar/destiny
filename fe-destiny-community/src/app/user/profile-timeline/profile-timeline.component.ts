import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

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
import { Location } from '@angular/common';
declare var toast: any;
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ModalService } from '../service/modal.service';
import { InteractPostsService } from '../service/interact-posts.service';
import { ProfileService } from '../service/profile.service';
import { FollowsService } from '../service/follows.service';
import { PostService } from '../service/post.service';
import { CookieService } from 'ngx-cookie-service';
import { UIServiveService } from '../../user/service/ui-servive.service';
import { CustomTimePipe } from '@app/custom-time.pipe';
@Component({
  selector: 'app-profile-timeline',
  templateUrl: './profile-timeline.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/dark/dark.min.css`,
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
  chatUserId: any;
  mapIntersted = new Map<number, boolean>();
  checkRequest: boolean = true;
  currentUserId = this.cookieService.get("id");
  checkCountPosts: boolean = true;
  checkListPost: any;
  id_user: any | null = '';


  ngOnInit() {
    this.linkProfile();
    let profile_timeline = document.getElementById('profile_timeline')!;

    profile_timeline.style.display = 'none';
    this.profileService.getCheckData().then((result) => {
      if (result) { }
      this.isLoading = false;
      profile_timeline.style.display = 'grid';
      setTimeout(() => {
        profile_timeline.style.setProperty('transform', 'translate(167.5px, 0px)', 'important');
      }, 1);

      // this.zoom();
    });

    //Cập nhật lại listPostPr khi cập nhật bài đăng
    this.postService.dataUpdated.subscribe(() => {
      this.listPostPr = this.postService.getListDataPostUpdate();
    })
    this.loadDataSuggest();
    this.loadPosts();
    this.checkScroll();

    liquid.liquid();
    avatarHexagons.avatarHexagons();
    tooltips.tooltips();
    popups.popup();
    popups.picturePopup();
    headers.headers();
    sidebars.sidebars();
    form.formInput();
    this.uiServiveService.loadMode();


  }
  dataFollows: any
  listPostPr: any;
  listUserPr: any[];
  listCountPr: any;
  constructor(
    public modalService: ModalService,
    public interactPostsService: InteractPostsService,
    public profileService: ProfileService,
    private datePipe: DatePipe, //Định dạng ngày
    public followsService: FollowsService,
    public postService: PostService,
    private cookieService: CookieService,
    private el: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private uiServiveService: UIServiveService,
    private location: Location,
    public customTimePipe: CustomTimePipe
  ) {
    this.idLocal = parseInt((localStorage.getItem("idSelected") + '')?.trim());
    this.chatUserId = parseInt((localStorage.getItem("chatUserId") + '')?.trim());

  }

  zoom() {
    (document.documentElement.style as any).zoom = '1.2';
    // Chờ hiệu ứng kết thúc, sau đó chuyển hướng và thực hiện hiệu ứng zoom-out
    setTimeout(function () {
      (document.documentElement.style as any).zoom = '1';
    }, 500);
  }

  linkProfile() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.id_user = parseInt((params.get('id') + '')?.trim());
    });
    if (this.id_user) {
      if (this.id_user > 6) {
        this.profileService.loadDataProfileTimeline(this.id_user);
      } else {
        this.location.back();
      }
    } else {
      this.profileService.loadDataProfileTimeline(this.idLocal);
    }
  }
  addFollow(id: number) {
    this.followsService.addFollowAPI(id).subscribe((res) => {
      new toast({
        title: 'Thông báo!',
        message: 'Đã theo dõi',
        type: 'success',
        duration: 3000,
      })
    });
  }

  loadDataSuggest() {
    this.followsService.loadDataSuggest().subscribe(() => {
      this.listSuggested = this.followsService.getDataSuggested();
      this.check = false;
    });
  }

  currentPage: number = 1;
  async loadPosts() {
    try {
      let dataPost = {
        toProfile: localStorage.getItem("idSelected"),
        page: this.currentPage
      }
      // this.profileService.loadDataTimelinePost(dataPost).subscribe((data: any) => {
      //   this.listPostPr = data; // Lưu dữ liệu ban đầu vào mảng
      // });
      const data: any = await this.profileService.loadDataTimelinePost(dataPost);
      this.listPostPr = data;
      this.currentPage++;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  /* ============Interested============= */
  checkRequesNum: number = 0;
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
          this.listPostPr[positon].userInterested.forEach((k)=>{
            if(k.user_id==id_user){
              this.listPostPr[positon].userInterested.splice(i,1);
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
        this.listPostPr[positon].userInterested = [...this.listPostPr[positon].userInterested, ...JSON.parse(JSON.stringify(data))];
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
    console.log(this.elementToScroll); // In ra để kiểm tra ElementRef
    if (this.elementToScroll && this.elementToScroll.nativeElement) {
      this.elementToScroll.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  setCurrentPage = new Set();
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
        epsilon = '0' + scrollableDiv.scrollTop.toString().substring(scrollableDiv.scrollTop.toString().indexOf('.'));
      }

      // console.warn("check:  " + (scrollableDiv.scrollHeight - scrollableDiv.clientHeight - (scrollableDiv.scrollTop - parseFloat(epsilon))))
      if (
        (scrollableDiv.scrollHeight - scrollableDiv.clientHeight - (scrollableDiv.scrollTop - parseFloat(epsilon)) <= 1) &&
        this.checkCountPosts && !this.setCurrentPage.has(this.currentPage)
      ) {
        this.setCurrentPage.add(this.currentPage);
        this.checkLoadingdata = true;

        let dataPost = {
          toProfile: localStorage.getItem("idSelected"),
          page: this.currentPage
        }
        const data: any = await this.profileService.loadDataTimelinePost(dataPost);
        this.listPostPr = [...this.listPostPr, ...data];
        this.checkLoadingdata = false;
        this.currentPage++;

        if (data.length < 5) {
          this.checkCountPosts = false;
          this.checkLoadingdata = false;
        }}
    });
  }

  openModalComment(idPost) {
    this.modalService.openModalComment(49);
  }
  closeModalComment() {
    this.modalService.closeModalComment();
  }
}
