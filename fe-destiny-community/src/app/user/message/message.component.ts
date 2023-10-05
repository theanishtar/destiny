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
import { render } from '../../../assets/js/chat/custom.js'

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/vendor/simplebar.css`,
    './message.component.css'
  ]
})
export class MessageComponent implements OnInit{
  ngOnInit() {
    this.openMessage();
    liquid.liquid();
    avatarHexagons.avatarHexagons();
    tooltips.tooltips();
    popups.popup();
    popups.picturePopup();
    headers.headers();
    sidebars.sidebars();
    content.contentTab();
    form.formInput();
    
    // render("1", "dannk", "");
  }

  constructor(
    public modalService: ModalService,
  ) { }


  /* ============template============= */
  openMessage() {
    let isOriginal = true;
    // Lấy tất cả các menu item
    const menuItems = document.querySelectorAll('.chat-widget-message');
    const chat_widget_form = document.querySelector(".chat-widget-chat") as HTMLButtonElement;
    const chat_origin = document.querySelector(".chat-widget-chat-orgin") as HTMLButtonElement;
    
    // Lặp qua từng menu item và thêm sự kiện click vào chúng
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        // Loại bỏ class "active" từ tất cả các menu item
        menuItems.forEach(menuItem => {
          menuItem.classList.remove('active');
          chat_widget_form.style.display = "none";
          chat_origin.style.display = "block";
          isOriginal = false;
        });

        // Thêm class "active" vào menu item được click
        item.classList.add('active');
        isOriginal = true;
        chat_widget_form.style.display = "block";
        chat_origin.style.display = "none";
      });
    });
  }
}
