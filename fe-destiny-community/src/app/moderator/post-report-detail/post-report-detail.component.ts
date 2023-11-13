import { Component, OnInit } from '@angular/core';
import { AdminPostdetailService } from '@app/admin/service/admin-postdetail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-report-detail',
  templateUrl: './post-report-detail.component.html',
  styleUrls: [
    `../../admin/css/sb-admin-2.min.css`,
    `../../admin/css/home.css`
  ]
})
export class PostReportDetailModeratorComponent {

  postDetail: any = {};
  idPost: string | null;

  constructor(
    private adminPostdetailService: AdminPostdetailService,
    private routers: Router,
  ) { }

  ngOnInit() {
    this.loadPostDetail();
  }

  selectUser(email: string): void {
    localStorage.setItem("userDetailEmail", email);
    this.routers.navigate(['/admin/userdetail']);
  }

  loadPostDetail() {

    this.idPost = localStorage.getItem("postDetailId");

    if (this.idPost == null) {
      this.routers.navigate(['moderator/post-report-detail']);
    } else {
      this.adminPostdetailService.loadPostDetail(this.idPost).subscribe(() => {
        this.postDetail = this.adminPostdetailService.getPostDetail();
      })
    }

  }
}
