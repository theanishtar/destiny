import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { liquid } from '../../../assets/js/utils/liquidify.js';
import { avatarHexagons } from '../../../assets/js/global/global.hexagons.js';
import { tooltips } from '../../../assets/js/global/global.tooltips.js';
import { popups } from '../../../assets/js/global/global.popups.js';
import { headers } from '../../../assets/js/header/header.js';
import { sidebars } from '../../../assets/js/sidebar/sidebar.js';
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
import '../../../assets/toast/main.js';
declare var toast: any;
@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/dark/dark.min.css`,
    `../../css/vendor/simplebar.css`,
    `../../css/vendor/tiny-slider.css`,
    './article-details.component.css'
  ]
})
export class ArticleDetailsComponent {
  mapIntersted = new Map<number, boolean>();
  checkRequest: boolean = true;
  check: boolean = true
  listPost: any;
  listPosts: any;
  currentUserId = this.cookieService.get("id");
  isLoading = true;
  id_post: any | null = '';
  public detailPost: any;

  ngOnInit() {
    this.linkPost();

    this.translate();

    liquid.liquid();
    avatarHexagons.avatarHexagons();
    tooltips.tooltips();
    popups.popup();
    popups.picturePopup();
    headers.headers();
    sidebars.sidebars();
    // content.contentTab();
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
    public profileService: ProfileService,
    private el: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    public reportService: ReportService
  ) {
  }

  linkPost() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.id_post = parseInt((params.get('id') + '')?.trim());
    });
    // console.log("this.id_post: " + this.id_post);
    if (this.id_post) {
      this.postService.getPostDetails(this.id_post).subscribe((res) => {
        this.detailPost = res;
        // console.warn("this.detailPost: " + JSON.stringify(this.detailPost));
        this.isLoading = false;
      });
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
      let page = Math.ceil(i / 5);
      let checkType = true;
      let check = this.mapIntersted.get(post_id);
      let element = this.el.nativeElement.querySelector('#interest-' + post_id);

      if (check && this.checkRequest) {
        let interested = document.getElementById("interested-" + post_id);
        if (interested) {
          this.renderer.removeClass(element, 'active');
          let count: string | undefined;
          count = '' + interested.textContent?.trim();
          let num = parseInt(count) - 1;
          interested!.innerText = num + '';

        }
        try {
          await this.interactPostsService.deleleInterestedApi(post_id);
          this.mapIntersted.set(post_id, false);
          this.checkRequest = false;
          checkType = false;

        } catch (error) {
          console.log("Error:", error);
        }

      } else {
        // Set count interestedPost 
        let interested = document.getElementById("interested-" + post_id);
        if (interested) {
          let count: string | undefined;
          count = '' + interested.textContent?.trim();
          let num = parseInt(count) + 1;
          interested!.innerText = num + '';
        }
        this.renderer.addClass(element, 'active');
        this.interactPostsService.interestedPost(post_id, toUser);
        this.mapIntersted.set(post_id, true);
        this.checkRequest = true;
        checkType = true;
      }

      this.listPost = await this.postService.reloadPostNewsFeed(post_id, page);
      if (checkType == true) {
        this.listPost.countInterested++;
      }
      this.listPosts[positon] = this.listPost;
      this.checkRequesNum = 0;
    }
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
      if (translateButton) {
        translateButton.addEventListener('click', function () {
          originalContent.style.display = 'none';
          translatedContent.classList.add('active');
        });
      }
      if (backButton) {
        backButton.addEventListener('click', function () {
          originalContent.style.display = 'block';
          translatedContent.classList.remove('active');
        });
      }


    });
  }
}
