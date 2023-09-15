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
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/vendor/simplebar.css`,
    './change-password.component.css'
  ]
})

export class ChangePasswordComponent implements OnInit{
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

  openModal() {
    this.modalService.openModal();
  }
  closeModal() {
    this.modalService.closeModal();
  }

  showHideOldPass() {
		let input1 = document.getElementById('oldPass') as HTMLInputElement;
		// console.log(input!);
		if (input1.type === 'password') {
			input1.type = 'text';
			document.getElementById('eye1')!.className = 'fa-regular fa-eye';
		} else {
			input1.type = 'password';
			document.getElementById('eye1')!.className = 'fa-regular fa-eye-slash';
		}
	}

	showHideNewPass() {
		let input2 = document.getElementById('newPass') as HTMLInputElement;
		let input3 = document.getElementById('reNewPass') as HTMLInputElement;
		if (input2.type === 'password' || input2.type === 'password') {
			input2.type = 'text';
			input3.type = 'text';
			document.getElementById('eye2')!.className = 'fa-regular fa-eye';
			document.getElementById('eye3')!.className = 'fa-regular fa-eye';
		} else {
			input2.type = 'password';
			input3.type = 'password';
			document.getElementById('eye2')!.className = 'fa-regular fa-eye-slash';
			document.getElementById('eye3')!.className = 'fa-regular fa-eye-slash';
		}
	}
}
