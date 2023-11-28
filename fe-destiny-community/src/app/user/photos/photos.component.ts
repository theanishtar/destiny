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
import { ProfileService } from '../service/profile.service';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/dark/dark.min.css`,
    `../../css/vendor/simplebar.css`,
    `../../css/vendor/tiny-slider.css`,
    './photos.component.css'
  ]
})
export class PhotosComponent implements OnInit {
  
  dataProfileTimeline: any;
  listImg: any
  idLocal: any;
  isLoading = true;
  ngOnInit() {

    liquid.liquid();
    avatarHexagons.avatarHexagons();
    tooltips.tooltips();
    popups.popup();
    popups.picturePopup();
    headers.headers();
    sidebars.sidebars();
    // content.contentTab();
    form.formInput();

    let photo_body = document.getElementById('photo-body')!;

    photo_body.style.display = 'none';
    this.profileService.getCheckData().then((result) => {
        this.isLoading = false;
        // if(this.profileService.listPostPr.length === 0){
        //   this.checkLoadingdata = false;
        // }
        photo_body.style.display = 'block';
    });
  }

  constructor(
    public modalService: ModalService,
    public profileService: ProfileService
  ) {
    this.idLocal = parseInt((localStorage.getItem("idSelected") + '')?.trim());
    this.profileService.loadDataProfileTimeline(this.idLocal);
   }
}
