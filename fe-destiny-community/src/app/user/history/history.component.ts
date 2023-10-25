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

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/vendor/simplebar.css`,
    './history.component.css'
  ]
})
export class HistoryComponent implements OnInit {
  listInterested: any[] = [];
  listShare: any[] = [];
  listSendreciever: any[] = [];
  isLoading = true;
  ngOnInit() {
    // this.modalService.openModalDetailPost(49);
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
    public historyService: HistoryService
  ) {

  }

  async loadInterested() {
    try {
      this.listInterested = await this.historyService.loadInterested();
      this.isLoading = false;
      this.listShare = await this.historyService.loadShare();
      this.listSendreciever = await this.historyService.loadSendreciever();
      // console.warn("this.listInterested: " + this.listInterested);
    } catch (error) {
      console.error('Error:', error);
    }
  }









  dropdownMenu() {
    document.getElementById("myDropdown")!.classList.toggle("show");
  }
  dropdownMenu2() {
    document.getElementById("myDropdown2")!.classList.toggle("show");
  }
  dropdownMenu3() {
    document.getElementById("myDropdown3")!.classList.toggle("show");
  }

}
