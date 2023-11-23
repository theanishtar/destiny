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
import '../../../assets/toast/main.js';
declare var toast: any;
import { ModalService } from '../service/modal.service';
import { ProfileService } from '../service/profile.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/vendor/simplebar.css`,
    './notifications.component.css',
  ],
})
export class NotificationsComponent implements OnInit {
  ngOnInit() {
    this.checkScroll();
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
    public profileService: ProfileService
  ) { }

  checkType(type: any) {

    if (type == 'COMMENT') {
      return 'COMMENT';
    }
    if (type == 'SHARE') {
      return 'SHARE';
    }
    if (type == 'INTERESTED') {
      return 'INTERESTED';
    }
    if (type == 'FOLLOW') {
      return 'FOLLOW';
    }
    if (type == 'REPCOMMENT') {
      return 'REPCOMMENT';
    }
    if (type == 'MENTION') {
      return 'MENTION';
    }
    return null;
  }

  addFollow(id: number) {
    this.modalService.sendNotify(' ', 0, id, 'FOLLOW', this.modalService.repCmtId);
    new toast({
      title: 'Thông báo!',
      message: 'Đã theo dõi',
      type: 'success',
      duration: 3000,
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

  checkScroll() {
    const scrollableDiv = document.getElementById('scrollableDiv')!;
    const scrollButton = document.getElementById('scrollButton')!;
    console.log("scrollableDiv.scrollTop: " + scrollableDiv.scrollTop)
    scrollableDiv.addEventListener('scroll', () => {
      console.log("scrollableDiv.scrollTop: " + scrollableDiv.scrollTop)
      if (scrollableDiv.scrollTop > 100) {
        scrollButton.style.display = 'block';
      } else {
        scrollButton.style.display = 'none';
      }

    });
  }
}
