import { Component, OnInit } from '@angular/core';

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

// 
import { ModalService } from '../service/modal.service';
import { HistoryService } from '../service/history.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/dark/dark.min.css`,
    `../../css/vendor/simplebar.css`,
    './history.component.css'
  ]
})
export class HistoryComponent implements OnInit {
  listInterested: any[] = [];
  listShare: any[] = [];
  listSendreciever: any[] = [];
  isLoading = true;
  activeContent: string | null = 'interested';
  searchQuery: string = '';
  searchResults: any[] = [];
  isSearching: boolean = false;

  ngOnInit() {
    // this.historyService.openModalDetailPost(49);
    this.loadInterested();
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
    public historyService: HistoryService,
    public profileService: ProfileService
  ) {
    this.isSearching = false;
    this.searchResults = [];
  }


  async loadInterested() {
    try {
      this.listInterested = await this.historyService.loadInterested();
      // console.warn("list: " + JSON.stringify(this.listInterested));
      this.isLoading = false;
      this.listShare = await this.historyService.loadShare();
      this.listSendreciever = await this.historyService.loadSendreciever();
      // console.warn("this.listInterested: " + this.listInterested);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  /* ============Search============= */
  //lưu trữ các biến tìm kiếm riêng cho mỗi tab
  searchPerformed: boolean = false;
  checkFind: {
    interested: boolean;
    share: boolean;
    sendreciever: boolean;
  } = {
      interested: false,
      share: false,
      sendreciever: false,
    };
  searchQueries: {
    interested: string;
    share: string;
    sendreciever: string;
  } = {
      interested: '',
      share: '',
      sendreciever: '',
    };

  performSearch(tab: string) {
    const searchQuery = this.searchQueries[tab]; //truy cập biến tìm kiếm tương ứng cho tab
    this.checkFind[tab] = false; // Mặc định đánh dấu là không tìm thấy
    this.searchPerformed = searchQuery.trim() !== ''; // Kiểm tra nếu người dùng đã nhập và tìm kiếm
    if (searchQuery) {
      this.isSearching = true;
      this.searchResults = [];

      let listToSearch: any[] = [];

      if (tab === 'interested') {
        listToSearch = this.listInterested;
      } else if (tab === 'share') {
        listToSearch = this.listShare;
      } else if (tab === 'sendreciever') {
        listToSearch = this.listSendreciever;
      }

      listToSearch.forEach((item) => {
        if (item[2].toLowerCase().includes(searchQuery.toLowerCase())) {
          this.searchResults.push(item);
          this.checkFind[tab] = true; // Tìm thấy kết quả
        }
      });
    } else {
      this.isSearching = false;
      this.checkFind[tab] = true;
    }
  }
  openTabFollow(content: string) {
    if (this.activeContent !== content) {
      this.activeContent = content;
    }
  }

  toggleDropdown(id, menuType) {
    this.closeAllDropdowns();
    const dropdown = document.getElementById(`myDropdown-${menuType}-${id}`);
    if (dropdown) {
      dropdown.classList.toggle("show");
    }
  }

  closeAllDropdowns() {
    // Lấy tất cả các menu và đóng chúng
    const allDropdowns = document.querySelectorAll(".dropdown-menu-arrow");
    allDropdowns.forEach((dropdown) => {
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      }
    });
  }

}
