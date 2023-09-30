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
  listFollowing: any[];

  ngOnInit() {
    this.loadDataFling();

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
  ) {}
  checkData: boolean = false;
  loadDataFling() {
    this.listFollowing=[];
    
    if (this.listFollowing == null) {
      this.loadingService.showLoading();
    }
    this.followsService.loadDataFollowing().subscribe(() => {
      this.listFollowing = this.followsService.getDataFling();
      this.checkDataFling();
      console.log('this.listFollowing: ' + JSON.stringify(this.listFollowing));
    });
  }

  deleteFling(id: number) {
    this.listFollowing=[];
    alert(this.listFollowing)
    if (this.listFollowing == null) {
      this.loadingService.showLoading();
    }
    this.followsService.deleteFollowing(id).subscribe((res) => {
      this.listFollowing =this.followsService.getDataFling();
      this.checkDataFling();
    });
    new toast({
      title: 'Thông báo!',
      message: 'Hủy thành công',
      type: 'success',
      duration: 3000,
    })
  }
checkDataFling(){
  function delay(ms: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }
 
  if (this.listFollowing != null) {
    delay(8000).then((res) => {
      this.loadingService.hideLoading();
    });
  } 
  if(this.listFollowing==null)
    this.checkData = true;
  
}
  activeContent: string | null = 'following';

  openTabFollow(content: string) {
    if (this.activeContent !== content) {
      this.activeContent = content;
    }
  }
}
