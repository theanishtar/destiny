import { Component, OnInit } from '@angular/core';
import { AdminPostdetailService } from '../service/admin-postdetail.service';
import { Router } from '@angular/router';
import { AuthInstances } from '@angular/fire/auth';
declare var toast: any;

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: [`../css/sb-admin-2.min.css`, `../css/home.css`],
})
export class PostDetailComponent implements OnInit {
  totalReport: number;
  totalImages: number;
  totalComment: number;

  postDetail: any = {};
  idPost: string | null;

  isLoading = true;

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

  actionOnPost(id: string): void {
    if (this.postDetail.ban == false) {
      this.adminPostdetailService.actionOnPost(id).subscribe(() => { })
      new toast({
        title: 'Thành công!',
        message: 'Vô hiệu hóa thành công!',
        type: 'success',
        duration: 1500,
      })
    } else {
      this.adminPostdetailService.actionOnPost(id).subscribe(() => { })
      new toast({
        title: 'Thành công!',
        message: 'Kích hoạt thành công!',
        type: 'success',
        duration: 1500,
      })
    }
    setTimeout(() => {
      window.location.reload();
    }, 600);
  }
  loadPostDetail() {

    this.idPost = localStorage.getItem("postDetailId");

    if (this.idPost == null) {
      this.routers.navigate(['/admin/postmanament']);
    } else {
      this.adminPostdetailService.loadPostDetail(this.idPost).subscribe(() => {
        this.postDetail = this.adminPostdetailService.getPostDetail();
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
