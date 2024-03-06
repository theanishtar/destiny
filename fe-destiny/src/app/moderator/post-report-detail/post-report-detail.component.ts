import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import { Router } from '@angular/router';

import { PostReportedDetailService } from '../service/post-reported-detail.service';

declare var toast: any;

@Component({
  selector: 'app-post-report-detail',
  templateUrl: './post-report-detail.component.html',
  styleUrls: [
    `../../admin/css/sb-admin-2.min.css`,
    `../../admin/css/home.css`
  ]
})
export class PostReportDetailModeratorComponent {
  totalReport: number;
  totalImages: number;
  totalComment: number;

  postDetail: any = {};
  idPost: string | null;

  idUserSend: string | null;

  isLoading = true;

  constructor(
    private postReportedDetailService: PostReportedDetailService,
    private routers: Router,
  ) { }

  ngOnInit() {
    this.loadPostDetail();
  }

  sendToAdmin(): void {
    this.idPost = localStorage.getItem("postDetailId");
    this.idUserSend = localStorage.getItem("userSendId");

    if (this.idPost == null || this.idUserSend == null) {
      this.routers.navigate(['/moderator/post-report']);
    } else {

      this.postReportedDetailService.sendToAdmin(this.idPost, this.idUserSend).subscribe(() => {
        new toast({
          title: 'Thành công!',
          message: 'Báo cáo đã được gửi đến quản trị viên!',
          type: 'success',
          duration: 1500,
        })
        localStorage.removeItem("postDetailId");
        this.routers.navigate(['/moderator/post-report']);
      })
    }
  }

  loadPostDetail() {

    this.idPost = localStorage.getItem("postDetailId");

    if (this.idPost == null) {
      this.routers.navigate(['/admin/postmanament']);
    } else {
      this.postReportedDetailService.loadPostDetail(this.idPost).subscribe(() => {
        this.postDetail = this.postReportedDetailService.getPostDetail();
        this.totalImages = 0;
        this.totalImages = this.postDetail.listPostImages.length;

        this.totalComment = 0;
        this.totalComment = this.postDetail.listComments.length;

        this.totalReport = 0;
        this.totalReport = this.postDetail.listUserSendReports.length;

        this.isLoading = false;
      })
    }

  }

}
