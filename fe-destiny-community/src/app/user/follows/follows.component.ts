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
import { MessageService } from '../service/message.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/dark/dark.min.css`,
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
  searchQuery: string = '';
  searchResults: any[] = [];
  isSearching: boolean = false;

  ngOnInit() {
    // this.loadDataFling();
    // this.loadDataFler();
    this.loadDataFriend();
    // this.loadData();
    this.profileService.loadDataProfileHeader(0);

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
    public loadingService: LoadingService,
    public messageService: MessageService,
    public profileService: ProfileService,
  ) {
    this.isSearching = false;
    this.searchResults = [];
  }

  /* ============following============= */
  async deleteFling(id: number) {
    this.followsService.deleteFollowing(id).subscribe(() => {
      ;
      // this.loadDataFling();

      new toast({
        title: 'Thông báo!',
        message: 'Hủy thành công',
        type: 'success',
        duration: 3000,
      })
    });
    this.listFollowing = await this.followsService.loadDataFollowing();
  }

  /* ============follower============= */
  deleteFler(id: number) {
    this.followsService.deleteFollower(id).subscribe(() => {
      // this.loadDataFler();
      this.loadDataFriend();
      new toast({
        title: 'Thông báo!',
        message: 'Hủy thành công',
        type: 'success',
        duration: 3000,
      })
    });
  }

  async addFollow(id: number) {
    this.modalService.sendNotify(' ', 0, id, 'FOLLOW', this.modalService.repCmtId);
    new toast({
      title: 'Thông báo!',
      message: 'Đã theo dõi',
      type: 'success',
      duration: 3000,
    });
    this.listFollower = await this.followsService.loadDataFollower();
  }
  /* ============friend============= */
  async loadDataFriend() {
    const body_content = document.getElementById('body-follow')!;
    body_content.style.display = 'none';
    this.listFollowing = await this.followsService.loadDataFollowing();
    this.isLoading = false;
    if(!this.isLoading){
      body_content.style.display = 'grid';
    }
    if (Array.isArray(this.listFollowing) && this.listFollowing.length === 0) {
      this.checkData1 = true;
    }
    this.listFollower = await this.followsService.loadDataFollower();
    if (Array.isArray(this.listFollower) && this.listFollower.length === 0) {
      this.checkData2 = true;
    }

    this.listFriend = await this.followsService.loadDataFriends();
    if (Array.isArray(this.listFriend) && this.listFriend.length === 0) {
      this.checkData3 = true;
    }

  }

  /* ============Search============= */

  //lưu trữ các biến tìm kiếm riêng cho mỗi tab
  searchPerformed: boolean = false;
  checkFind: {
    following: boolean;
    follower: boolean;
    friends: boolean;
  } = {
    following: false,
    follower: false,
    friends: false,
  };
  searchQueries: {
    following: string;
    follower: string;
    friends: string;
  } = {
      following: '',
      follower: '',
      friends: '',
    };

  performSearch(tab: string) {
    const searchQuery = this.searchQueries[tab]; //truy cập biến tìm kiếm tương ứng cho tab
    this.checkFind[tab] = false; // Mặc định đánh dấu là không tìm thấy
    this.searchPerformed = searchQuery.trim() !== ''; // Kiểm tra nếu người dùng đã nhập và tìm kiếm
    if (searchQuery) {
      this.isSearching = true;
      this.searchResults = [];

      let listToSearch: any[] = [];

      if (tab === 'following') {
        listToSearch = this.listFollowing; 
      } else if (tab === 'follower') {
        listToSearch = this.listFollower;
      } else if (tab === 'friends') {
        listToSearch = this.listFriend;
      }

      listToSearch.forEach((item) => {
      if (item.fullname.toLowerCase().includes(searchQuery.toLowerCase())) {
        this.searchResults.push(item);
        this.checkFind[tab] = true; // Tìm thấy kết quả
      }
    });
    } else {
      this.isSearching = false;
      this.checkFind[tab] = true;
    }
  }

  /* ============template============= */
  openTabFollow(content: string) {
    if (this.activeContent !== content) {
      this.activeContent = content;
    }
  }
  onChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.openTabFollow(selectElement.value);
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
