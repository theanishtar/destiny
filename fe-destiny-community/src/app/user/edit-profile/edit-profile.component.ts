import { Component, OnInit, HostListener } from '@angular/core';

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

import '../../../assets/toast/main.js';
declare var toast: any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/vendor/simplebar.css`,
    './edit-profile.component.css'
  ]
})

export class EditProfileComponent implements OnInit {
  textAreaContent: string = ''; // Nội dung của textarea
  readonlyCondition: boolean = false; // Ban đầu không bị giới hạn

  ngOnInit() {

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
  ) { }

  // Giới hạn ký tự của bio
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      // Người dùng đã bấm phím "Backspace", gỡ bỏ thuộc tính "readonly".
      this.readonlyCondition = false;
    }
  }
  // Hàm kiểm tra giới hạn và hiển thị thông báo
  checkCharacterLimit() {
    const maxCharacters = 180; // Giới hạn ký tự
    const characterCount = this.textAreaContent.length;
    const charCount = document.getElementById("charCount")!;
    charCount.textContent = characterCount.toString();
    if (characterCount >= maxCharacters) {
      new toast({
        title: 'Thông báo!',
        message: 'Vui lòng không nhập quá 180 ký tự',
        type: 'info',
        duration: 2000,
      });
      this.readonlyCondition = true;
      // Nếu vượt quá giới hạn, cắt nội dung để chỉ hiển thị 180 ký tự
      this.textAreaContent = this.textAreaContent.slice(0, maxCharacters);
    }
  }
}

