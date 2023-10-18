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
  checkData1: boolean = false;
  checkData2: boolean = false;
  checkData3: boolean = false;
  listFollowing: any[];
  listFollower: any[];
  listFriend: any[];
  isLoading = true;

  ngOnInit() {
    this.loadDataFling();
    this.loadDataFler();
    this.loadDataFriend();
    // this.loadData();

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
    this.followsService.loadDataFollowing().subscribe(() => {
      this.listFollowing = this.followsService.getDataFling();
      this.isLoading = false;
      if (Array.isArray(this.listFollowing) && this.listFollowing.length === 0) {
        this.checkData1 = true;
      }
    });

  }

  deleteFling(id: number) {
    this.followsService.deleteFollowing(id).subscribe((res) => {; 
      this.loadDataFling();
      this.loadDataFriend();
      new toast({
        title: 'Thông báo!',
        message: 'Hủy thành công',
        type: 'success',
        duration: 3000,
      })
    });
  }

  /* ============follower============= */
  loadDataFler() {
    this.followsService.loadDataFollower().subscribe(() => {
      this.listFollower = this.followsService.getDataFler();
      if (Array.isArray(this.listFollower) && this.listFollower.length === 0) {
        this.checkData2 = true;
      }
    });

  }

  deleteFler(id: number) {
    this.followsService.deleteFollower(id).subscribe((res) => {
      this.loadDataFler();
      this.loadDataFriend();
      new toast({
        title: 'Thông báo!',
        message: 'Hủy thành công',
        type: 'success',
        duration: 3000,
      })
    });
  }

  /* ============friend============= */
  loadDataFriend() {
    this.followsService.loadDataFriends().subscribe(() => {
      this.listFriend = this.followsService.getDataFriend();

      if (Array.isArray(this.listFriend) && this.listFriend.length === 0) {
        this.checkData3 = true;
      }
    });

  }

  /* ============template============= */
  openTabFollow(content: string) {
    if (this.activeContent !== content) {
      this.activeContent = content;
    }
  }

  loadData() {
    this.isLoading = true;
    const body_content = document.getElementById('body-follow')!;
    body_content.style.display = 'none';
    setTimeout(() => {
      this.isLoading = false;
      body_content.style.display = 'grid';
    }, 6000);
  }
}
