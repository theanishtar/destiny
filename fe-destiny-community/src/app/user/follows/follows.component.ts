import { Component, OnInit } from '@angular/core';

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
import '../../../assets/toast/main.js';
declare var toast: any;
//
import { ModalService } from '../service/modal.service';
import { FollowsService } from '../service/follows.service';
import { LoadingService } from '../service/loading.service';
@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/vendor/simplebar.css`,
    `../../css/vendor/tiny-slider.css`,
    './follows.component.css',
  ],
})
export class FollowsComponent implements OnInit {
  activeContent: string | null = 'following';
  checkData: boolean = false;
  listFollowing: any[];
  listFollower: any[];
  listFriend: any[];
  imageUrlSuggested: string;
  ngOnInit() {
    this.loadDataFling();
    this.loadDataFler();
    this.loadDataFriend();

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
    public followsService: FollowsService,
    public loadingService: LoadingService
  ) { }

  /* ============following============= */
  loadDataFling() {
    this.listFollowing = [];

    if (this.listFollowing == null) {
      this.loadingService.showLoading();
    }
    this.followsService.loadDataFollowing().subscribe(() => {
      this.listFollowing = this.followsService.getDataFling();
      this.checkDataFling();
      // console.log('this.listFollowing: ' + JSON.stringify(this.listFollowing));
      this.listFollowing.forEach(e => {
        this.imageUrlSuggested = e.avatar
        console.log(this.imageUrlSuggested);
      });
    });
  }

  deleteFling(id: number) {
    this.listFollowing = [];
    if (this.listFollowing == null) {
      this.loadingService.showLoading();
    }
    this.followsService.deleteFollowing(id).subscribe((res) => {
      // this.listFollowing = this.followsService.getDataFling();
      this.checkDataFling();
    });
    new toast({
      title: 'Thông báo!',
      message: 'Hủy thành công',
      type: 'success',
      duration: 3000,
    })
  }
  checkDataFling() {
    function delay(ms: number) {
      return new Promise(function (resolve) {
        setTimeout(resolve, ms);
      });
    }

    if (this.listFollowing != null) {
      delay(9000).then((res) => {
        this.loadingService.hideLoading();
      });
    }
    if (this.listFollowing == null)
      this.checkData = true;
  }

  /* ============follower============= */
  loadDataFler() {
    this.listFollower = [];

    if (this.listFollower == null) {
      this.loadingService.showLoading();
    }
    this.followsService.loadDataFollower().subscribe(() => {
      this.listFollower = this.followsService.getDataFler();
      this.checkDataFler();
      // console.log('this.listFollower: ' + JSON.stringify(this.listFollower));
      this.listFollower.forEach(e => {
        this.imageUrlSuggested = e.avatar
        console.log(this.imageUrlSuggested);
      });
    });
  }

  checkDataFler() {
    function delay(ms: number) {
      return new Promise(function (resolve) {
        setTimeout(resolve, ms);
      });
    }

    if (this.listFollower != null) {
      delay(8000).then((res) => {
        this.loadingService.hideLoading();
      });
    }
    if (this.listFollower == null)
      this.checkData = true;
  }

  deleteFler(id: number) {
    this.listFollower = [];
    if (this.listFollower == null) {
      this.loadingService.showLoading();
    }
    this.followsService.deleteFollower(id).subscribe((res) => {
      this.listFollower = this.followsService.getDataFler();
      this.checkDataFler();
    });
    new toast({
      title: 'Thông báo!',
      message: 'Hủy thành công',
      type: 'success',
      duration: 3000,
    })
  }

  /* ============friend============= */
  loadDataFriend() {
    this.listFriend = [];

    if (this.listFriend == null) {
      this.loadingService.showLoading();
    }
    this.followsService.loadDataFriends().subscribe(() => {
      this.listFriend = this.followsService.getDataFriend();
      this.checkDataFriend();
      // console.log('this.listFriend: ' + JSON.stringify(this.listFriend));
      this.listFriend.forEach(e => {
        this.imageUrlSuggested = e.avatar
        console.log(this.imageUrlSuggested);
      });
    });
  }

  checkDataFriend() {
    function delay(ms: number) {
      return new Promise(function (resolve) {
        setTimeout(resolve, ms);
      });
    }

    if (this.listFriend != null) {
      delay(8000).then((res) => {
        this.loadingService.hideLoading();
      });
    }
    if (this.listFriend == null)
      this.checkData = true;
  }



  /* ============template============= */
  openTabFollow(content: string) {
    if (this.activeContent !== content) {
      this.activeContent = content;
    }
  }
}
